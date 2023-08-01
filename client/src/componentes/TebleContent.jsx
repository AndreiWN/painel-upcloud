import React, { useState } from "react";
import { getBackupMensagem, selecionaTarefa } from "../redux/actions";
import { connect } from 'react-redux';
import { OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import { abreTarefasConfig } from "../redux/actions";
import { obterDiaDaSemana } from "./utilitarios/obterDia";

function TableContent(props) {
    const { index } = props
    const numeroLinhas = props.numeroLinhas

    const iconeCorreto = <i className="bi bi-check-circle" style={{ color: props.tema === 'claro' ? 'green' : 'lime', fontSize: '1.2rem' }}></i>
    const iconeErro = <i className="bi bi-x-circle " style={{ color: props.tema === 'claro' ? 'red' : '#ff7777', fontSize: '1.2rem' }}></i>
    const iconeDownload = <i class="bi bi-file-arrow-down ml-1 text-green-500"></i>
    const iconeEmail = <i class="bi bi-envelope-check ml-1"></i>
    const iconeLixeira = <i class="bi bi-trash3 ml-1 text-red-500"></i>
    const iconeEngranagem = <i class="bi bi-pencil-square" style={{ color: props.tema === 'claro' ? 'black' : 'white', fontSize: '1.2rem' }}></i>
    const iconeDesativado = <i class="bi bi-slash-circle" style={{ color: props.tema === 'claro' ? 'black' : 'white', fontSize: '1.2rem' }}></i>
    const iconeAlerta = <i class="bi bi-exclamation-circle" style={{ fontSize: '1.2rem', color: props.tema === 'claro' ? '#ff9700' : 'yellow' }} ></i>
    const iconeRelogio = <i class="bi bi-stopwatch" style={{ color: props.tema === 'claro' ? 'black' : 'white', fontSize: '1.2rem' }}></i>


    const trClases = props.tema === 'claro' ? 'hover:bg-gray-200' : 'hover:bg-slate-700'

    function formatFileSize(size) {
        const units = ['KB', 'MB', 'GB', 'TB'];
        let unitIndex = 0;
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        return `${size.toFixed(2)} ${units[unitIndex]}`;
    }

    function formatarDataComHora(data) {
        const dataFormatada = new Date(data);
        const dia = dataFormatada.getDate().toString().padStart(2, '0');
        const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataFormatada.getFullYear().toString();
        const hora = dataFormatada.getHours().toString().padStart(2, '0');
        const minuto = dataFormatada.getMinutes().toString().padStart(2, '0');
        const segundo = dataFormatada.getSeconds().toString().padStart(2, '0');
        return `${dia}/${mes}/${ano}`;
    }

    function formatSeconds(seconds) {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds - (hours * 3600)) / 60);
        let remainingSeconds = seconds - (hours * 3600) - (minutes * 60);

        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        } else if (minutes > 0) {
            return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        } else {
            return `00:${remainingSeconds.toString().padStart(2, '0')}`;
        }
    }

    function formataTipo(numero) {
        if (numero === 0) {
            return 'Arquivo'
        } else if (numero === 1) {
            return 'Firebird'
        } else if (numero === 2) {
            return 'SQL Server'
        }
    }


    function getTabelasTarefas(data) {

        function selecionaTarefa(ativar) {
            if (ativar) {
                props.selecionaTarefa(data.id, parseInt(numeroLinhas))
            } else {
                return
            }
        }

        return (
            <tr key={index}
                className={`${trClases} hover:cursor-pointer ${props.tarefaID === data.id ? props.tema === 'claro' ? 'bg-gray-200' : 'bg-slate-700' : ''}`
                }
                onClick={props.tarefaID !== data.id ? (() => selecionaTarefa(true)) : (() => selecionaTarefa(false))}>
                <td >
                    {data.backup_ativo === 1 ? iconeDesativado : data.em_execucao === 'SIM' ? iconeRelogio : data.status === 'C' ? iconeCorreto : data.status === 'A' ? iconeAlerta : iconeErro}
                </td>
                <td>{data.nome}</td>
                <td>{formatFileSize(data.tamanho)}</td>
                <td>{`${formatarDataComHora(data.execucao)} - ${obterDiaDaSemana(formatarDataComHora(data.execucao))}`}</td>
                <td>{formatSeconds(data.tempo_total)}</td>
                <td>{formataTipo(data.tipo_backup)}</td>
                <td><span onClick={() => props.abreTarefasConfig(data.id, data.nome)}>{iconeEngranagem}</span></td>
            </tr>
        )
    }

    function getHistorico(data) {

        return (
            <tr key={index} className={`${trClases}`
            }
            >
                <td className="cursor-pointer" onClick={() => props.getBackupMensagem(data.id)}>
                    {data.status === 'C' ? iconeCorreto : data.status === 'A' ? iconeAlerta : iconeErro}
                </td>

                <td className="cursor-pointer" onClick={() => props.getBackupMensagem(data.id)}>{data.nome}</td>
                <td className="cursor-pointer" onClick={() => props.getBackupMensagem(data.id)}>{formatFileSize(data.tamanho)}</td>
                <td className="cursor-pointer" onClick={() => props.getBackupMensagem(data.id)}>{`${formatarDataComHora(data.data_execucao)} - ${obterDiaDaSemana(formatarDataComHora(data.data_execucao))}`}</td>
                <td className="cursor-pointer" onClick={() => props.getBackupMensagem(data.id)}>{data.hora_execucao}</td>
                <td className="cursor-pointer" onClick={() => props.getBackupMensagem(data.id)}>{formatSeconds(data.tempo_total)}</td>
                <td>{
                    data.tamanho > 0 ?
                        <span className="hover:underline cursor-pointer"> Baixar {iconeDownload} </span> :
                        <span> Sem </span>
                }</td>
                <td> {
                    data.tamanho > 0 ?
                        <span className="hover:underline cursor-pointer" onClick={() => props.modalEmail(true)}> Enviar {iconeEmail} </span> :
                        <span>Sem</span>
                } </td>
                <td> {
                    data.tamanho > 0 ?
                        <span className="hover:underline cursor-pointer" onClick={''} > Apagar {iconeLixeira} </span> :
                        <span>Sem</span>
                } </td>
            </tr >
        )
    }

    return (
        props.tipo === 'tarefas' ? getTabelasTarefas(props.dados) : props.tipo === 'historico' ? getHistorico(props.dados) : false
    )
}

const mapStateToProps = (state) => {
    return {
        tarefaID: state.appReducer.tarefaID,
        dadosTarefas: state.appReducer.dadosTarefas,
        tema: state.appReducer.tema,
        numeroLinhas: state.appReducer.numeroLinhas,
        pagina: state.appReducer.pagina,
        mensagemBackup: state.appReducer.mensagemBackup
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selecionaTarefa: (tarefaNome, numeroLinhas) => dispatch(selecionaTarefa(tarefaNome, numeroLinhas)),
        abreTarefasConfig: (id, nome) => dispatch(abreTarefasConfig(id, nome)),
        getBackupMensagem: (id) => dispatch(getBackupMensagem(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TableContent)