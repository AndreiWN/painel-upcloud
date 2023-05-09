import React, { useEffect, useState } from "react";
import FormTarefaConfig from "../FormTarefaConfig";
import ArquivoTabela from "./TableasArquivo";

function SQLBackup(props) {

    const [objetoConfig, setObjetoConfig] = useState({
        Servidor: '',
        Porta: '',
        BaseDeDados: '',
        Usuario: '',
        Senha: '',
        SQLCMD: '',
    })

    const [destino, setDestino] = React.useState([
        { id: 1, nome: '', isSelected: false },
    ]);

    function formatarString(str) {
        if (str && typeof str === 'string') {
            const arr = str.split("?");
            const obj = {
                Servidor: arr[0],
                Porta: arr[1],
                BaseDeDados: arr[2],
                Usuario: arr[3],
                Senha: arr[4],
                SQLCMD: arr[5],
            };
            return obj;
        }
        return {
            Servidor: '',
            Porta: '',
            BaseDeDados: '',
            Usuario: '',
            Senha: '',
            SQLCMD: '',
        };
    }

    function formataStringDestino(str) {
        if (str && typeof str === 'string') {
            const items = str.split('?');
            return items.reduce((acc, item, index) => {
                if (item.length > 0) {
                    acc.push({
                        id: acc.length + 1,
                        nome: item,
                        isSelected: false
                    });
                }
                return acc;
            }, []);
        }
    }

    useEffect(() => {
        setObjetoConfig(() => formatarString(props.dadosTarefa.origem))
        if (props.dadosTarefa.origem) {
            setDestino(formataStringDestino(props.dadosTarefa.destino))
        }
    }, [props.dadosTarefa, props.dadosUsuario])

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

    return (
        <div>
            <div className="border-slate-500 border rounded-md p-2 mt-2">
                <FormTarefaConfig label='Servidor' onChange={(e) => salvaGeral('Servidor', e.target.value)} value={objetoConfig.Servidor} className='mb-2' clases='flex justify-end items-center' />
                <FormTarefaConfig label='Porta' onChange={(e) => salvaGeral('Porta', e.target.value)} value={objetoConfig.Porta} className='mb-2' clases='flex justify-end items-center' />
                <FormTarefaConfig label='Base De Dados' onChange={(e) => salvaGeral('BaseDeDados', e.target.value)} value={objetoConfig.BaseDeDados} className='mb-2' clases='flex justify-end items-center' />
                <FormTarefaConfig label='Usuário' onChange={(e) => salvaGeral('Usuario', e.target.value)} value={objetoConfig.Usuario} className='mb-2' clases='flex justify-end items-center' />
                <FormTarefaConfig label='Senha' onChange={(e) => salvaGeral('Senha', e.target.value)} value={objetoConfig.Senha} type="password" className='mb-2' clases='flex justify-end items-center' />
                <FormTarefaConfig label='SQLCMD' onChange={(e) => salvaGeral('SQLCMD', e.target.value)} value={objetoConfig.SQLCMD} className='mb-2' clases='flex justify-end items-center' />

                <hr />

                <ArquivoTabela dadosTabela={destino} tipo='destino' setDadosTarefa={props.setDadosTarefa} setDadosTabela={setDestino} titulo='DESTINO' />
            </div>
        </div>
    )
}

export default SQLBackup