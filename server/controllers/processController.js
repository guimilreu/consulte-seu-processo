import Process from '../models/Process.js';
import User from '../models/User.js';

export const getAllProcesses = async (req, res) => {
  try {
    const processes = await Process.find()
      .populate('clientId', 'name email')
      .sort({ lastUpdate: -1 });

    const formattedProcesses = processes.map(process => {
      const processObj = process.toObject();
      return {
        ...processObj,
        clientName: processObj.clientId?.name || 'Cliente não encontrado',
        clientId: processObj.clientId?._id || processObj.clientId,
      };
    });

    res.json({ processes: formattedProcesses });
  } catch (error) {
    console.error('Erro ao buscar processos:', error);
    res.status(500).json({ error: 'Erro ao buscar processos' });
  }
};

export const getUserProcesses = async (req, res) => {
  try {
    const userId = req.user._id;
    const processes = await Process.find({ clientId: userId })
      .populate('clientId', 'name email')
      .sort({ lastUpdate: -1 });

    const formattedProcesses = processes.map(process => {
      const processObj = process.toObject();
      return {
        ...processObj,
        clientName: processObj.clientId?.name || 'Cliente não encontrado',
        clientId: processObj.clientId?._id || processObj.clientId,
      };
    });

    res.json({ processes: formattedProcesses });
  } catch (error) {
    console.error('Erro ao buscar processos do usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar processos' });
  }
};

export const getProcess = async (req, res) => {
  try {
    const { id } = req.params;
    const process = await Process.findById(id).populate('clientId', 'name email');

    if (!process) {
      return res.status(404).json({ error: 'Processo não encontrado' });
    }

    if (req.user.role === 'client' && process.clientId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const processObj = process.toObject();
    res.json({
      ...processObj,
      clientName: processObj.clientId?.name || 'Cliente não encontrado',
      clientId: processObj.clientId?._id || processObj.clientId,
    });
  } catch (error) {
    console.error('Erro ao buscar processo:', error);
    res.status(500).json({ error: 'Erro ao buscar processo' });
  }
};

export const searchProcesses = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.json({ processes: [] });
    }

    const searchRegex = new RegExp(q, 'i');
    const processes = await Process.find({
      $or: [
        { processNumber: searchRegex },
        { actionType: searchRegex },
        { description: searchRegex },
        { plaintiff: searchRegex },
        { defendant: searchRegex },
        { court: searchRegex },
        { subject: searchRegex },
      ],
    })
      .populate('clientId', 'name email')
      .sort({ lastUpdate: -1 });

    const formattedProcesses = processes.map(process => {
      const processObj = process.toObject();
      return {
        ...processObj,
        clientName: processObj.clientId?.name || 'Cliente não encontrado',
        clientId: processObj.clientId?._id || processObj.clientId,
      };
    });

    res.json({ processes: formattedProcesses });
  } catch (error) {
    console.error('Erro ao buscar processos:', error);
    res.status(500).json({ error: 'Erro ao buscar processos' });
  }
};

export const createProcess = async (req, res) => {
  try {
    const {
      clientId,
      processNumber,
      actionType,
      court,
      plaintiff,
      defendant,
      filingDate,
      caseValue,
      subject,
      description,
      status,
      tags,
      priority,
    } = req.body;

    if (!clientId || !processNumber || !actionType || !court || !plaintiff || !defendant || !filingDate || !caseValue || !subject || !description || !status) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const client = await User.findById(clientId);
    if (!client || client.role !== 'client') {
      return res.status(400).json({ error: 'Cliente inválido' });
    }

    const process = new Process({
      clientId,
      processNumber,
      actionType,
      court,
      plaintiff,
      defendant,
      filingDate,
      caseValue,
      subject,
      description,
      status,
      tags: tags || [],
      priority: priority || 'media',
      timeline: [{
        title: 'Processo Criado',
        text: 'Processo cadastrado no sistema.',
        date: new Date(),
        type: 'official',
        createdBy: req.user.name,
      }],
      lastUpdate: new Date(),
    });

    await process.save();

    const processObj = await Process.findById(process._id).populate('clientId', 'name email');
    const formattedProcess = {
      ...processObj.toObject(),
      clientName: processObj.clientId?.name || 'Cliente não encontrado',
      clientId: processObj.clientId?._id || processObj.clientId,
    };

    res.status(201).json({
      success: true,
      process: formattedProcess,
    });
  } catch (error) {
    console.error('Erro ao criar processo:', error);
    res.status(500).json({ error: 'Erro ao criar processo' });
  }
};

