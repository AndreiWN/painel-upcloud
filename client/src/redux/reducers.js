const temaInicial = localStorage.getItem('tema') || 'escuro';
const initialState = {
    tema: temaInicial,
    dadosUsuario: {
        id: '',
        inscricao: '',
        nome: '',
        usuario: '',
        senha: '',
        email: '',
        estado_id: '',
        cidade_id: '',
        tipo: '',
        ultimo_acesso: '',
        versao: '',
        email_responsavel: '',
        status: '',
        telefone: '',
        contato: '',
        whatsapp: '',
        observacao: '',
        usuario_adm: '',
        dados_contratada: '',
        plano_contratado: '',
        contrato_assinado: '',
        horario_download: '',
        reinicia_upcloud: '',
    },
    dadosTarefas: [],
    historicoTarefa: [],
    logado: false,
    numeroLinhas: 10,
    pagina: 1,
    tarefaID: null,
    totalDeLinhas: null,
    carregandoTabela: false,
    carregandoConfigTarefa: false,
    showTarefasConfig: false,
    mensagemBackup: '',
    configTarefa: [""],
    nomeTarefaSelecionada: '',
    showBackupMensagem: false
};

function reducer(state = initialState, action) {
    switch (action.type) {

        case 'DESLOGAR':
            return initialState

        case 'TROCA_TEMA':
            const novoTema = state.tema === 'claro' ? 'escuro' : 'claro';
            localStorage.setItem('tema', novoTema); // Adiciona tema no localStorage
            return {
                ...state, tema: novoTema
            };

        case 'SALVA_DADOS_CLIENTE':
            return {
                ...state,
                dadosUsuario: action.payload.dadosUsuario,
                dadosTarefas: action.payload.dadosTarefas,
                logado: true
            }

        case 'CARREGANDO_HISTORICO_TAREFA':
            return {
                ...state,
                carregandoTabela: true
            }

        case 'HISTORICO_TAREFA':
            return {
                ...state,
                historicoTarefa: action.payload,
                carregandoTabela: false
            }

        case 'TROCA_PAGINA':
            return {
                ...state,
                pagina: action.payload
            }

        case 'ALTERA_NUMERO_DE_LINHAS':
            return {
                ...state,
                numeroLinhas: action.payload
            }

        case 'SLECIONA_TAREFAID':
            return {
                ...state,
                tarefaID: action.payload
            }

        case 'SELECIONA_TAREFA':
            return {
                ...state,
                tarefaID: action.payload
            }

        case 'CARREGANDO_CONFIG_TAREFAS':
            return {
                ...state,
                carregandoConfigTarefa: action.payload
            }

        case 'ALTERA_TOTAL_DE_LINHAS':
            return {
                ...state,
                totalDeLinhas: action.payload
            }

        case 'ABRE_TAREFAS_CONFIG':
            return {
                ...state,
                showTarefasConfig: action.payload
            }

        case 'FECHA_TAREFAS_CONFIG':
            return {
                ...state,
                showTarefasConfig: action.payload
            }

        case 'CARREGANDO_BACKUP_MENSAGEM':
            return {
                ...state,
                showBackupMensagem: true,
                mensagemBackup: 'carregando...'
            }

        case 'BACKUP_MENSAGEM':
            let mensagemPayload = action.payload
            let mensagemEl = []

            if (mensagemPayload.length > 0) {
                mensagemPayload.map(item => {
                    mensagemEl.push(item.mensagem)
                })
            } else {
                mensagemEl = ''
            }

            return {
                ...state,
                mensagemBackup: mensagemEl
            }

        case 'GET_CONFIGURACOES_TAREFA':
            return {
                ...state,
                configTarefa: action.payload
            }

        case 'NOME_TAREFA_SELECIONADA':
            return {
                ...state,
                nomeTarefaSelecionada: action.payload
            }

        case 'FECHA_BACKUP_MENSAGEM': {
            return {
                ...state,
                showBackupMensagem: false
            }
        }

        case 'DADOS_USUARIO_ATULIZADOS': {
            console.log('dados ', action.payload.data.dadosNovos[0])
            return {
                ...state,
                dadosUsuario: action.payload.data.dadosNovos[0]
            }
        }

        default:
            return state;
    }
}

export default reducer;
