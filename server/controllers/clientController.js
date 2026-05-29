import User from '../models/User.js';
import Process from '../models/Process.js';
import { buildPasswordSetupUrl, sendPasswordSetupEmail } from '../utils/email.js';
import crypto from 'crypto';

function formatClientResponse(client, processCount) {
  const { password, passwordSetupToken, passwordSetupExpires, ...clientWithoutSensitive } = client.toObject();

  return {
    ...clientWithoutSensitive,
    processCount,
    passwordPending: !password,
  };
}

function generatePasswordSetupCredentials() {
  const passwordSetupToken = crypto.randomBytes(32).toString('hex');
  const passwordSetupExpires = new Date();
  passwordSetupExpires.setDate(passwordSetupExpires.getDate() + 7);

  return { passwordSetupToken, passwordSetupExpires };
}

async function trySendPasswordSetupEmail(client) {
  try {
    await sendPasswordSetupEmail(client.email, client.name, client.passwordSetupToken);
    return { emailSent: true };
  } catch (emailError) {
    console.error('Erro ao enviar email via Resend:', emailError.message);
    return {
      emailSent: false,
      warning: 'Cliente criado, mas o e-mail de definição de senha não foi enviado.',
    };
  }
}

export const getClients = async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' })
      .select('-passwordSetupToken -passwordSetupExpires')
      .sort({ createdAt: -1 });

    const clientsWithProcessCount = await Promise.all(
      clients.map(async (client) => {
        const processCount = await Process.countDocuments({ clientId: client._id });
        return formatClientResponse(client, processCount);
      })
    );

    res.json({ clients: clientsWithProcessCount });
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
};

export const getClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await User.findOne({ _id: id, role: 'client' })
      .select('-passwordSetupToken -passwordSetupExpires');

    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const processCount = await Process.countDocuments({ clientId: client._id });

    res.json(formatClientResponse(client, processCount));
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
};

export const createClient = async (req, res) => {
  try {
    const { name, email, cpf, phone } = req.body;

    if (!name || !email || !cpf || !phone) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const passwordSetupCredentials = generatePasswordSetupCredentials();

    const client = new User({
      name,
      email: email.toLowerCase(),
      cpf,
      phone,
      role: 'client',
      ...passwordSetupCredentials,
    });

    await client.save();

    const emailResult = await trySendPasswordSetupEmail(client);

    res.status(201).json({
      success: true,
      client: formatClientResponse(client, 0),
      emailSent: emailResult.emailSent,
      ...(emailResult.warning ? { warning: emailResult.warning } : {}),
    });
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, cpf, phone } = req.body;

    const client = await User.findOne({ _id: id, role: 'client' });

    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    if (email && email.toLowerCase() !== client.email) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }
      client.email = email.toLowerCase();
    }

    if (name) client.name = name;
    if (cpf) client.cpf = cpf;
    if (phone) client.phone = phone;

    await client.save();

    const { password, passwordSetupToken, passwordSetupExpires, ...clientWithoutSensitive } = client.toObject();

    res.json({
      success: true,
      client: {
        ...clientWithoutSensitive,
        passwordPending: !password,
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
};

export const getPasswordSetupLink = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await User.findOne({ _id: id, role: 'client' });

    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    if (client.password) {
      return res.status(400).json({ error: 'Cliente já definiu a senha' });
    }

    const tokenExpired = !client.passwordSetupExpires || client.passwordSetupExpires <= new Date();
    if (!client.passwordSetupToken || tokenExpired) {
      Object.assign(client, generatePasswordSetupCredentials());
      await client.save();
    }

    res.json({
      success: true,
      setupUrl: buildPasswordSetupUrl(client.passwordSetupToken),
    });
  } catch (error) {
    console.error('Erro ao gerar link de definição de senha:', error);
    res.status(500).json({ error: 'Erro ao gerar link de definição de senha' });
  }
};

export const resendPasswordSetupEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await User.findOne({ _id: id, role: 'client' });

    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    if (client.password) {
      return res.status(400).json({ error: 'Cliente já definiu a senha' });
    }

    Object.assign(client, generatePasswordSetupCredentials());
    await client.save();

    const emailResult = await trySendPasswordSetupEmail(client);

    if (!emailResult.emailSent) {
      return res.status(502).json({
        error: 'Não foi possível enviar o e-mail. Verifique a configuração do Resend.',
      });
    }

    res.json({
      success: true,
      message: 'E-mail de definição de senha reenviado com sucesso.',
    });
  } catch (error) {
    console.error('Erro ao reenviar email de definição de senha:', error);
    res.status(500).json({ error: 'Erro ao reenviar e-mail de definição de senha' });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await User.findOne({ _id: id, role: 'client' });

    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Verificar se o cliente tem processos associados
    const processCount = await Process.countDocuments({ clientId: client._id });
    if (processCount > 0) {
      return res.status(400).json({ 
        error: `Não é possível deletar o cliente. Existem ${processCount} processo(s) associado(s).` 
      });
    }

    await User.findByIdAndDelete(id);

    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    res.status(500).json({ error: 'Erro ao deletar cliente' });
  }
};

export const getClientStats = async (req, res) => {
  try {
    const totalClients = await User.countDocuments({ role: 'client' });

    // Calcular clientes criados este mês
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const clientsThisMonth = await User.countDocuments({
      role: 'client',
      createdAt: { $gte: startOfMonth }
    });

    // Calcular clientes criados no mês anterior
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const clientsLastMonth = await User.countDocuments({
      role: 'client',
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
    });

    res.json({
      totalClients,
      clientsThisMonth,
      clientsLastMonth,
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas de clientes:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas de clientes' });
  }
};

