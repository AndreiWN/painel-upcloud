const initialState = {
    listaErros: [],
    listaFechados: [],
    listaTodos: [],
    ADMLogado: false,
    clienteDetalhe: 0,
    loginErro: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_LISTA_ERROS':
            return {
                ...state,
                listaErros: action.payload
            }
        case 'GET_LISTA_FECHADOS':
            return {
                ...state,
                listaFechados: action.payload
            }

        case 'GET_LISTA_TODOS':
            return {
                ...state,
                listaTodos: action.payload
            }
        case 'LOGADO':
            return {
                ...state,
                ADMLogado: action.payload
            }
        case 'SELECIONA_CLIENTE_DETALHE':
            return {
                ...state,
                clienteDetalhe: action.payload
            }
        case 'STATUS_LOGIN':
            return {
                ...state,
                loginErro: action.payload
            }

        default:
            return state;
    }
}

export default reducer
