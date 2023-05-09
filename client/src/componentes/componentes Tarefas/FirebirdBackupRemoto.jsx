import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import FormTarefaConfig from "../FormTarefaConfig";

function FirebirdBackupRemoto(props) {

    const [objetoConfig, setObjetoConfig] = useState({
        Servidor: '',
        Porta: '',
        BaseDeDados: '',
        Usuario: '',
        ArquivoGbak: '',
        ServidorR: '',
        PortaR: '',
        BaseDeDadosR: '',
        UsuarioR: '',
        SenhaR: '',
    })

    function formatarString(str) {
        const arr = str.split("?");
        const obj = {
            Servidor: arr[0],
            Porta: arr[1],
            BaseDeDados: arr[1],
            Usuario: arr[3],
            Senha: arr[4],
            ArquivoGbak: arr[5],
            ServidorR: arr[6],
            PortaR: arr[7],
            BaseDeDadosR: arr[8],
            UsuarioR: arr[9],
            SenhaR: arr[10],
        };
        return obj;
    }

    function objectToString(obj) {
        let result = '';

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                result += obj[key] + '?';
            }
        }

        return result;
    }

    function salvaGeral(chave, valor) {

        let newArray = objetoConfig

        newArray[chave] = valor

        props.setDadosTarefa(prev => ({
            ...prev,
            origem: objectToString(newArray)
        }))
    }

    function salvaGeralBancoDados(chave, valor) {
        let newArray = objetoConfig

        newArray['BaseDeDados'] = valor
        newArray['BaseDeDadosR'] = valor

        props.setDadosTarefa(prev => ({
            ...prev,
            origem: objectToString(newArray)
        }))
    }

    useEffect(() => {
        setObjetoConfig(() => formatarString(props.dadosTarefa.origem))
    }, [props.dadosTarefa])

    return (
        <div>
            <Tabs defaultActiveKey="firebirdLocal" className="nav-pills mt-4 mb-3">
                <Tab eventKey="firebirdLocal" title="Firebird Local">
                    <hr className="mb-3" />
                    <FormTarefaConfig label='Servidor' onChange={e => salvaGeral('Servidor', e.target.value)} value={objetoConfig.Servidor} placeholder='' className='mb-2' clases='flex justify-end items-center' />
                    <FormTarefaConfig label='Porta' onChange={e => salvaGeral('Porta', e.target.value)} placeholder='' value={objetoConfig.Porta} className='mb-2' clases='flex justify-end items-center' />
                    <FormTarefaConfig label='Usuário' onChange={e => salvaGeral('Usuario', e.target.value)} placeholder='' value={objetoConfig.Usuario} className='mb-2' clases='flex justify-end items-center' />
                    <FormTarefaConfig label='Senha' type="password" onChange={e => salvaGeral('Senha', e.target.value)} placeholder='' value={objetoConfig.Senha} className='mb-2' clases='flex justify-end items-center' />
                    <FormTarefaConfig label='Arquivo Gbak' onChange={e => salvaGeral('ArquivoGbak', e.target.value)} placeholder='' value={objetoConfig.ArquivoGbak} className='mb-2' clases='flex justify-end items-center' />
                </Tab>
                <Tab eventKey="firebirdRemoto" title="Firebird Remoto">
                    <hr className="mb-3" />
                    <FormTarefaConfig label='Servidor' value={objetoConfig.ServidorR} onChange={e => salvaGeral('ServidorR', e.target.value)} placeholder='' className='mb-2' clases='flex justify-end items-center' />
                    <FormTarefaConfig label='Porta' onChange={e => salvaGeral('PortaR', e.target.value)} placeholder='' value={objetoConfig.PortaR} className='mb-2' clases='flex justify-end items-center' />
                    <FormTarefaConfig label='Base De Dados' onChange={e => salvaGeralBancoDados('BaseDeDadosR', e.target.value)} placeholder='' value={objetoConfig.BaseDeDadosR} className='mb-2' clases='flex justify-end items-center' />
                    <FormTarefaConfig label='Usuário' onChange={e => salvaGeral('UsuarioR', e.target.value)} placeholder='' value={objetoConfig.UsuarioR} className='mb-2' clases='flex justify-end items-center' />
                    <FormTarefaConfig label='Senha' type="password" onChange={e => salvaGeral('SenhaR', e.target.value)} placeholder='' value={objetoConfig.SenhaR} className='mb-2' clases='flex justify-end items-center' />
                </Tab>
            </Tabs>
        </div>
    )
}

export default FirebirdBackupRemoto