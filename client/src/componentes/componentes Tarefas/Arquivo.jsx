import React, { useEffect, useState } from "react";
import ArquivoTabela from "./TableasArquivo";

function Arquivo(props) {
    const [origem, setOrigem] = React.useState([
        { id: 1, nome: '', isSelected: false },
    ]);

    const [destino, setDestino] = React.useState([
        { id: 1, nome: '', isSelected: false },
    ]);

    function formataString(str) {
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
            setOrigem(formataString(props.dadosTarefa.origem))
        }
        setDestino(formataString(props.dadosTarefa.destino))
    }, [props.dadosTarefa, props.dadosUsuario])



    return (
        <div className="border-slate-500 border rounded-md p-3 mt-2">
            <ArquivoTabela dadosTabela={origem} tipo='origem' setDadosTarefa={props.setDadosTarefa} setDadosTabela={setOrigem} titulo='ORIGEM' />
            <ArquivoTabela dadosTabela={destino} tipo='destino' setDadosTarefa={props.setDadosTarefa} setDadosTabela={setDestino} titulo='DESTINO' />
        </div>
    );
}

export default Arquivo