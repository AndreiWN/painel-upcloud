import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import Agendamento from "./componentes Tarefas/Agendamento";
import Arquivo from "./componentes Tarefas/Arquivo";
import ArquivoFirebird from "./componentes Tarefas/ArquivoFirebird";
import Configuracoes from "./componentes Tarefas/Configuracoes";
import SQLBackup from "./componentes Tarefas/SQLBackup";
import Substituicao from "./componentes Tarefas/Substituicao";


function TabsConfigTarefas(props) {

    const { dadosTarefa } = props

    return (
        <Tabs defaultActiveKey="arquivo" className="nav-pills mt-4">
            <Tab eventKey="arquivo" title="Arquivo">
                {
                    props.dadosTarefa.backup === 0 ?
                        <Arquivo tema={props.tema} setDadosTarefa={props.setDadosTarefa} dadosTarefa={props.dadosTarefa} /> :
                        props.dadosTarefa.backup === 1 ?
                            <ArquivoFirebird dadosTarefa={props.dadosTarefa} setDadosTarefa={props.setDadosTarefa} tema={props.tema} /> :
                            <SQLBackup dadosTarefa={props.dadosTarefa} setDadosTarefa={props.setDadosTarefa} tema={props.tema} />
                }
            </Tab>
            <Tab eventKey="configurações" title="Configurações">
                <Configuracoes tema={props.tema} dadosTarefa={props.dadosTarefa} setDadosTarefa={props.setDadosTarefa} dadosUsuario={props.dadosUsuario} />
            </Tab>
            <Tab eventKey="agendamento" title="Agendamento">
                <div className="border-slate-500 border rounded-md p-2 mt-2">
                    <Agendamento dadosTarefa={props.dadosTarefa} setDadosTarefa={props.setDadosTarefa} dadosUsuario={props.dadosUsuario} />
                </div>
            </Tab>
            <Tab eventKey="substituição" title="Substituição">
                <div className="border-slate-500 border rounded-md p-2 mt-2">
                    <Substituicao dadosTarefa={props.dadosTarefa} setDadosTarefa={props.setDadosTarefa} dadosUsuario={props.dadosUsuario} />
                </div>
            </Tab>
        </Tabs>
    );
}

const mapStateToProps = (state) => {
    return {
        tema: state.appReducer.tema,
        dadosUsuario: state.appReducer.dadosUsuario
    }
}

export default connect(mapStateToProps, null)(TabsConfigTarefas)