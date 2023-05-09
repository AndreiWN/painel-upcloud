import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import Card from "../template/Card";
import { getListaDeErros, getListaFechados, getListaTodos } from "./actions";
import LoginADM from "./LoginADM";
import TableErros from "./TableErros";
import TableFechados from "./TableFechados";
import TableListaTodos from "./TableListaTodos";
import { trocaTema } from "../redux/actions";
import ModalDetalhes from "./ModalDetalhes";

function PainelADM(props) {

    const porcentagemBackup = 35
    const dispatch = useDispatch()
    const [showDetalheModal, setShowDetalheModal] = useState(false)

    useEffect(() => {
        dispatch(getListaDeErros())
        dispatch(getListaFechados())
        dispatch(getListaTodos())

        document.title = 'Administrador'

    }, [])

    const appBackgroundClass = props.tema === 'claro' ? 'bg-white min-h-screen app-div text-black' : 'bg-slate-900 min-h-screen app-div text-white'

    return (
        <>

            {props.ADMLogado ?

                <div className={appBackgroundClass}>
                    <div className="container">
                        <div className="row pt-3">
                            <div className="col flex justify-center">
                                <div>
                                    <h1 className="text-4xl mb-2">Painel De Controle ADM</h1>
                                    <h2 className="text-2xl">396.5GB De 880.9GB</h2>
                                    <h1 className="text-2xl"> Tema <span onClick={() => dispatch(trocaTema())} className='cursor-pointer'> <i class={`bi bi-${props.tema === 'claro' ? 'moon-stars' : 'sun-fill'}`}></i></span> </h1>
                                </div>
                            </div>
                            <div className="col flex justify-center">
                                <Card percentage={porcentagemBackup} text={'Espaço Total Utilizado Em Nuvem'} />
                            </div>
                        </div>

                        <div className="row text-center">
                            <h1 className="text-3xl mt-5 ">Lista De Clientes</h1>
                        </div>

                        <div className="row">
                            <Tabs className="nav-pills mt-4 ml-4 mb-3 text-2xl w-10/12">
                                <Tab eventKey="erros" title="Erros">
                                    <TableErros dados={props.listaErros} />
                                </Tab>

                                <Tab eventKey="fechados" title="Fechados">
                                    <TableFechados dados={props.listaFechados} />
                                </Tab>

                                <Tab eventKey="todos" title="Todos">
                                    <TableListaTodos setModal={setShowDetalheModal} showModal={showDetalheModal} dados={props.listaTodos} />
                                </Tab>

                            </Tabs>
                        </div>
                        <ModalDetalhes show={showDetalheModal} setShow={setShowDetalheModal} />
                    </div>
                </div> :

                <LoginADM />
            }

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        listaErros: state.admReducers.listaErros,
        listaFechados: state.admReducers.listaFechados,
        listaTodos: state.admReducers.listaTodos,
        ADMLogado: state.admReducers.ADMLogado,
        tema: state.appReducer.tema,
    }
}

export default connect(mapStateToProps, null)(PainelADM)