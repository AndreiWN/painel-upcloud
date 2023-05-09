import React from "react";
import { Form } from "react-bootstrap";
import Checkbox from "./Checkbox";

function Substituicao(props) {

    function salvaGeral(chave, valor) {
        props.setDadosTarefa(prev => ({
            ...prev,
            [chave]: valor
        }))
    }

    function alteraNumeroObj(value) {
        props.setDadosTarefa(prev => (
            { ...prev, copia_mensal_ultima: value }
        ))
    }

    const validacao = props.dadosTarefa.copia_diaria === 1 && props.dadosTarefa.substitui_ultima_copia === 0

    return (
        <div>
            <Checkbox titulo='Substituir Última Cópia' width='w-24' value={props.dadosTarefa.substitui_ultima_copia} onChange={e => salvaGeral('substitui_ultima_copia', parseInt(e.target.value))} >
                <option value={1}>Sim</option>
                <option value={0}>Não</option>
            </Checkbox>

            {props.dadosTarefa.substitui_ultima_copia === 0 ?
                <Checkbox titulo='Cópia Diária' width='w-24' value={props.dadosTarefa.copia_diaria} onChange={e => salvaGeral('copia_diaria', parseInt(e.target.value))} >
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                </Checkbox>
                : ''
            }

            {validacao ?
                <Checkbox titulo='Cópia Semanal' width='w-48' value={props.dadosTarefa.copia_semanal} onChange={e => salvaGeral('copia_semanal', e.target.value)} >
                    <option>Nenhum</option>
                    <option>Domingo</option>
                    <option>Segunda-feira</option>
                    <option>Terça-feira</option>
                    <option>Quarta-feira</option>
                    <option>Quinta-feira</option>
                    <option>Sexta-feira</option>
                    <option>Sábado</option>
                </Checkbox> : ''
            }

            {props.dadosTarefa.copia_semanal !== 'Nenhum' && props.dadosTarefa.substitui_ultima_copia !== 1 && validacao ?
                <Checkbox titulo='Cópia Mensal' width='w-48' value={props.dadosTarefa.copia_mensal} onChange={e => salvaGeral('copia_mensal', parseInt(e.target.value))} >
                    <option value={0}>Nenhum</option>
                    <option value={1}>Semana 1</option>
                    <option value={2}>Semana 2</option>
                    <option value={3}>Semana 3</option>
                    <option value={4}>Semana 4</option>
                </Checkbox> : ''
            }

            {props.dadosTarefa.copia_semanal !== 'Nenhum' && props.dadosTarefa.copia_mensal === 4 && props.dadosTarefa.substitui_ultima_copia !== 1 && validacao ?
                <Form.Check type="checkbox" checked={props.dadosTarefa.copia_mensal_ultima === 1} label='Caso haja mais de 4, manter sempre a última'
                    onClick={() => alteraNumeroObj(props.dadosTarefa.copia_mensal_ultima === 1 ? 0 : 1)} /> : ''
            }


        </div>
    )
}

export default Substituicao