import dotenv from 'dotenv';
import User from '../models/User.js';
import Process from '../models/Process.js';
import { hashPassword } from '../utils/password.js';
import { connectDB } from '../lib/db.js';

dotenv.config();

// Dados dos clientes fake
const clientsData = [
  {
    name: 'Maria Silva Santos',
    email: 'maria.silva@email.com',
    password: 'cliente123',
    cpf: '123.456.789-00',
    phone: '(11) 98765-4321',
  },
  {
    name: 'João Pedro Oliveira',
    email: 'joao.oliveira@email.com',
    password: 'cliente123',
    cpf: '234.567.890-11',
    phone: '(11) 97654-3210',
  },
  {
    name: 'Ana Paula Costa',
    email: 'ana.costa@email.com',
    password: 'cliente123',
    cpf: '345.678.901-22',
    phone: '(11) 96543-2109',
  },
  {
    name: 'Carlos Roberto Ferreira',
    email: 'carlos.ferreira@email.com',
    password: 'cliente123',
    cpf: '456.789.012-33',
    phone: '(11) 95432-1098',
  },
  {
    name: 'Juliana Almeida Lima',
    email: 'juliana.lima@email.com',
    password: 'cliente123',
    cpf: '567.890.123-44',
    phone: '(11) 94321-0987',
  },
];

// Tipos de ações e áreas jurídicas
const actionTypes = [
  'Ação de Indenização por Danos Morais',
  'Ação Trabalhista - Rescisão Indireta',
  'Ação de Cobrança',
  'Ação de Despejo',
  'Ação de Divórcio Consensual',
  'Ação de Alimentos',
  'Ação de Reconhecimento de Vínculo Empregatício',
  'Ação de Revisão de Benefício Previdenciário',
  'Ação de Indenização por Dano Material',
  'Ação de Usucapião',
];

const tags = ['Trabalhista', 'Cível', 'Criminal', 'Família', 'Tributário', 'Previdenciário', 'Empresarial'];

const statuses = [
  'Distribuído',
  'Aguardando análise inicial',
  'Citação pendente',
  'Aguardando contestação',
  'Em fase de instrução',
  'Aguardando perícia',
  'Perícia em andamento',
  'Audiência designada',
  'Aguardando documentação',
  'Concluso para sentença',
  'Sentença proferida',
  'Em fase de recurso',
  'Aguardando trânsito em julgado',
  'Em fase de cumprimento',
  'Arquivado',
  'Concluído',
];

const priorities = ['baixa', 'media', 'alta', 'urgente'];

const courts = [
  '1ª Vara Cível da Comarca de São Paulo',
  '2ª Vara do Trabalho de São Paulo',
  '3ª Vara de Família de São Paulo',
  '1ª Vara Criminal de São Paulo',
  'Vara de Execuções Fiscais de São Paulo',
  '1ª Vara Previdenciária de São Paulo',
];

// Templates de timeline
const timelineTemplates = [
  {
    title: 'Processo Distribuído',
    text: 'Processo foi distribuído para o juízo competente. Aguardando análise da petição inicial.',
  },
  {
    title: 'Petição Inicial Recebida',
    text: 'A petição inicial foi recebida e deferida pelo juízo. Determinada a citação da parte ré para apresentar contestação no prazo legal de 15 dias.',
  },
  {
    title: 'Citação Realizada',
    text: 'A citação foi realizada com sucesso. A parte ré foi intimada para apresentar contestação.',
  },
  {
    title: 'Contestação Apresentada',
    text: 'A parte ré apresentou contestação refutando os fatos alegados na inicial. Processo segue para análise.',
  },
  {
    title: 'Réplica Apresentada',
    text: 'Foi apresentada réplica à contestação, reiterando os pedidos iniciais e rebatendo os argumentos da defesa.',
  },
  {
    title: 'Audiência de Conciliação Designada',
    text: 'Foi designada audiência de conciliação para tentativa de acordo entre as partes.',
  },
  {
    title: 'Audiência Realizada',
    text: 'Audiência realizada. As partes não chegaram a um acordo. O processo seguirá para a fase de instrução.',
  },
  {
    title: 'Perícia Deferida',
    text: 'O juízo deferiu a realização de perícia. O perito nomeado entrará em contato para agendar.',
  },
  {
    title: 'Sentença Publicada',
    text: 'Sentença publicada favorável ao cliente. Análise detalhada em anexo.',
  },
  {
    title: 'Recurso Interposto',
    text: 'Foi interposto recurso contra a decisão. Aguardando análise do tribunal.',
  },
];

// Função para gerar número de processo fake
function generateProcessNumber() {
  const year = Math.floor(Math.random() * 3) + 2022; // 2022-2024
  const segment = Math.floor(Math.random() * 9000000) + 1000000; // 7 dígitos
  const court = Math.floor(Math.random() * 90) + 10; // 2 dígitos
  const branch = Math.floor(Math.random() * 9) + 1; // 1 dígito
  const state = Math.floor(Math.random() * 90) + 10; // 2 dígitos
  return `${segment}-${court}.${branch}.${state}.${year}`;
}

// Função para gerar data aleatória nos últimos 12 meses
function randomDateInLast12Months() {
  const now = new Date();
  const monthsAgo = Math.floor(Math.random() * 12);
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(now);
  date.setMonth(date.getMonth() - monthsAgo);
  date.setDate(date.getDate() - daysAgo);
  return date;
}

