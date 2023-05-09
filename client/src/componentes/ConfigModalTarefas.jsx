import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import Alerta from "./Alerta";
import TabsConfigTarefas from "./TabsConfigTarefas";
import { useDispatch } from 'react-redux';
import { atualizaTarefaConfig, ativaBackup } from "../redux/actions";
import Checkbox from "./componentes Tarefas/Checkbox";

function ConfigModalTarefas(props) {

    const [senhaAtual, setSenhaAtual] = useState(null)
    const [novaSenha, setNovaSenha] = useState()
    const [confimacaoSenha, setConfimacaoSenha] = useState()
    const [emailResponsavel, setEmailResponsavel] = useState(props.dadosUsuario.email_responsavel)
    const [email, setEmail] = useState(props.dadosUsuario.email)

    const [showAlerta, setShowAlerta] = useState(false)
    const [nomeTarefa, setNomeTarefa] = useState(null)
    const [dadosTarefa, setDadosTarefa] = useState(
        {
            agendamento_dias: '',
            agendamento_hora: '',
            agendamento_tipo: '',
            backup: 1,
            backup_ativo: '',
            compactacao_senha: '',
            compactacao_tipo: '',
            copia_diaria: '',
            copia_mensal: '',
            copia_mensal_ultima: '',
            copia_semanal: '',
            criptografa_compactacao: '',
            desliga_computador: '',
            destino: '',
            email_enviado_rest_auto: '',
            envia_email_conclusao: '',
            executa_restauracao_automatica: '',
            origem: '',
            solicita_usuario_senha: '',
            substitui_ultima_copia: '',
            tarefa_id: '',
            tipo_conexao: '',
            validacao_avancada: '',
            validacao_normal: ''
        }
    )

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.configTarefa.length > 0) {
            setDadosTarefa(props.configTarefa[0])
        }
    }, [props.nomeTarefa, props.configTarefa])


    function apagaAlerta() {
        setShowAlerta(false)
    }

    function resetaConfigurações() {
        setConfimacaoSenha(null)
        setNovaSenha(null)
        setSenhaAtual(null)
    }

    const backgroudClass = (
        props.tema === 'escuro' ?
            'bg-slate-800 border-slate-700 text-white' :
            'bg-slate-300 border-gray-400'
    )

    function salvaGeral(chave, valor) {
        setDadosTarefa(prev => ({
            ...prev,
            origem: '',
            [chave]: valor
        }))
    }

    return (
        <div>
            <Modal show={props.show} onHide={props.abreFecha} className="modal-lg">
                <Modal.Header closeButton className={`modal-header ${backgroudClass} rounded-t-2xl`}>
                    <Modal.Title>Configurações {props.nomeTarefa} </Modal.Title>
                </Modal.Header>

                <Modal.Body className={backgroudClass}>

                    {props.carregandoConfigTarefa ?
                        <div className="text-center">
                            <div className="spinner-border text-primary w-11 h-11 text-2xl" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <p>Carregando...</p>
                        </div> :
                        <div>
                            {/* <FormTarefaConfig label='Nome da tarefa' placeholder='' className='mb-2' value={nomeTarefa || props.nomeTarefa} onChange={e => salvaGeral('nomeTarefa', e.target.value)} /> */}

                            {/* <h1 className="mb-3 text-lg">{props.nomeTarefa}</h1> */}

                            <div className="flex">
                                <Checkbox titulo='Tipo de backup' mbn value={dadosTarefa.backup} onChange={e => salvaGeral('backup', parseInt(e.target.value))} >
                                    <option value={0}>Arquivo</option>
                                    <option value={1}>Firebird</option>
                                    <option value={2}>SQL Server</option>
                                </Checkbox>
                            </div>
                            <hr className="mt-3" />

                            <TabsConfigTarefas dadosTarefa={dadosTarefa} setDadosTarefa={setDadosTarefa} />
                        </div>
                    }


                </Modal.Body>
                <Modal.Footer className={`${backgroudClass} rounded-b-2xl flex justify-between`}>
                    <div>
                        <Button variant="primary" className={` ${props.tema === 'claro' && 'text-black hover:bg-blue-400 border-bg-green-400 hover:border-bg-green-400'}`} onClick={() => { dispatch(ativaBackup(dadosTarefa.tarefa_id)); props.abreFecha(); resetaConfigurações(); setShowAlerta(true) }}>
                            Rodar Backup
                        </Button>

                    </div>

                    <div>
                        <Button variant="primary" className={`mr-3 ${props.tema === 'claro' && 'text-black hover:bg-blue-400'}`} onClick={() => { props.abreFecha(); resetaConfigurações() }}>
                            Fechar
                        </Button>
                        <Button variant="success" className={`${props.tema === 'claro' && 'text-black hover:bg-green-400 border-bg-green-400 hover:border-bg-green-400'}`} onClick={() => { dispatch(atualizaTarefaConfig(dadosTarefa)); props.abreFecha(); resetaConfigurações(); setShowAlerta(true) }}>
                            Salvar
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <Alerta texto='Salvo com sucesso' status='suceso' show={showAlerta} apagaAlerta={apagaAlerta} />
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        tema: state.appReducer.tema,
        dadosUsuario: state.appReducer.dadosUsuario,
        nomeTarefa: state.appReducer.nomeTarefaSelecionada,
        configTarefa: state.appReducer.configTarefa,
        carregandoConfigTarefa: state.appReducer.carregandoConfigTarefa
    }
}

export default connect(mapStateToProps, null)(ConfigModalTarefas)