export const updateProcess = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const process = await Process.findById(id);

    if (!process) {
      return res.status(404).json({ error: 'Processo não encontrado' });
    }

    Object.keys(updateData).forEach(key => {
      if (key !== 'timeline' && key !== '_id' && key !== 'createdAt' && key !== 'updatedAt') {
        process[key] = updateData[key];
      }
    });

    process.lastUpdate = new Date();
    await process.save();

    const processObj = await Process.findById(process._id).populate('clientId', 'name email');
    const formattedProcess = {
      ...processObj.toObject(),
      clientName: processObj.clientId?.name || 'Cliente não encontrado',
      clientId: processObj.clientId?._id || processObj.clientId,
    };

    res.json({
      success: true,
      process: formattedProcess,
    });
  } catch (error) {
    console.error('Erro ao atualizar processo:', error);
    res.status(500).json({ error: 'Erro ao atualizar processo' });
  }
};

export const addTimeline = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, date, type, attachments } = req.body;

    if (!title || !text) {
      return res.status(400).json({ error: 'Título e texto são obrigatórios' });
    }

    const process = await Process.findById(id);

    if (!process) {
      return res.status(404).json({ error: 'Processo não encontrado' });
    }

    const timelineItem = {
      title,
      text,
      date: date ? new Date(date) : new Date(),
      type: type || 'official',
      attachments: attachments || [],
      createdBy: req.user.name,
    };

    process.timeline.push(timelineItem);
    process.lastUpdate = new Date();
    await process.save();

    const newTimelineItem = process.timeline[process.timeline.length - 1];

    res.status(201).json({
      success: true,
      timeline: newTimelineItem,
    });
  } catch (error) {
    console.error('Erro ao adicionar andamento:', error);
    res.status(500).json({ error: 'Erro ao adicionar andamento' });
  }
};

export const updateTimeline = async (req, res) => {
  try {
    const { id, timelineId } = req.params;
    const { title, text, date, type, attachments } = req.body;

    const process = await Process.findById(id);

    if (!process) {
      return res.status(404).json({ error: 'Processo não encontrado' });
    }

    const timelineItem = process.timeline.id(timelineId);

    if (!timelineItem) {
      return res.status(404).json({ error: 'Andamento não encontrado' });
    }

    if (title) timelineItem.title = title;
    if (text) timelineItem.text = text;
    if (date) timelineItem.date = new Date(date);
    if (type) timelineItem.type = type;
    if (attachments !== undefined) timelineItem.attachments = attachments;

    process.lastUpdate = new Date();
    await process.save();

    res.json({
      success: true,
      timeline: timelineItem,
    });
  } catch (error) {
    console.error('Erro ao atualizar andamento:', error);
    res.status(500).json({ error: 'Erro ao atualizar andamento' });
  }
};

export const deleteTimeline = async (req, res) => {
  try {
    const { id, timelineId } = req.params;

    const process = await Process.findById(id);

    if (!process) {
      return res.status(404).json({ error: 'Processo não encontrado' });
    }

    const timelineItem = process.timeline.id(timelineId);

    if (!timelineItem) {
      return res.status(404).json({ error: 'Andamento não encontrado' });
    }

    timelineItem.deleteOne();
    process.lastUpdate = new Date();
    await process.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar andamento:', error);
    res.status(500).json({ error: 'Erro ao deletar andamento' });
  }
};

export const deleteProcess = async (req, res) => {
  try {
    const { id } = req.params;

    const process = await Process.findById(id);

    if (!process) {
      return res.status(404).json({ error: 'Processo não encontrado' });
    }

    await Process.findByIdAndDelete(id);

    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar processo:', error);
    res.status(500).json({ error: 'Erro ao deletar processo' });
  }
};

export const getStats = async (req, res) => {
  try {
    const totalProcesses = await Process.countDocuments();
    const activeProcesses = await Process.countDocuments({ 
      status: { $nin: ['Concluído', 'Arquivado'] } 
    });
    const completedProcesses = await Process.countDocuments({ 
      status: { $in: ['Concluído', 'Arquivado'] } 
    });

    // Calcular processos criados este mês
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const processesThisMonth = await Process.countDocuments({
      createdAt: { $gte: startOfMonth }
    });

    // Calcular processos criados no mês anterior
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const processesLastMonth = await Process.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
    });

    // Calcular percentual de conclusão
    const completionRate = totalProcesses > 0 
      ? Math.round((completedProcesses / totalProcesses) * 100) 
      : 0;

    // Calcular evolução mensal (últimos 6 meses)
    const monthlyData = [];
    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      
      const count = await Process.countDocuments({
        createdAt: { $gte: date, $lt: nextMonth }
      });
      
      monthlyData.push({
        month: monthNames[date.getMonth()],
        processos: count
      });
    }

    res.json({
      totalProcesses,
      activeProcesses,
      completedProcesses,
      processesThisMonth,
      processesLastMonth,
      completionRate,
      monthlyData,
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
};