// Função para gerar timeline baseada no status e data de criação
function generateTimeline(filingDate, status) {
  const timeline = [];
  const now = new Date();
  
  // Sempre adiciona o primeiro andamento
  timeline.push({
    title: 'Processo Criado',
    text: 'Processo cadastrado no sistema.',
    date: filingDate,
    type: 'official',
    createdBy: 'Sistema',
  });

  // Adiciona andamentos baseados no tempo decorrido
  const daysSinceFiling = Math.floor((now - filingDate) / (1000 * 60 * 60 * 24));
  
  if (daysSinceFiling > 30) {
    const date1 = new Date(filingDate);
    date1.setDate(date1.getDate() + 15);
    timeline.push({
      title: timelineTemplates[1].title,
      text: timelineTemplates[1].text,
      date: date1,
      type: 'official',
      createdBy: 'Sistema',
    });
  }

  if (daysSinceFiling > 60) {
    const date2 = new Date(filingDate);
    date2.setDate(date2.getDate() + 45);
    timeline.push({
      title: timelineTemplates[3].title,
      text: timelineTemplates[3].text,
      date: date2,
      type: 'official',
      createdBy: 'Sistema',
    });
  }

  if (daysSinceFiling > 90 && status !== 'Concluído' && status !== 'Arquivado') {
    const date3 = new Date(filingDate);
    date3.setDate(date3.getDate() + 75);
    timeline.push({
      title: timelineTemplates[5].title,
      text: timelineTemplates[5].text,
      date: date3,
      type: 'official',
      createdBy: 'Sistema',
    });
  }

  // Se está concluído, adiciona sentença
  if (status === 'Concluído') {
    const conclusionDate = new Date(filingDate);
    conclusionDate.setMonth(conclusionDate.getMonth() + Math.floor(Math.random() * 6) + 3);
    timeline.push({
      title: timelineTemplates[8].title,
      text: timelineTemplates[8].text,
      date: conclusionDate,
      type: 'official',
      createdBy: 'Sistema',
    });
  }

  return timeline;
}

const seedDemo = async () => {
  try {
    await connectDB();
    console.log('Conectado ao banco de dados');

    // Limpar dados existentes (opcional - comentar se não quiser limpar)
    console.log('Limpando dados existentes...');
    await Process.deleteMany({});
    await User.deleteMany({ role: 'client' });
    console.log('Dados limpos');

    // Criar clientes
    const createdClients = [];
    console.log('\n=== Criando Clientes ===');
    
    for (const clientData of clientsData) {
      const hashedPassword = await hashPassword(clientData.password);
      
      const client = new User({
        name: clientData.name,
        email: clientData.email.toLowerCase(),
        password: hashedPassword,
        role: 'client',
        cpf: clientData.cpf,
        phone: clientData.phone,
        isActive: true,
      });

      await client.save();
      createdClients.push(client);
      console.log(`✓ Cliente criado: ${clientData.name} (${clientData.email})`);
    }

    // Criar processos para cada cliente
    console.log('\n=== Criando Processos ===');
    let totalProcesses = 0;

    for (const client of createdClients) {
      // Cada cliente terá entre 2 e 5 processos
      const numProcesses = Math.floor(Math.random() * 4) + 2;
      
      for (let i = 0; i < numProcesses; i++) {
        const filingDate = randomDateInLast12Months();
        const actionType = actionTypes[Math.floor(Math.random() * actionTypes.length)];
        const tag = tags[Math.floor(Math.random() * tags.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const priority = priorities[Math.floor(Math.random() * priorities.length)];
        const court = courts[Math.floor(Math.random() * courts.length)];
        
        const timeline = generateTimeline(filingDate, status);
        
        // Calcular lastUpdate baseado no último andamento
        const lastUpdate = timeline.length > 0 
          ? timeline[timeline.length - 1].date 
          : filingDate;

        const process = new Process({
          clientId: client._id,
          processNumber: generateProcessNumber(),
          actionType,
          court,
          plaintiff: client.name,
          defendant: `Empresa ${Math.floor(Math.random() * 100)} Ltda`,
          filingDate,
          caseValue: `R$ ${(Math.random() * 500000 + 10000).toFixed(2).replace('.', ',')}`,
          subject: `${actionType} - ${tag}`,
          description: `Processo relacionado a ${actionType.toLowerCase()} envolvendo ${client.name} como autor(a). O caso trata de questões relacionadas à área ${tag.toLowerCase()}.`,
          status,
          tags: [tag],
          priority,
          timeline,
          lastUpdate,
        });

        await process.save();
        totalProcesses++;
        console.log(`  ✓ Processo criado para ${client.name}: ${process.processNumber} (${status})`);
      }
    }

    console.log(`\n=== Seed Concluído ===`);
    console.log(`Total de clientes criados: ${createdClients.length}`);
    console.log(`Total de processos criados: ${totalProcesses}`);
    console.log('\n=== CREDENCIAIS DOS CLIENTES ===');
    console.log('Todos os clientes têm a senha: cliente123\n');
    
    clientsData.forEach((client, index) => {
      console.log(`${index + 1}. ${client.name}`);
      console.log(`   Email: ${client.email}`);
      console.log(`   Senha: ${client.password}`);
      console.log(`   CPF: ${client.cpf}`);
      console.log('');
    });

    process.exit(0);
  } catch (error) {
    console.error('Erro ao criar seed:', error);
    process.exit(1);
  }
};

seedDemo();



