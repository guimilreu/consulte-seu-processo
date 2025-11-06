import User from '../models/User.js';
import { hashPassword } from '../utils/password.js';

export const getLawyers = async (req, res) => {
  try {
    const lawyers = await User.find({ role: 'lawyer' })
      .select('-password -passwordSetupToken -passwordSetupExpires')
      .sort({ createdAt: -1 });

    res.json({ lawyers });
  } catch (error) {
    console.error('Erro ao buscar advogados:', error);
    res.status(500).json({ error: 'Erro ao buscar advogados' });
  }
};

export const createLawyer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const hashedPassword = await hashPassword(password);

    const lawyer = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'lawyer',
    });

    await lawyer.save();

    const { password: _, passwordSetupToken, passwordSetupExpires, ...lawyerWithoutSensitive } = lawyer.toObject();

    res.status(201).json({
      success: true,
      lawyer: lawyerWithoutSensitive,
    });
  } catch (error) {
    console.error('Erro ao criar advogado:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    res.status(500).json({ error: 'Erro ao criar advogado' });
  }
};

export const updateLawyer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const lawyer = await User.findOne({ _id: id, role: 'lawyer' });

    if (!lawyer) {
      return res.status(404).json({ error: 'Advogado não encontrado' });
    }

    if (email && email.toLowerCase() !== lawyer.email) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }
      lawyer.email = email.toLowerCase();
    }

    if (name) lawyer.name = name;
    if (password) lawyer.password = await hashPassword(password);

    await lawyer.save();

    const { password: _, passwordSetupToken, passwordSetupExpires, ...lawyerWithoutSensitive } = lawyer.toObject();

    res.json({
      success: true,
      lawyer: lawyerWithoutSensitive,
    });
  } catch (error) {
    console.error('Erro ao atualizar advogado:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    res.status(500).json({ error: 'Erro ao atualizar advogado' });
  }
};

export const deleteLawyer = async (req, res) => {
  try {
    const { id } = req.params;

    const lawyer = await User.findOne({ _id: id, role: 'lawyer' });

    if (!lawyer) {
      return res.status(404).json({ error: 'Advogado não encontrado' });
    }

    lawyer.isActive = false;
    await lawyer.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar advogado:', error);
    res.status(500).json({ error: 'Erro ao deletar advogado' });
  }
};

