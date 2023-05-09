import React, { useEffect, useState } from "react";
import FirebirdBackupLocal from "./FirebirdBackupLocal";
import FirebirdBackupRemoto from "./FirebirdBackupRemoto";
import ArquivoTabela from "./TableasArquivo";
import Checkbox from "./Checkbox";

function ArquivoFirebird(props) {

    const [destino, setDestino] = React.useState([
        { id: 1, nome: '', isSelected: false },
    ]);

    function formataStringDestino(str) {
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

    useEffect(() => {
        if (props.dadosTarefa.origem) {
            setDestino(formataStringDestino(props.dadosTarefa.destino))
        }
    }, [props.dadosTarefa])

    function salvaGeral(chave, valor) {
        props.setDadosTarefa(prev => ({
            origem: '',
            ...prev,
            [chave]: valor
        }))
    }

    return (
        <div className="border-slate-500 border rounded-md p-2 mt-2">

            <div className="flex mb-3">
                <Checkbox titulo="Backup de banco" mbn value={props.dadosTarefa.tipo_conexao} onChange={e => salvaGeral('tipo_conexao', parseInt(e.target.value))}>
                    <option selected value={0}>Local</option>
                    <option value={1}>Remoto</option>
                </Checkbox>
            </div>

            {props.dadosTarefa.tipo_conexao == 1 ? <FirebirdBackupRemoto dadosTarefa={props.dadosTarefa} setDadosTarefa={props.setDadosTarefa} /> : <FirebirdBackupLocal dadosTarefa={props.dadosTarefa} setDadosTarefa={props.setDadosTarefa} />}

            <hr />

            <ArquivoTabela dadosTabela={destino} tipo='destino' setDadosTabela={setDestino} setDadosTarefa={props.setDadosTarefa} titulo='DESTINO' />

        </div>
    )
}

export default ArquivoFirebird