import axios from "axios";
import apiUrl from "../const";

export function getListaDeErros() {

    return async (dispatch) => {
        try {
            const response = await axios.post(`${apiUrl}/getTabelaDeErros`)
            dispatch({ type: 'GET_LISTA_ERROS', payload: response.data.listaErros })
        } catch (error) {
            dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
        }
    }
}

export function getListaFechados() {

    return async (dispatch) => {
        try {
            const response = await axios.post(`${apiUrl}/getTabelaFechados`)
            dispatch({ type: 'GET_LISTA_FECHADOS', payload: response.data.listaFechados })
        } catch (error) {
            dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
        }
    }
}

export function getListaTodos() {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${apiUrl}/getTodosClientes`)
            dispatch({ type: 'GET_LISTA_TODOS', payload: response.data.todosClientes })
        } catch (error) {
            dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
        }
    }
}

export function loginADM(login, senha) {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${apiUrl}/LoginADM`, { login: login, senha: senha })
            dispatch({ type: 'LOGADO', payload: response.data.status })
            localStorage.setItem('TokenADM', response.data.tokenADM)
        } catch (error) {
            dispatch({ type: 'STATUS_LOGIN', payload: true })
            dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
        }
    }
}

export function tokenLoginADM(token) {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${apiUrl}/TokenADMLogin`, { token: token })
            dispatch({ type: 'LOGADO', payload: response.data.status })
        } catch (error) {
            dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
        }
    }
}

export function selecionaDetalheCliente(index) {
    return {
        type: 'SELECIONA_CLIENTE_DETALHE',
        payload: index,
    }
}

export function atulizaCadastroCliente(dados) {
    return async (dispatch) => {
        try {
            await axios.post(`${apiUrl}/atulizaCadastroCliente`, { dados: dados })
            const response = await axios.post(`${apiUrl}/getTodosClientes`)
            dispatch({ type: 'GET_LISTA_TODOS', payload: response.data.todosClientes })
        } catch (error) {
            dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
        }
    }
}

export function apagaAlertaLogin() {
    return { type: 'STATUS_LOGIN', payload: false }
}