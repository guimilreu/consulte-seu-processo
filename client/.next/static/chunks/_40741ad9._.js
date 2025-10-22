(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/store/process-store.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProcessStore",
    ()=>useProcessStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
"use client";
;
// Dados mockados - No futuro virão da API
const MOCK_PROCESSES = [
    {
        id: 1,
        clientId: 1,
        clientName: "Maria Silva Santos",
        processNumber: "0001234-56.2023.8.02.0001",
        actionType: "Ação de Indenização por Danos Morais",
        court: "1ª Vara Cível da Comarca de Ourinhos",
        plaintiff: "Maria Silva Santos",
        defendant: "João Carlos Transportes Ltda.",
        filingDate: "2023-03-15",
        caseValue: "R$ 50.000,00",
        subject: "Danos morais decorrentes de acidente de trânsito",
        description: "Pedido de indenização por danos morais e materiais sofridos em acidente de trânsito causado por veículo da empresa ré",
        status: "Em andamento",
        currentStage: "Aguardando realização de perícia técnica",
        tags: [
            "Cível"
        ],
        priority: "alta",
        lastUpdate: "2024-10-01",
        createdAt: "2023-03-15",
        timeline: [
            {
                id: 1,
                date: "2023-03-15",
                title: "Processo Distribuído",
                text: "Processo foi distribuído para a 1ª Vara Cível da Comarca de Ourinhos. Aguardando análise da petição inicial pelo juízo.",
                type: "official",
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2023-03-15T10:30:00"
            },
            {
                id: 2,
                date: "2023-04-02",
                title: "Petição Inicial Recebida",
                text: "A petição inicial foi recebida e deferida pelo juízo. Determinada a citação da parte ré para apresentar contestação no prazo legal de 15 dias.",
                type: "official",
                attachments: [
                    {
                        id: 1,
                        name: "despacho_inicial.pdf",
                        url: "/documents/despacho_inicial.pdf",
                        type: "application/pdf"
                    }
                ],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2023-04-02T14:20:00"
            },
            {
                id: 3,
                date: "2023-05-10",
                title: "Contestação Apresentada",
                text: "A parte ré apresentou contestação refutando os fatos alegados na inicial. Foi solicitada a produção de provas documentais e testemunhais.",
                type: "official",
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2023-05-10T09:15:00"
            },
            {
                id: 4,
                date: "2023-06-20",
                title: "Audiência de Conciliação Designada",
                text: "Foi designada audiência de conciliação para o dia 15/08/2023 às 14h00. Importante sua presença para tentativa de acordo.",
                type: "official",
                attachments: [
                    {
                        id: 2,
                        name: "intimacao_audiencia.pdf",
                        url: "/documents/intimacao_audiencia.pdf",
                        type: "application/pdf"
                    }
                ],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2023-06-20T16:45:00"
            },
            {
                id: 5,
                date: "2023-08-15",
                title: "Audiência de Conciliação Realizada",
                text: "Audiência de conciliação realizada. As partes não chegaram a um acordo. O processo seguirá para a fase de instrução probatória.",
                type: "official",
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2023-08-15T15:30:00"
            },
            {
                id: 6,
                date: "2024-10-01",
                title: "Perícia Técnica Deferida",
                text: "O juízo deferiu a realização de perícia técnica para avaliação dos danos. O perito nomeado entrará em contato para agendar a vistoria.",
                type: "official",
                attachments: [
                    {
                        id: 3,
                        name: "despacho_pericia.pdf",
                        url: "/documents/despacho_pericia.pdf",
                        type: "application/pdf"
                    }
                ],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2024-10-01T11:00:00"
            }
        ]
    },
    {
        id: 2,
        clientId: 1,
        clientName: "Maria Silva Santos",
        processNumber: "0007890-12.2024.8.02.0002",
        actionType: "Revisão de Contrato - Incorporação Imobiliária",
        court: "3ª Vara Cível da Comarca de Ourinhos",
        plaintiff: "Maria Silva Santos",
        defendant: "Construtora Lar Feliz Ltda.",
        filingDate: "2024-02-10",
        caseValue: "R$ 250.000,00",
        subject: "Revisão de cláusulas contratuais abusivas",
        description: "Ação revisional de cláusulas contratuais abusivas em contrato de compra e venda de imóvel na planta",
        status: "Em andamento",
        currentStage: "Aguardando juntada de documentos complementares",
        tags: [
            "Cível",
            "Empresarial"
        ],
        priority: "media",
        lastUpdate: "2024-09-28",
        createdAt: "2024-02-10",
        timeline: [
            {
                id: 1,
                date: "2024-02-10",
                title: "Processo Distribuído",
                text: "Processo distribuído para a 3ª Vara Cível da Comarca de Ourinhos. Petição inicial protocolada com pedido de tutela de urgência.",
                type: "official",
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2024-02-10T09:00:00"
            },
            {
                id: 2,
                date: "2024-03-05",
                title: "Tutela de Urgência Deferida",
                text: "Deferida a tutela de urgência para suspensão das cobranças até decisão final do processo. A construtora foi notificada da decisão.",
                type: "official",
                attachments: [
                    {
                        id: 4,
                        name: "decisao_tutela.pdf",
                        url: "/documents/decisao_tutela.pdf",
                        type: "application/pdf"
                    }
                ],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2024-03-05T13:30:00"
            },
            {
                id: 3,
                date: "2024-09-28",
                title: "Juntada de Documentos Complementares",
                text: "Foram juntados aos autos os documentos complementares solicitados pelo juízo, incluindo extratos bancários e planilha de cálculo dos valores contestados.",
                type: "official",
                attachments: [
                    {
                        id: 5,
                        name: "documentos_complementares.pdf",
                        url: "/documents/documentos_complementares.pdf",
                        type: "application/pdf"
                    }
                ],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2024-09-28T10:15:00"
            }
        ]
    },
    {
        id: 3,
        clientId: 1,
        clientName: "Maria Silva Santos",
        processNumber: "0003456-78.2024.8.02.0001",
        actionType: "Inventário e Partilha de Bens",
        court: "1º Tabelionato de Notas de Ourinhos",
        plaintiff: "Maria Silva Santos (Inventariante)",
        defendant: "N/A",
        filingDate: "2024-08-01",
        caseValue: "R$ 800.000,00",
        subject: "Inventário extrajudicial de bens",
        description: "Inventário extrajudicial para partilha de bens deixados pelo falecido José Silva Santos",
        status: "Aguardando documentação",
        currentStage: "Pendente de documentação dos herdeiros",
        tags: [
            "Família"
        ],
        priority: "baixa",
        lastUpdate: "2024-09-15",
        createdAt: "2024-08-01",
        timeline: [
            {
                id: 1,
                date: "2024-08-01",
                title: "Processo Iniciado",
                text: "Processo de inventário iniciado no cartório. Aguardando documentação completa de todos os herdeiros.",
                type: "official",
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2024-08-01T14:00:00"
            },
            {
                id: 2,
                date: "2024-09-15",
                title: "Documentação Pendente",
                text: "Identificamos que ainda faltam os seguintes documentos: certidão de casamento atualizada e documentos pessoais de um dos herdeiros. Por favor, providencie o quanto antes.",
                type: "comment",
                attachments: [
                    {
                        id: 6,
                        name: "lista_documentos_pendentes.pdf",
                        url: "/documents/lista_documentos_pendentes.pdf",
                        type: "application/pdf"
                    }
                ],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2024-09-15T16:20:00"
            }
        ]
    },
    {
        id: 4,
        clientId: 2,
        clientName: "João Pedro Oliveira",
        processNumber: "0005678-90.2023.8.02.0003",
        actionType: "Reclamação Trabalhista - Horas Extras",
        court: "2ª Vara do Trabalho de Ourinhos",
        plaintiff: "João Pedro Oliveira",
        defendant: "Metalúrgica Santos Ltda.",
        filingDate: "2023-06-20",
        caseValue: "R$ 35.000,00",
        subject: "Pagamento de horas extras e adicional noturno",
        description: "Reclamação trabalhista para pagamento de horas extras não pagas durante o período de vínculo empregatício",
        status: "Em fase de recurso",
        currentStage: "Recurso ordinário em análise no TRT",
        tags: [
            "Trabalhista"
        ],
        priority: "urgente",
        lastUpdate: "2024-09-20",
        createdAt: "2023-06-20",
        timeline: [
            {
                id: 1,
                date: "2023-06-20",
                title: "Reclamação Trabalhista Distribuída",
                text: "Reclamação trabalhista distribuída na 2ª Vara do Trabalho de Ourinhos. Pedido principal: pagamento de horas extras e adicional noturno.",
                type: "official",
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2023-06-20T11:00:00"
            },
            {
                id: 2,
                date: "2023-07-15",
                title: "Audiência Inicial Realizada",
                text: "Realizada audiência inicial. A empresa apresentou defesa contestando os valores. Processo segue para instrução.",
                type: "official",
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2023-07-15T10:30:00"
            },
            {
                id: 3,
                date: "2024-03-10",
                title: "Sentença Publicada - Procedência Parcial",
                text: "Sentença publicada com procedência parcial dos pedidos. Deferido o pagamento de 70% das horas extras pleiteadas. A empresa foi condenada ao pagamento.",
                type: "official",
                attachments: [
                    {
                        id: 7,
                        name: "sentenca.pdf",
                        url: "/documents/sentenca.pdf",
                        type: "application/pdf"
                    }
                ],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2024-03-10T14:00:00"
            },
            {
                id: 4,
                date: "2024-09-20",
                title: "Recurso Ordinário Interposto",
                text: "A empresa recorrente interpôs recurso ordinário contestando o valor da condenação. Prazo para contrarrazões já foi cumprido. Aguardando julgamento no TRT.",
                type: "official",
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2024-09-20T09:45:00"
            }
        ]
    },
    {
        id: 5,
        clientId: 3,
        clientName: "Ana Carolina Souza",
        processNumber: "0002345-67.2024.8.02.0001",
        actionType: "Divórcio Consensual",
        court: "1ª Vara de Família da Comarca de Ourinhos",
        plaintiff: "Ana Carolina Souza",
        defendant: "Roberto Alves Souza",
        filingDate: "2024-05-10",
        caseValue: "R$ 0,00",
        subject: "Dissolução do vínculo matrimonial e partilha de bens",
        description: "Processo de divórcio consensual com partilha de bens e acordo sobre guarda dos filhos",
        status: "Concluído",
        currentStage: "Processo encerrado - Sentença transitada em julgado",
        tags: [
            "Família"
        ],
        priority: "media",
        lastUpdate: "2024-08-30",
        createdAt: "2024-05-10",
        timeline: [
            {
                id: 1,
                date: "2024-05-10",
                title: "Petição Inicial Protocolada",
                text: "Petição inicial de divórcio consensual protocolada. Todas as questões já foram acordadas entre as partes.",
                type: "official",
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2024-05-10T10:00:00"
            },
            {
                id: 2,
                date: "2024-06-20",
                title: "Audiência de Ratificação Realizada",
                text: "Realizada audiência onde ambas as partes ratificaram os termos do acordo. Partilha de bens homologada.",
                type: "official",
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2024-06-20T15:00:00"
            },
            {
                id: 3,
                date: "2024-08-30",
                title: "Sentença de Divórcio Proferida",
                text: "Sentença de divórcio proferida e homologada. O processo foi concluído. As certidões já podem ser solicitadas no cartório.",
                type: "official",
                attachments: [
                    {
                        id: 8,
                        name: "sentenca_divorcio.pdf",
                        url: "/documents/sentenca_divorcio.pdf",
                        type: "application/pdf"
                    }
                ],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2024-08-30T11:30:00"
            }
        ]
    }
];
const useProcessStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        // State
        processes: [],
        selectedProcess: null,
        searchResults: [],
        searchTerm: "",
        isLoading: false,
        error: null,
        // Actions para CLIENTES
        fetchMyProcesses: async (userId)=>{
            set({
                isLoading: true,
                error: null
            });
            // No futuro: await api.get(`/processes/user/${userId}`)
            await new Promise((resolve)=>setTimeout(resolve, 800));
            const userProcesses = MOCK_PROCESSES.filter((p)=>p.clientId === userId);
            set({
                processes: userProcesses,
                isLoading: false
            });
        },
        // Actions para ADMINS
        fetchAllProcesses: async ()=>{
            set({
                isLoading: true,
                error: null
            });
            // No futuro: await api.get('/processes')
            await new Promise((resolve)=>setTimeout(resolve, 800));
            set({
                processes: MOCK_PROCESSES,
                isLoading: false
            });
        },
        // Buscar processo específico
        fetchProcess: async (processId)=>{
            set({
                isLoading: true,
                error: null
            });
            // No futuro: await api.get(`/processes/${processId}`)
            await new Promise((resolve)=>setTimeout(resolve, 600));
            const process = MOCK_PROCESSES.find((p)=>p.id === parseInt(processId));
            set({
                selectedProcess: process,
                isLoading: false
            });
        },
        // Busca (admin)
        search: async (term)=>{
            set({
                isLoading: true,
                searchTerm: term
            });
            // No futuro: await api.get(`/processes/search?q=${term}`)
            await new Promise((resolve)=>setTimeout(resolve, 500));
            if (!term || term.trim() === "") {
                set({
                    searchResults: [],
                    isLoading: false
                });
                return;
            }
            const lowerTerm = term.toLowerCase();
            const results = MOCK_PROCESSES.filter((p)=>p.processNumber.toLowerCase().includes(lowerTerm) || p.actionType.toLowerCase().includes(lowerTerm) || p.description.toLowerCase().includes(lowerTerm) || p.clientName.toLowerCase().includes(lowerTerm) || p.plaintiff.toLowerCase().includes(lowerTerm) || p.defendant.toLowerCase().includes(lowerTerm) || p.court.toLowerCase().includes(lowerTerm) || p.subject.toLowerCase().includes(lowerTerm));
            set({
                searchResults: results,
                isLoading: false
            });
        },
        clearSearch: ()=>{
            set({
                searchTerm: "",
                searchResults: []
            });
        },
        // Export PDF no formato do relatório processual
        exportToPdf: async (processId)=>{
            set({
                isLoading: true
            });
            // No futuro: await api.post(`/processes/${processId}/export-pdf`)
            await new Promise((resolve)=>setTimeout(resolve, 500));
            const process = MOCK_PROCESSES.find((p)=>p.id === processId);
            if (process) {
                // Gerar conteúdo do relatório no formato do cliente
                let reportContent = "RELATÓRIO PROCESSUAL\n\n";
                reportContent += "DADOS DO PROCESSO:\n";
                reportContent += "Nº do processo: ".concat(process.processNumber, "\n");
                reportContent += "Juízo: ".concat(process.court, "\n");
                reportContent += "Cliente: ".concat(process.clientName, "\n");
                reportContent += "Réu (parte contrária): ".concat(process.defendant, "\n");
                reportContent += "Data do ajuizamento: ".concat(new Date(process.filingDate).toLocaleDateString("pt-BR"), "\n");
                reportContent += "Valor da Causa: ".concat(process.caseValue, "\n");
                reportContent += "Assunto principal do processo: ".concat(process.subject, "\n\n");
                reportContent += "Andamentos do processo:\n";
                // Ordenar timeline por data (do mais antigo para o mais novo)
                const sortedTimeline = [
                    ...process.timeline
                ].sort((a, b)=>new Date(a.date) - new Date(b.date));
                sortedTimeline.forEach((item)=>{
                    const formattedDate = new Date(item.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    });
                    reportContent += "".concat(formattedDate, ": ").concat(item.title, ": ").concat(item.text, "\n");
                    if (item.attachments && item.attachments.length > 0) {
                        reportContent += "   Anexos: ".concat(item.attachments.map((a)=>a.name).join(", "), "\n");
                    }
                    reportContent += "\n";
                });
                reportContent += "\n";
                reportContent += "ESTÁGIO ATUAL: ".concat(process.currentStage || process.status, "\n");
                reportContent += "\nRelatório gerado em: ".concat(new Date().toLocaleDateString("pt-BR"), " às ").concat(new Date().toLocaleTimeString("pt-BR"));
                // Criar e fazer download do arquivo
                const blob = new Blob([
                    reportContent
                ], {
                    type: "text/plain;charset=utf-8"
                });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "Relatorio_Processual_".concat(process.processNumber.replace(/[^\d]/g, ""), ".txt");
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
            set({
                isLoading: false
            });
        },
        // Criar novo processo (admin)
        createProcess: async (processData)=>{
            set({
                isLoading: true,
                error: null
            });
            // No futuro: await api.post('/processes', processData)
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            const newProcess = {
                id: MOCK_PROCESSES.length + 1,
                ...processData,
                createdAt: new Date().toISOString().split("T")[0],
                lastUpdate: new Date().toISOString().split("T")[0],
                timeline: [
                    {
                        id: 1,
                        date: new Date().toISOString().split("T")[0],
                        title: "Processo Criado",
                        text: "Processo cadastrado no sistema.",
                        attachments: [],
                        createdBy: "Sistema",
                        createdAt: new Date().toISOString()
                    }
                ]
            };
            MOCK_PROCESSES.push(newProcess);
            set({
                processes: [
                    ...MOCK_PROCESSES
                ],
                isLoading: false
            });
            return {
                success: true,
                process: newProcess
            };
        },
        // Atualizar processo (admin)
        updateProcess: async (processId, updateData)=>{
            set({
                isLoading: true,
                error: null
            });
            // No futuro: await api.put(`/processes/${processId}`, updateData)
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            const index = MOCK_PROCESSES.findIndex((p)=>p.id === processId);
            if (index !== -1) {
                MOCK_PROCESSES[index] = {
                    ...MOCK_PROCESSES[index],
                    ...updateData,
                    lastUpdate: new Date().toISOString().split("T")[0]
                };
                set({
                    processes: [
                        ...MOCK_PROCESSES
                    ],
                    isLoading: false
                });
                return {
                    success: true,
                    process: MOCK_PROCESSES[index]
                };
            }
            set({
                isLoading: false,
                error: "Processo não encontrado"
            });
            return {
                success: false,
                error: "Processo não encontrado"
            };
        },
        // Buscar processos por cliente
        getProcessesByClient: (clientId)=>{
            return MOCK_PROCESSES.filter((p)=>p.clientId === clientId);
        },
        // Adicionar andamento a um processo
        addTimeline: async (processId, timelineData)=>{
            set({
                isLoading: true,
                error: null
            });
            // No futuro: await api.post(`/processes/${processId}/timeline`, timelineData)
            await new Promise((resolve)=>setTimeout(resolve, 800));
            const process = MOCK_PROCESSES.find((p)=>p.id === processId);
            if (process) {
                const newTimeline = {
                    id: process.timeline.length + 1,
                    ...timelineData,
                    date: timelineData.date || new Date().toISOString().split("T")[0],
                    createdAt: new Date().toISOString(),
                    attachments: timelineData.attachments || [],
                    type: timelineData.type || "official"
                };
                process.timeline.push(newTimeline);
                process.lastUpdate = new Date().toISOString().split("T")[0];
                set({
                    selectedProcess: {
                        ...process
                    },
                    processes: [
                        ...MOCK_PROCESSES
                    ],
                    isLoading: false
                });
                return {
                    success: true,
                    timeline: newTimeline
                };
            }
            set({
                isLoading: false,
                error: "Processo não encontrado"
            });
            return {
                success: false,
                error: "Processo não encontrado"
            };
        },
        // Deletar andamento de um processo
        deleteTimeline: async (processId, timelineId)=>{
            set({
                isLoading: true,
                error: null
            });
            // No futuro: await api.delete(`/processes/${processId}/timeline/${timelineId}`)
            await new Promise((resolve)=>setTimeout(resolve, 500));
            const process = MOCK_PROCESSES.find((p)=>p.id === processId);
            if (process) {
                const timelineIndex = process.timeline.findIndex((t)=>t.id === timelineId);
                if (timelineIndex !== -1) {
                    process.timeline.splice(timelineIndex, 1);
                    process.lastUpdate = new Date().toISOString().split("T")[0];
                    set({
                        selectedProcess: {
                            ...process
                        },
                        processes: [
                            ...MOCK_PROCESSES
                        ],
                        isLoading: false
                    });
                    return {
                        success: true
                    };
                }
                set({
                    isLoading: false,
                    error: "Andamento não encontrado"
                });
                return {
                    success: false,
                    error: "Andamento não encontrado"
                };
            }
            set({
                isLoading: false,
                error: "Processo não encontrado"
            });
            return {
                success: false,
                error: "Processo não encontrado"
            };
        },
        // Atualizar andamento de um processo
        updateTimeline: async (processId, timelineId, timelineData)=>{
            set({
                isLoading: true,
                error: null
            });
            // No futuro: await api.put(`/processes/${processId}/timeline/${timelineId}`, timelineData)
            await new Promise((resolve)=>setTimeout(resolve, 500));
            const process = MOCK_PROCESSES.find((p)=>p.id === processId);
            if (process) {
                const timelineIndex = process.timeline.findIndex((t)=>t.id === timelineId);
                if (timelineIndex !== -1) {
                    process.timeline[timelineIndex] = {
                        ...process.timeline[timelineIndex],
                        ...timelineData
                    };
                    process.lastUpdate = new Date().toISOString().split("T")[0];
                    set({
                        selectedProcess: {
                            ...process
                        },
                        processes: [
                            ...MOCK_PROCESSES
                        ],
                        isLoading: false
                    });
                    return {
                        success: true,
                        timeline: process.timeline[timelineIndex]
                    };
                }
                set({
                    isLoading: false,
                    error: "Andamento não encontrado"
                });
                return {
                    success: false,
                    error: "Andamento não encontrado"
                };
            }
            set({
                isLoading: false,
                error: "Processo não encontrado"
            });
            return {
                success: false,
                error: "Processo não encontrado"
            };
        },
        // Stats (admin)
        getStats: ()=>{
            const all = MOCK_PROCESSES;
            return {
                totalProcesses: all.length,
                activeProcesses: all.filter((p)=>p.status !== "Concluído").length,
                completedProcesses: all.filter((p)=>p.status === "Concluído").length
            };
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/store/client-store.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useClientStore",
    ()=>useClientStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
"use client";
;
// Dados mockados - No futuro virão da API
const MOCK_CLIENTS = [
    {
        id: 1,
        name: "Maria Silva Santos",
        email: "maria.santos@email.com",
        cpf: "123.456.789-00",
        phone: "(14) 99999-1111",
        createdAt: "2023-01-15",
        processCount: 3,
        role: "client"
    },
    {
        id: 2,
        name: "João Pedro Oliveira",
        email: "joao.oliveira@email.com",
        cpf: "987.654.321-00",
        phone: "(14) 99999-2222",
        createdAt: "2023-04-20",
        processCount: 1,
        role: "client"
    },
    {
        id: 3,
        name: "Ana Carolina Souza",
        email: "ana.souza@email.com",
        cpf: "456.789.123-00",
        phone: "(14) 99999-3333",
        createdAt: "2024-02-10",
        processCount: 1,
        role: "client"
    },
    {
        id: 4,
        name: "Pedro Henrique Costa",
        email: "pedro.costa@email.com",
        cpf: "321.654.987-00",
        phone: "(14) 99999-4444",
        createdAt: "2024-05-05",
        processCount: 0,
        role: "client"
    }
];
const useClientStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        // State
        clients: [],
        selectedClient: null,
        isLoading: false,
        error: null,
        // Actions
        fetchClients: async ()=>{
            set({
                isLoading: true,
                error: null
            });
            // No futuro: await api.get('/clients')
            await new Promise((resolve)=>setTimeout(resolve, 800));
            set({
                clients: MOCK_CLIENTS,
                isLoading: false
            });
        },
        addClient: async (clientData)=>{
            set({
                isLoading: true,
                error: null
            });
            // No futuro: await api.post('/clients', clientData)
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            const newClient = {
                id: MOCK_CLIENTS.length + 1,
                ...clientData,
                createdAt: new Date().toISOString().split("T")[0],
                processCount: 0,
                role: "client"
            };
            MOCK_CLIENTS.push(newClient);
            set({
                clients: [
                    ...MOCK_CLIENTS
                ],
                isLoading: false
            });
            return {
                success: true,
                client: newClient
            };
        },
        // Buscar cliente específico
        fetchClient: async (clientId)=>{
            set({
                isLoading: true,
                error: null
            });
            // No futuro: await api.get(`/clients/${clientId}`)
            await new Promise((resolve)=>setTimeout(resolve, 600));
            const client = MOCK_CLIENTS.find((c)=>c.id === parseInt(clientId));
            set({
                selectedClient: client,
                isLoading: false
            });
            return client;
        },
        // Atualizar cliente
        updateClient: async (clientId, updateData)=>{
            set({
                isLoading: true,
                error: null
            });
            // No futuro: await api.put(`/clients/${clientId}`, updateData)
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            const index = MOCK_CLIENTS.findIndex((c)=>c.id === clientId);
            if (index !== -1) {
                MOCK_CLIENTS[index] = {
                    ...MOCK_CLIENTS[index],
                    ...updateData
                };
                set({
                    clients: [
                        ...MOCK_CLIENTS
                    ],
                    isLoading: false
                });
                return {
                    success: true,
                    client: MOCK_CLIENTS[index]
                };
            }
            set({
                isLoading: false,
                error: "Cliente não encontrado"
            });
            return {
                success: false,
                error: "Cliente não encontrado"
            };
        },
        // Buscar todos os clientes (retorna array para select)
        getAllClients: ()=>{
            return MOCK_CLIENTS;
        },
        getStats: ()=>{
            return {
                totalClients: MOCK_CLIENTS.length
            };
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/card.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-client] (ecmascript)");
;
;
;
function Card(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.jsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.jsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.jsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.jsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.jsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.jsx",
        lineNumber: 78,
        columnNumber: 11
    }, this);
}
_c5 = CardContent;
function CardFooter(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.jsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/admin/dashboard/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$auth$2d$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/auth-store.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$process$2d$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/process-store.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$client$2d$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/client-store.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const AdminDashboard = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isAuthenticated, isAdmin } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$auth$2d$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const { processes, fetchAllProcesses, getStats } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$process$2d$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProcessStore"])();
    const { getStats: getClientStats } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$client$2d$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClientStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (!isAuthenticated) {
                router.push("/login");
            } else if (!isAdmin()) {
                router.push("/dashboard");
            } else {
                fetchAllProcesses();
            }
        }
    }["AdminDashboard.useEffect"], [
        isAuthenticated,
        isAdmin
    ]);
    const processStats = getStats();
    const clientStats = getClientStats();
    // Dados para gráficos
    const statusData = [
        {
            status: "Em andamento",
            count: processes.filter((p)=>p.status === "Em andamento").length,
            fill: "#3b82f6"
        },
        {
            status: "Aguardando doc",
            count: processes.filter((p)=>p.status === "Aguardando documentação").length,
            fill: "#eab308"
        },
        {
            status: "Em recurso",
            count: processes.filter((p)=>p.status === "Em fase de recurso").length,
            fill: "#a855f7"
        },
        {
            status: "Concluído",
            count: processes.filter((p)=>p.status === "Concluído").length,
            fill: "#22c55e"
        }
    ];
    const monthlyData = [
        {
            month: "Mai",
            processos: 1
        },
        {
            month: "Jun",
            processos: 1
        },
        {
            month: "Jul",
            processos: 0
        },
        {
            month: "Ago",
            processos: 2
        },
        {
            month: "Set",
            processos: 0
        },
        {
            month: "Out",
            processos: 1
        }
    ];
    const typeData = processes.reduce((acc, process)=>{
        var _process_tags;
        const type = ((_process_tags = process.tags) === null || _process_tags === void 0 ? void 0 : _process_tags[0]) || "Outros";
        const existing = acc.find((item)=>item.name === type);
        if (existing) {
            existing.value += 1;
        } else {
            acc.push({
                name: type,
                value: 1
            });
        }
        return acc;
    }, []).slice(0, 5);
    const COLORS = [
        '#3b82f6',
        '#22c55e',
        '#eab308',
        '#a855f7',
        '#f97316'
    ];
    const statsCards = [
        {
            title: "Total de Clientes",
            value: clientStats.totalClients,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
            color: "text-blue-600",
            bgColor: "bg-blue-100 dark:bg-blue-900",
            trend: "+2 este mês",
            trendUp: true
        },
        {
            title: "Total de Processos",
            value: processStats.totalProcesses,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
            color: "text-purple-600",
            bgColor: "bg-purple-100 dark:bg-purple-900",
            trend: "+1 este mês",
            trendUp: true
        },
        {
            title: "Processos Ativos",
            value: processStats.activeProcesses,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
            color: "text-yellow-600",
            bgColor: "bg-yellow-100 dark:bg-yellow-900",
            trend: "".concat(processStats.activeProcesses, " em andamento"),
            trendUp: null
        },
        {
            title: "Processos Concluídos",
            value: processStats.completedProcesses,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
            color: "text-green-600",
            bgColor: "bg-green-100 dark:bg-green-900",
            trend: "20% de conclusão",
            trendUp: true
        }
    ];
    // Processos que precisam atenção (sem atualização há 30+ dias)
    const processesNeedAttention = processes.filter((p)=>{
        const daysSinceUpdate = Math.floor((new Date() - new Date(p.lastUpdate)) / (1000 * 60 * 60 * 24));
        return daysSinceUpdate > 30 && p.status !== "Concluído";
    });
    // Atividade recente (últimos andamentos)
    const recentActivity = processes.flatMap((p)=>{
        var _p_timeline;
        return ((_p_timeline = p.timeline) === null || _p_timeline === void 0 ? void 0 : _p_timeline.map((t)=>({
                ...t,
                processId: p.id,
                processNumber: p.processNumber,
                actionType: p.actionType
            }))) || [];
    }).sort((a, b)=>new Date(b.date) - new Date(a.date)).slice(0, 10);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col border-b pb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold",
                        children: "Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/dashboard/page.jsx",
                        lineNumber: 133,
                        columnNumber: 5
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Visão geral do sistema Consulte seu Processo"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/dashboard/page.jsx",
                        lineNumber: 134,
                        columnNumber: 5
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/dashboard/page.jsx",
                lineNumber: 132,
                columnNumber: 4
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
                children: statsCards.map((stat)=>{
                    const Icon = stat.icon;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "flex flex-row items-center justify-between space-y-0 pb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        className: "text-sm font-medium",
                                        children: stat.title
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/dashboard/page.jsx",
                                        lineNumber: 146,
                                        columnNumber: 9
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2 rounded-full ".concat(stat.bgColor),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: "h-4 w-4 ".concat(stat.color)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/dashboard/page.jsx",
                                            lineNumber: 150,
                                            columnNumber: 10
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/dashboard/page.jsx",
                                        lineNumber: 149,
                                        columnNumber: 9
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/dashboard/page.jsx",
                                lineNumber: 145,
                                columnNumber: 8
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-2xl font-bold",
                                    children: stat.value
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/dashboard/page.jsx",
                                    lineNumber: 154,
                                    columnNumber: 9
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/app/admin/dashboard/page.jsx",
                                lineNumber: 153,
                                columnNumber: 8
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, stat.title, true, {
                        fileName: "[project]/app/admin/dashboard/page.jsx",
                        lineNumber: 144,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/app/admin/dashboard/page.jsx",
                lineNumber: 140,
                columnNumber: 4
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            children: "Processos Recentes"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/dashboard/page.jsx",
                            lineNumber: 164,
                            columnNumber: 6
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/dashboard/page.jsx",
                        lineNumber: 163,
                        columnNumber: 5
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: recentProcesses.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground text-center py-4",
                                children: "Nenhum processo cadastrado"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/dashboard/page.jsx",
                                lineNumber: 169,
                                columnNumber: 8
                            }, ("TURBOPACK compile-time value", void 0)) : recentProcesses.map((process)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between border-b pb-3 last:border-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium",
                                                    children: process.title
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/dashboard/page.jsx",
                                                    lineNumber: 179,
                                                    columnNumber: 11
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-4 mt-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-muted-foreground",
                                                            children: process.processNumber
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/dashboard/page.jsx",
                                                            lineNumber: 181,
                                                            columnNumber: 12
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-muted-foreground",
                                                            children: [
                                                                "Cliente: ",
                                                                process.clientName
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/admin/dashboard/page.jsx",
                                                            lineNumber: 184,
                                                            columnNumber: 12
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/dashboard/page.jsx",
                                                    lineNumber: 180,
                                                    columnNumber: 11
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/dashboard/page.jsx",
                                            lineNumber: 178,
                                            columnNumber: 10
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs px-2 py-1 rounded-full ".concat(process.status === "Concluído" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : process.status === "Em andamento" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"),
                                            children: process.status
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/dashboard/page.jsx",
                                            lineNumber: 189,
                                            columnNumber: 10
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, process.id, true, {
                                    fileName: "[project]/app/admin/dashboard/page.jsx",
                                    lineNumber: 174,
                                    columnNumber: 9
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/app/admin/dashboard/page.jsx",
                            lineNumber: 167,
                            columnNumber: 6
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/dashboard/page.jsx",
                        lineNumber: 166,
                        columnNumber: 5
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/dashboard/page.jsx",
                lineNumber: 162,
                columnNumber: 4
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/dashboard/page.jsx",
        lineNumber: 131,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AdminDashboard, "thDTqtBicKhlNLe4R6WL6tVLmhc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$auth$2d$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$process$2d$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProcessStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$client$2d$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClientStore"]
    ];
});
_c = AdminDashboard;
const __TURBOPACK__default__export__ = AdminDashboard;
var _c;
__turbopack_context__.k.register(_c, "AdminDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>CircleCheckBig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21.801 10A10 10 0 1 1 17 3.335",
            key: "yps3ct"
        }
    ],
    [
        "path",
        {
            d: "m9 11 3 3L22 4",
            key: "1pflzl"
        }
    ]
];
const CircleCheckBig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("circle-check-big", __iconNode);
;
 //# sourceMappingURL=circle-check-big.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Clock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 6v6l4 2",
            key: "mmk7yg"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ]
];
const Clock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("clock", __iconNode);
;
 //# sourceMappingURL=clock.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Clock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_40741ad9._.js.map