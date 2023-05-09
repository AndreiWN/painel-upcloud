import React, { useEffect, useState } from "react";
import Table from "./Table";
import { connect } from 'react-redux';
import { selecionaTarefa } from "../redux/actions";
import TableContent from "./TebleContent";
import { Spinner } from "react-bootstrap";
import { alteraNumeroDeLinhas } from "../redux/actions";
import { trocaPagina } from "../redux/actions";
import MensagemModal from "./MensagemModal";
import ModalEnvioEmail from "./ModalEnvioEmail";

function Tables(props) {

    const [paginacaoEl, setPaginacaoEl] = useState([])
    const paginasMostradas = 3;
    const maxPaginas = Math.ceil(props.totalDeLinhas / props.numeroLinhas)
    const numPaginas = Math.ceil(props.totalDeLinhas / props.numeroLinhas);
    const ultimaPagina = Math.min(numPaginas, props.pagina + paginasMostradas);
    const [showEmailModal, setShowEmailModal] = useState(false)

    const listaDeBackup = props.dadosTarefas ? props.dadosTarefas.map((item, index) => {
        return (
            <TableContent dados={item} index={index} tipo='tarefas' />
        )
    }) : ''

    function getHistBackup(dados) {
        let elemento = (
            <tr>
                <td colspan="9">
                    <p className="mt-2">Selecione uma Tarefa</p>
                </td>
            </tr>
        )


        if (dados.length > 0) {
            elemento = dados.map((item) => {
                return <TableContent dados={item} index={item.id} tipo='historico' modalEmail={setShowEmailModal} />
            })
        }

        return elemento
    }


    function renderizarPaginas(paginaAtualO = props.pagina) {
        let paginas = []
        const primeiraPagina = Math.max(1, paginaAtualO - paginasMostradas);

        let paginasRestantes = maxPaginas - 2 * paginasMostradas;
        if (paginasRestantes > 0 && numPaginas > maxPaginas) {
            const inicio = Math.max(1, primeiraPagina - Math.ceil(paginasRestantes / 2));
            const fim = Math.min(numPaginas, ultimaPagina + Math.ceil(paginasRestantes / 2));
            for (let i = inicio; i <= fim; i++) {
                paginas.push(
                    <li key={i} className={i === paginaAtualO ? 'active' : 'page-item'}>
                        <a className={i === paginaAtualO ? 'page-link active' : 'page-link bg-slate-900 text-white border-slate-500 hover:bg-slate-900 hover:border-slate-400 cursor-pointer'} onClick={() => props.trocaPagina(props.tarefaID, parseInt(props.numeroLinhas), i)}>{i}</a>
                    </li>
                );
            }
        } else {
            for (let i = primeiraPagina; i <= ultimaPagina; i++) {
                paginas.push(
                    <li key={i} className={i === paginaAtualO ? 'page-item active' : 'page-item'}>
                        <a className={i === paginaAtualO ? 'page-link active' : (props.tema === 'escuro' ? 'page-link bg-slate-900 text-white border-slate-500 hover:bg-slate-900 hover:border-slate-400 cursor-pointer' : 'page-link text-black cursor-pointer')}
                            onClick={() => {
                                props.trocaPagina(props.tarefaID, parseInt(props.numeroLinhas), i)
                            }}>{i}</a>
                    </li>
                );
            }
        }
        setPaginacaoEl(paginas)
    };


    const histBackup = getHistBackup(props.historicoTarefa)


    useEffect(() => {
        renderizarPaginas(props.pagina)
    }, [props.pagina, props.historicoTarefa, props.numeroLinhas, props.tema, props.tarefaSelecionada])

    return (
        <div className='container'>
            <h1 className="text-xl mt-4 mb-2">Tarefas </h1>
            <Table tipo='listaBackups'>
                {listaDeBackup}
            </Table>

            <h1 className="text-xl mt-4 mb-2">Histórico Do Backup </h1>

            <MensagemModal />
            <ModalEnvioEmail show={showEmailModal} setShow={setShowEmailModal} tema={props.tema} />


            <div>
                {
                    props.carregandoTabela ? (
                        <Table tipo='histBackups'>
                            <tr>
                                <td colspan="9" >
                                    <Spinner animation="border" role="status" className="mt-2">
                                        <span className="visually-hidden">Carregando...</span>
                                    </Spinner>
                                    <p className="mb-2">Carregando...</p>
                                </td>
                            </tr>
                        </Table>
                    ) : (
                        <Table tipo='histBackups'> {histBackup} </Table>
                    )
                }
            </div>


            <div className="d-flex justify-content-between mb-5">
                <div className="d-flex w-2/4  ">

                    <span className="mt-2">Linhas por página: </span>
                    <select className={
                        props.tema === 'escuro' ?
                            "form-select form-select-g text-light bg-slate-900 text-base w-20 ml-3 border-slate-500" :
                            "form-select form-select-g text-dark text-base w-20 ml-3"

                    } aria-label="Default select example"
                        onChange={(e) => props.selecionaNumeroDeLinhas(parseInt(e.target.value), props.tarefaID, props.pagina)}>
                        <option selected value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={1000}>1000</option>
                    </select>
                </div>
                <div>
                    <nav aria-label="Page navigation">

                        <ul class="pagination pagination-dark">
                            {numPaginas > 0 ?
                                <li className="page-item"
                                    onClick={() => {
                                        props.trocaPagina(props.tarefaID, parseInt(props.numeroLinhas), 1)
                                    }}
                                >
                                    <a className={
                                        props.tema === "escuro" ?
                                            "page-link bg-slate-900 text-white border-slate-500 hover:bg-slate-900 hover:border-slate-400 cursor-pointer" :
                                            "page-link cursor-pointer text-black"}>Primeira</a>
                                </li> : ''}

                            {paginacaoEl}

                            {numPaginas > 0 ?
                                <li className="page-item"
                                    onClick={() => {
                                        props.trocaPagina(props.tarefaID, parseInt(props.numeroLinhas), maxPaginas)
                                    }}
                                >
                                    <a className={
                                        props.tema === "escuro" ?
                                            "page-link bg-slate-900 text-white border-slate-500 hover:bg-slate-900 hover:border-slate-400 cursor-pointer" :
                                            "page-link cursor-pointer text-black"}>Última</a>
                                </li>
                                : ''}


                        </ul>

                    </nav>
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tarefaSelecionada: state.appReducer.tarefaSelecionada,
        dadosTarefas: state.appReducer.dadosTarefas,
        historicoTarefa: state.appReducer.historicoTarefa,
        numeroLinhas: state.appReducer.numeroLinhas,
        tarefaID: state.appReducer.tarefaID,
        totalDeLinhas: state.appReducer.totalDeLinhas,
        tema: state.appReducer.tema,
        carregandoTabela: state.appReducer.carregandoTabela,
        pagina: state.appReducer.pagina
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selecionaTarefa: () => dispatch(selecionaTarefa()),
        selecionaNumeroDeLinhas: (numeroLinhas, tarefaID, pagina) => dispatch(alteraNumeroDeLinhas(numeroLinhas, tarefaID, pagina)),
        trocaPagina: (numeroLinhas, tarefaID, pagina) => dispatch(trocaPagina(numeroLinhas, tarefaID, pagina)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables);