import React, { useEffect, useState } from "react";
import FormTarefaConfig from "../FormTarefaConfig";
import { connect } from "react-redux";

function FirebirdBackupLocal(props) {

    const [objetoConfig, setObjetoConfig] = useState({
        Servidor: '',
        Porta: '',
        BaseDeDados: '',
        Usuario: '',
        ArquivoGbak: ''
    })

    function formatarString(str) {
        const arr = str.split("?");
        const obj = {
            Servidor: arr[0],
            Porta: arr[1],
            BaseDeDados: arr[2],
            Usuario: arr[3],
            Senha: arr[4],
            ArquivoGbak: arr[5]
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

    useEffect(() => {
        if (props.dadosTarefa.origem !== '') {
            setObjetoConfig(() => formatarString(props.dadosTarefa.origem))
        }
    }, [props.dadosTarefa])

    function salvaGeral(chave, valor) {

        let newArray = objetoConfig

        newArray[chave] = valor

        props.setDadosTarefa(prev => ({
            ...prev,
            origem: objectToString(newArray)
        }))
    }

    return (
        <div>
            <FormTarefaConfig label='Servidor' onChange={e => { salvaGeral('Servidor', e.target.value) }} value={objetoConfig.Servidor || ''} className='mb-2' clases='flex justify-end items-center' />
            <FormTarefaConfig label='Porta' onChange={e => { salvaGeral('Porta', e.target.value); salvaGeral() }} value={objetoConfig.Porta || ''} className='mb-2' clases='flex justify-end items-center' />
            <FormTarefaConfig label='Base De Dados' onChange={e => { salvaGeral('BaseDeDados', e.target.value); salvaGeral() }} value={objetoConfig.BaseDeDados || ''} className='mb-2' clases='flex justify-end items-center' />
            <FormTarefaConfig label='Usuário' onChange={e => { salvaGeral('Usuario', e.target.value); salvaGeral() }} value={objetoConfig.Usuario || ''} className='mb-2' clases='flex justify-end items-center' />
            <FormTarefaConfig label='Senha' onChange={e => { salvaGeral('Senha', e.target.value); salvaGeral() }} value={objetoConfig.Senha || ''} type="password" className='mb-2' clases='flex justify-end items-center' />
            <FormTarefaConfig label='Arquivo Gbak' onChange={e => { salvaGeral('ArquivoGbak', e.target.value); salvaGeral() }} value={objetoConfig.ArquivoGbak || ''} className='mb-2' clases='flex justify-end items-center' />
        </div>
    )
}

export default FirebirdBackupLocal