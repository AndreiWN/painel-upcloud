import React from "react";
import FormTarefaConfig from "../FormTarefaConfig";
import Checkbox from "./Checkbox";

function Configuracoes(props) {

    function salvaGeral(chave, valor) {
        props.setDadosTarefa(prev => ({
            ...prev,
            [chave]: valor
        }))
    }

    return (
        <div className="border-slate-500 border rounded-md p-2 mt-2">

            <Checkbox titulo='BackUp Ativo' width='w-2/12' value={props.dadosTarefa.backup_ativo} onChange={e => salvaGeral('backup_ativo', parseInt(e.target.value))}>
                <option value={0}>Sim</option>
                <option value={1}>Não</option>
            </Checkbox>

            {props.dadosTarefa.backup !== 0 ?
                <Checkbox titulo='Validação Avançada' width='w-2/12' value={props.dadosTarefa.validacao_avancada} onChange={e => salvaGeral('validacao_avancada', parseInt(e.target.value))} >
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                </Checkbox> : ''
            }

            <Checkbox titulo='Tipo de Compactação' width='w-4/12' value={props.dadosTarefa.compactacao_tipo} onChange={e => salvaGeral('compactacao_tipo', parseInt(e.target.value))} >
                <option value={0}>Sem Compactação</option>
                <option value={1}>Compactação Zip</option>
                <option value={2}>Compactação 7zip</option>
            </Checkbox>

            <FormTarefaConfig label='Senha Compactação' width='w-7/12' />
            <FormTarefaConfig label='Confirma Senha' width='w-7/12' />

            {props.dadosTarefa.compactacao_tipo !== 0 ?
                <Checkbox titulo='Criptografar Compactação' width='w-2/12' value={props.dadosTarefa.criptografa_compactacao} onChange={e => salvaGeral('criptografa_compactacao', parseInt(e.target.value))} >
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                </Checkbox> : ''}

            <Checkbox titulo='Desligar Computador ao Concluir Tarefa' width='w-2/12' value={props.dadosTarefa.desliga_computador} onChange={e => salvaGeral('desliga_computador', parseInt(e.target.value))} >
                <option value={1}>Sim</option>
                <option value={0}>Não</option>
            </Checkbox>

            <Checkbox titulo='Solicitar Senha Para Alterar Tarefa' width='w-2/12' value={props.dadosTarefa.solicita_usuario_senha} onChange={e => salvaGeral('solicita_usuario_senha', parseInt(e.target.value))} >
                <option value={1}>Sim</option>
                <option value={0}>Não</option>
            </Checkbox>

            <Checkbox titulo='Enviar Email ao Concluir Tarefa' width='w-2/12' value={props.dadosTarefa.envia_email_conclusao} onChange={e => salvaGeral('envia_email_conclusao', parseInt(e.target.value))} >
                <option value={1}>Sim</option>
                <option value={0}>Não</option>
            </Checkbox>

        </div>
    )
}

export default Configuracoes