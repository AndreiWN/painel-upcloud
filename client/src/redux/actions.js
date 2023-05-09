import axios from "axios";
import { MD5 } from 'crypto-js';
import apiUrl from "../const";

// Action para selecionar uma tarefa e carregar seu histórico
export function selecionaTarefa(tarefaID, numeroLinhas) {
    return async (dispatch) => {
        try {
            // Define a página como 1 ao selecionar uma nova tarefa
            dispatch({ type: "TROCA_PAGINA", payload: 1 });
            dispatch({ type: "CARREGANDO_HISTORICO_TAREFA" });
            dispatch({ type: "SLECIONA_TAREFAID", payload: tarefaID });
            const response = await axios.post(
                `${apiUrl}/getTarefaHistorico`,
                { tarefaID, numeroLinhas, pagina: 0 }
            );
            dispatch({
                type: "HISTORICO_TAREFA",
                payload: response.data.historicoTarefa,
            });
            dispatch({
                type: "ALTERA_TOTAL_DE_LINHAS",
                payload: response.data.totalDeLinhas[0]["COUNT(*)"],
            });
        } catch (error) {
            dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
        }
    };
}

// Action para trocar o tema
export function trocaTema(tema) {
    return {
        type: "TROCA_TEMA",
        payload: tema,
    };
}

// Action para abrir a tela de configurações
export function abreConfig() {
    return {
        type: "ABRE_CONFIG",
        payload: true,
    };
}

// Action para fechar a tela de configurações
export function fechaConfig() {
    return {
        type: "FECHA_CONFIG",
        payload: false,
    };
}

// Action para abrir a tela de configurações de tarefas
export function abreTarefasConfig(tarefaID, nomeTarefa) {
    return async (dispatch) => {
        try {
            dispatch({ type: "CARREGANDO_CONFIG_TAREFAS", payload: true });
            dispatch({ type: "NOME_TAREFA_SELECIONADA", payload: nomeTarefa });
            dispatch({ type: "ABRE_TAREFAS_CONFIG", payload: true });
            const response = await axios.post(
                `${apiUrl}/getConfiguracaoTarefa`,
                { tarefaID }
            );
            dispatch({
                type: "GET_CONFIGURACOES_TAREFA",
                payload: response.data.configTarefa,
            });
            dispatch({ type: "CARREGANDO_CONFIG_TAREFAS", payload: false });
        } catch (error) {
            console.log(error);
            dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
        }
    };
}

// Action para fechar a tela de configurações de tarefas
export function fechaTarefasConfig() {
    return {
        type: "FECHA_TAREFAS_CONFIG",
        payload: false,
    };
}

// Action para salvar os dados do cliente
export function salvaDadosCliente(dados) {
    return {
        type: "SALVA_DADOS_CLIENTE",
        payload: dados,
    };
}

// Action para carregar o histórico de uma tarefa específica
export function getHistoricoTarefa(id) {
    return async (dispatch) => {
        try {
            dispatch({ type: "CARREGANDO_HISTORICO_TAREFA_ESPECIFICA" });
            const response = await axios.post(
                `${apiUrl}/getTarefaHistoricoEspecifico`,
                { id }
            );
            dispatch({
                type: "HISTORICO_TAREFA",
                payload: response.data.historicoTarefa,
            });
            dispatch({
                type: "ALTERA_TOTAL_DE_LINHAS",
                payload: response.data.totalDeLinhas[0]["COUNT(*)"],
            });
        } catch (error) {
            dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
        }
    };
}

// Action para alterar o número de linhas por página
export function alteraNumeroDeLinhas(numeroLinhas, tarefaID) {
    if (tarefaID) {
        return async (dispatch) => {
            try {
                dispatch({ type: "CARREGANDO_HISTORICO_TAREFA" });
                const response = await axios.post(
                    `${apiUrl}/getTarefaHistorico`,
                    { tarefaID, numeroLinhas: parseInt(numeroLinhas), pagina: 0 }
                );
                dispatch({
                    type: "HISTORICO_TAREFA",
                    payload: response.data.historicoTarefa,
                });
                dispatch({
                    type: "ALTERA_NUMERO_DE_LINHAS",
                    payload: numeroLinhas,
                });
                dispatch({ type: "TROCA_PAGINA", payload: 1 });
            } catch (error) {
                dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
            }
        };
    } else {
        return { type: "ALTERA_NUMERO_DE_LINHAS", payload: numeroLinhas };
    }
}

