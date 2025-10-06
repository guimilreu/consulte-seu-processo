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
        title: "Ação de Indenização por Danos Morais",
        description: "Ação de indenização referente a acidente de trânsito",
        status: "Em andamento",
        lastUpdate: "2024-10-01",
        createdAt: "2023-03-15",
        timeline: [
            {
                id: 1,
                date: "2023-03-15",
                title: "Processo Distribuído",
                text: "Processo foi distribuído para a 1ª Vara Cível da Comarca de Ourinhos. Aguardando análise da petição inicial pelo juízo.",
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2023-03-15T10:30:00"
            },
            {
                id: 2,
                date: "2023-04-02",
                title: "Petição Inicial Recebida",
                text: "A petição inicial foi recebida e deferida pelo juízo. Determinada a citação da parte ré para apresentar contestação no prazo legal de 15 dias.",
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
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2023-05-10T09:15:00"
            },
            {
                id: 4,
                date: "2023-06-20",
                title: "Audiência de Conciliação Designada",
                text: "Foi designada audiência de conciliação para o dia 15/08/2023 às 14h00. Importante sua presença para tentativa de acordo.",
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
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2023-08-15T15:30:00"
            },
            {
                id: 6,
                date: "2024-10-01",
                title: "Perícia Técnica Deferida",
                text: "O juízo deferiu a realização de perícia técnica para avaliação dos danos. O perito nomeado entrará em contato para agendar a vistoria.",
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
        title: "Revisão de Contrato - Incorporação Imobiliária",
        description: "Ação revisional de cláusulas contratuais abusivas",
        status: "Em andamento",
        lastUpdate: "2024-09-28",
        createdAt: "2024-02-10",
        timeline: [
            {
                id: 1,
                date: "2024-02-10",
                title: "Processo Distribuído",
                text: "Processo distribuído para a 3ª Vara Cível da Comarca de Ourinhos. Petição inicial protocolada com pedido de tutela de urgência.",
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2024-02-10T09:00:00"
            },
            {
                id: 2,
                date: "2024-03-05",
                title: "Tutela de Urgência Deferida",
                text: "Deferida a tutela de urgência para suspensão das cobranças até decisão final do processo. A construtora foi notificada da decisão.",
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
        title: "Inventário e Partilha de Bens",
        description: "Inventário extrajudicial de bens do falecido",
        status: "Aguardando documentação",
        lastUpdate: "2024-09-15",
        createdAt: "2024-08-01",
        timeline: [
            {
                id: 1,
                date: "2024-08-01",
                title: "Processo Iniciado",
                text: "Processo de inventário iniciado no cartório. Aguardando documentação completa de todos os herdeiros.",
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2024-08-01T14:00:00"
            },
            {
                id: 2,
                date: "2024-09-15",
                title: "Documentação Pendente",
                text: "Identificamos que ainda faltam os seguintes documentos: certidão de casamento atualizada e documentos pessoais de um dos herdeiros. Por favor, providencie o quanto antes.",
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
        title: "Ação Trabalhista - Horas Extras",
        description: "Reclamação trabalhista para pagamento de horas extras",
        status: "Em fase de recurso",
        lastUpdate: "2024-09-20",
        createdAt: "2023-06-20",
        timeline: [
            {
                id: 1,
                date: "2023-06-20",
                title: "Reclamação Trabalhista Distribuída",
                text: "Reclamação trabalhista distribuída na 2ª Vara do Trabalho de Ourinhos. Pedido principal: pagamento de horas extras e adicional noturno.",
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2023-06-20T11:00:00"
            },
            {
                id: 2,
                date: "2023-07-15",
                title: "Audiência Inicial Realizada",
                text: "Realizada audiência inicial. A empresa apresentou defesa contestando os valores. Processo segue para instrução.",
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2023-07-15T10:30:00"
            },
            {
                id: 3,
                date: "2024-03-10",
                title: "Sentença Publicada - Procedência Parcial",
                text: "Sentença publicada com procedência parcial dos pedidos. Deferido o pagamento de 70% das horas extras pleiteadas. A empresa foi condenada ao pagamento.",
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
        title: "Divórcio Consensual",
        description: "Processo de divórcio consensual com partilha de bens",
        status: "Concluído",
        lastUpdate: "2024-08-30",
        createdAt: "2024-05-10",
        timeline: [
            {
                id: 1,
                date: "2024-05-10",
                title: "Petição Inicial Protocolada",
                text: "Petição inicial de divórcio consensual protocolada. Todas as questões já foram acordadas entre as partes.",
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2024-05-10T10:00:00"
            },
            {
                id: 2,
                date: "2024-06-20",
                title: "Audiência de Ratificação Realizada",
                text: "Realizada audiência onde ambas as partes ratificaram os termos do acordo. Partilha de bens homologada.",
                attachments: [],
                createdBy: "Fabio Candido Pereira",
                createdAt: "2024-06-20T15:00:00"
            },
            {
                id: 3,
                date: "2024-08-30",
                title: "Sentença de Divórcio Proferida",
                text: "Sentença de divórcio proferida e homologada. O processo foi concluído. As certidões já podem ser solicitadas no cartório.",
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
            const results = MOCK_PROCESSES.filter((p)=>p.processNumber.toLowerCase().includes(lowerTerm) || p.title.toLowerCase().includes(lowerTerm) || p.description.toLowerCase().includes(lowerTerm) || p.clientName.toLowerCase().includes(lowerTerm));
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
        // Export PDF
        exportToPdf: async (processId)=>{
            set({
                isLoading: true
            });
            // No futuro: await api.post(`/processes/${processId}/export-pdf`)
            await new Promise((resolve)=>setTimeout(resolve, 1500));
            const process = MOCK_PROCESSES.find((p)=>p.id === processId);
            if (process) {
                console.log("Gerando PDF para:", process.processNumber);
                alert("PDF do processo ".concat(process.processNumber, " seria gerado aqui."));
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
                    date: new Date().toISOString().split("T")[0],
                    createdAt: new Date().toISOString(),
                    attachments: []
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
"[project]/app/dashboard/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
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
const Dashboard = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$auth$2d$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const { processes, fetchMyProcesses, fetchProcess, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$process$2d$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProcessStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            if (!isAuthenticated) {
                router.push("/login");
            } else if (user) {
                fetchMyProcesses(user.id);
            }
        }
    }["Dashboard.useEffect"], [
        isAuthenticated,
        user
    ]);
    const handleProcessClick = async (processId)=>{
        await fetchProcess(processId);
        router.push("/dashboard/processo/".concat(processId));
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-96",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted-foreground",
                    children: "Carregando..."
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/page.jsx",
                    lineNumber: 33,
                    columnNumber: 6
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.jsx",
                lineNumber: 32,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/dashboard/page.jsx",
            lineNumber: 31,
            columnNumber: 4
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col border-b pb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold",
                        children: "Meus Processos"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.jsx",
                        lineNumber: 42,
                        columnNumber: 5
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: [
                            "Olá, ",
                            user === null || user === void 0 ? void 0 : user.name,
                            "! Aqui estão todos os seus processos"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.jsx",
                        lineNumber: 43,
                        columnNumber: 5
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.jsx",
                lineNumber: 41,
                columnNumber: 4
            }, ("TURBOPACK compile-time value", void 0)),
            processes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "flex flex-col items-center justify-center py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                            className: "h-12 w-12 text-muted-foreground mb-4"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.jsx",
                            lineNumber: 51,
                            columnNumber: 7
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground",
                            children: "Nenhum processo encontrado"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.jsx",
                            lineNumber: 52,
                            columnNumber: 7
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/page.jsx",
                    lineNumber: 50,
                    columnNumber: 6
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.jsx",
                lineNumber: 49,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4",
                children: processes.map((process)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "hover:shadow-md transition-shadow cursor-pointer",
                        onClick: ()=>handleProcessClick(process.id),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                className: "text-lg mb-2",
                                                children: process.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 62,
                                                columnNumber: 11
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                className: "mb-3",
                                                children: process.description
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 63,
                                                columnNumber: 11
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-4 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 text-muted-foreground",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.jsx",
                                                                lineNumber: 66,
                                                                columnNumber: 13
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: process.processNumber
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.jsx",
                                                                lineNumber: 67,
                                                                columnNumber: 13
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.jsx",
                                                        lineNumber: 65,
                                                        columnNumber: 12
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 text-muted-foreground",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.jsx",
                                                                lineNumber: 70,
                                                                columnNumber: 13
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "Última atualização: ",
                                                                    new Date(process.lastUpdate).toLocaleDateString("pt-BR")
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/page.jsx",
                                                                lineNumber: 71,
                                                                columnNumber: 13
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.jsx",
                                                        lineNumber: 69,
                                                        columnNumber: 12
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 64,
                                                columnNumber: 11
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 61,
                                        columnNumber: 10
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-end gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs px-2 py-1 rounded-full ".concat(process.status === "Concluído" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : process.status === "Em andamento" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"),
                                                children: process.status
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 76,
                                                columnNumber: 11
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "h-5 w-5 text-muted-foreground"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.jsx",
                                                lineNumber: 85,
                                                columnNumber: 11
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.jsx",
                                        lineNumber: 75,
                                        columnNumber: 10
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.jsx",
                                lineNumber: 60,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.jsx",
                            lineNumber: 59,
                            columnNumber: 8
                        }, ("TURBOPACK compile-time value", void 0))
                    }, process.id, false, {
                        fileName: "[project]/app/dashboard/page.jsx",
                        lineNumber: 58,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.jsx",
                lineNumber: 56,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/page.jsx",
        lineNumber: 40,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Dashboard, "0SgjXyXEWDP2WfsyM0sVE5L3fqQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$auth$2d$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$process$2d$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProcessStore"]
    ];
});
_c = Dashboard;
const __TURBOPACK__default__export__ = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    ()=>Calendar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M8 2v4",
            key: "1cmpym"
        }
    ],
    [
        "path",
        {
            d: "M16 2v4",
            key: "4m81vk"
        }
    ],
    [
        "rect",
        {
            width: "18",
            height: "18",
            x: "3",
            y: "4",
            rx: "2",
            key: "1hopcy"
        }
    ],
    [
        "path",
        {
            d: "M3 10h18",
            key: "8toen8"
        }
    ]
];
const Calendar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("calendar", __iconNode);
;
 //# sourceMappingURL=calendar.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Calendar",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_62164b00._.js.map