// Action para trocar a página do histórico de uma tarefa
export function trocaPagina(tarefaID, numeroLinhas, pagina) {
    const paginaNumero = pagina === 1 ? 0 : (pagina - 1) * numeroLinhas;

    if (tarefaID) {
        return async (dispatch) => {
            try {
                dispatch({ type: "TROCA_PAGINA", payload: pagina });
                dispatch({ type: "CARREGANDO_HISTORICO_TAREFA" });
                const resposta = await axios.post(`${apiUrl}/getTarefaHistorico`, {
                    tarefaID,
                    numeroLinhas: parseInt(numeroLinhas),
                    pagina: paginaNumero,
                });
                dispatch({
                    type: "HISTORICO_TAREFA",
                    payload: resposta.data.historicoTarefa,
                });
            } catch (error) {
                dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
            }
        };
    } else {
        return { type: "ALTERA_NUMERO_DE_LINHAS", payload: numeroLinhas };
    }
}

// Action para obter o backup de uma mensagem específica
export function getBackupMensagem(historicoID) {
    return async (dispatch) => {
        try {
            dispatch({ type: "CARREGANDO_BACKUP_MENSAGEM" });
            const response = await axios.post(
                `${apiUrl}/getTarefaHistoricoEspecifico`,
                { historicoID }
            );
            dispatch({ type: "BACKUP_MENSAGEM", payload: response.data.resultado });
        } catch (error) {
            dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
        }
    };
}

// Action para obter as configurações de uma tarefa
export function getTarefaConfigs(tarefaID) {
    return async (dispatch) => {
        try {
            dispatch({ type: "CARREGANDO_CONFIG_TAREFAS" });
            const response = await axios.post(
                `${apiUrl}/getTarefaHistoricoEspecifico`,
                { tarefaID }
            );
            dispatch({
                type: "GET_CONFIGURACOES_TAREFA",
                payload: response.data.configTarefa,
            });
        } catch (error) {
            dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
        }
    };
}

// Action para fechar a tela de backup de mensagem
export function FechaMensagemBackup() {
    return {
        type: "FECHA_BACKUP_MENSAGEM",
    };
}

// Action para realizar o logout
export function deslogar() {
    localStorage.removeItem("token");
    return {
        type: "DESLOGAR",
    };
}

// Action para atualizar as configurações de uma tarefa
export function atualizaTarefaConfig(configuracoes) {
    return async (dispatch) => {
        try {
            dispatch({ type: "ATULIZANDO_TAREFA_CONFIG" });
            await axios.post(
                `${apiUrl}/atualizarConfiguracoesTarefa`,
                configuracoes
            );
            dispatch({ type: "ATULIZANDO_TAREFA_CONFIG" });
        } catch (error) {
            dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
        }
    };
}

// Action para ativar o backup de uma tarefa específica
export function ativaBackup(id) {
    return async (dispatch) => {
        try {
            await axios.post(`${apiUrl}/ativaBackup`, { id });
        } catch (error) {
            dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
        }
    };
}

// Salva apenas quando ouver mudança na configuração dos emails
export function salvaEmailConfiguracao(objeto) {
    return async (dispatch) => {
        try {
            await axios.post(`${apiUrl}/atualizaConfigsEmail`, { dados: objeto });
        }
        catch (error) {
            dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
        }
    }
}

// Atuliza os dados do usuário quando os dados forem modificados
export function atulizaDadosUsuario(id) {
    return async (dispatch) => {
        try {
            dispatch({ type: "ATULIZANDO_DADOS_USUARIOS", payload: true })
            const response = await axios.post(`${apiUrl}/atualizaDadosUsuario`, { id: id });
            dispatch({ type: "ATULIZANDO_DADOS_USUARIOS", payload: false })
            dispatch({ type: "DADOS_USUARIO_ATULIZADOS", payload: response })
        }
        catch (error) {
            dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
        }
    }
}

// Atuliza a senha e as configurações de email
export function atulizaSenhaUsuario(dadosUsuario, senha) {
    const senhaCriptografada = MD5(senha).toString().toUpperCase();
    console.log(senhaCriptografada)
    return async (dispatch) => {
        try {
            await axios.post(`${apiUrl}/atualizaSenha`, { dadosUsuario: dadosUsuario, senhaNova: senhaCriptografada });
        } catch (erro) {
            dispatch({ type: "FETCH_DATA_FAILURE", payload: erro.message });
        }
    }
}