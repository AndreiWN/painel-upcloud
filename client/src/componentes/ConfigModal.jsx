import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Alerta from "./Alerta";
import FormModal from "./FormModal";
import { connect, useDispatch } from "react-redux";
import { atulizaDadosUsuario, atulizaSenhaUsuario, salvaEmailConfiguracao } from "../redux/actions";
import { MD5 } from 'crypto-js';

function ConfigModal(props) {

    const [senhaAtual, setSenhaAtual] = useState(null)
    const [novaSenha, setNovaSenha] = useState(null)
    const [confimacaoSenha, setConfimacaoSenha] = useState(null)
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch()

    const [dadosUsuarios, setDadosUsuarios] = useState(props.dadosUsuario)

    const [showAlerta, setShowAlerta] = useState(false)

    function salvaConfigs() {

        if (!senhaAtual || senhaAtual === '') {
            if (dadosUsuarios.email && dadosUsuarios.email_responsavel) {
                dispatch(salvaEmailConfiguracao(dadosUsuarios))
                dispatch(atulizaDadosUsuario(dadosUsuarios.id))
                setShowAlerta(true)
                props.abreFecha()
            }
            return
        }

        if ((MD5(senhaAtual).toString().toUpperCase() !== dadosUsuarios.senha && senhaAtual !== dadosUsuarios.senha)) {
            console.log('senhaAtual')

            setErrorMessage('A senha está incorreta');
            return false; // senha atual não pode estar errada
        }

        // Verificar se a senha atual corresponde à senha do usuário antes de permitir a alteração

        if (novaSenha !== confimacaoSenha) {
            setErrorMessage('As senhas devem ser iguais');
            return false; // senhas diferentes
        }

        if (!novaSenha || novaSenha.length < 8) {
            setErrorMessage('As senhas devem ter pelo menos 8 caracteres');
            return false; // senha não atende aos requisitos mínimos de segurança
        }

        setErrorMessage('')
        setShowAlerta(true)
        limpaSenha()

        props.abreFecha()
        dispatch(atulizaSenhaUsuario(dadosUsuarios, novaSenha))
        dispatch(atulizaDadosUsuario(dadosUsuarios.id))
        limpaSenha()
        return true; // senhas iguais e com mais de 8 caracteres, atendendo aos requisitos de segurança
    }


    function apagaAlerta() {
        setShowAlerta(false)
    }

    function limpaSenha() {
        setSenhaAtual(null)
        setNovaSenha(null)
        setConfimacaoSenha(null)
        setErrorMessage('')
    }

    const backgroudClass = (
        props.tema === 'escuro' ?
            'bg-slate-800 border-slate-700 text-white' :
            'bg-gray-300 border-gray-400'
    )

    function salvaGeral(chave, valor) {
        setDadosUsuarios(prev => ({
            ...prev,
            [chave]: valor
        }))
    }

    useEffect(() => {
        setDadosUsuarios(props.dadosUsuario)
    }, [props.show])

    return (
        <div>
            <Modal show={props.show} onHide={() => { props.abreFecha(); limpaSenha() }} className="modal-lg ">
                <Modal.Header closeButton className={`modal-header ${backgroudClass} rounded-t-2xl`}>
                    <Modal.Title>Configurações</Modal.Title>
                </Modal.Header>

                <Modal.Body className={backgroudClass}>

                    <FormModal label='Senha Atual' type="password" placeholder='' value={senhaAtual} onChange={e => { setSenhaAtual(e.target.value); setErrorMessage('') }} className='mb-2' />
                    <FormModal label='Nova Senha' type="password" placeholder='' value={novaSenha} onChange={e => { setNovaSenha(e.target.value); setErrorMessage('') }} className='mb-2' />
                    <FormModal label='Confirme a senha' type="password" placeholder='' value={confimacaoSenha} onChange={e => { setConfimacaoSenha(e.target.value); setErrorMessage('') }} />
                    <p className="text-red-400">{errorMessage}</p>

                    <hr className="mt-4 mb-3 m-auto" />

                    <FormModal label='Email Empresa Responsável' onChange={e => salvaGeral('email_responsavel', e.target.value)} placeholder='' className='' value={dadosUsuarios.email_responsavel} />
                    <FormModal label='Email ' placeholder='' className='mt-2' value={dadosUsuarios.email} />
                    <p className={`${props.tema === 'escuro' ? 'text-slate-400' : 'text-slate-600'} mt-3 text-center`}>OBS: mais de um email separe por , ou ;</p>
                </Modal.Body>
                <Modal.Footer className={`${backgroudClass} rounded-b-2xl`}>
                    <Button variant="primary" className={`${props.tema === 'claro' && 'text-black hover:bg-blue-400'}`} onClick={() => { props.abreFecha(); limpaSenha() }}>
                        Fechar
                    </Button>
                    <Button variant="success" className={`${props.tema === 'claro' && 'text-black hover:bg-green-400 border-bg-green-400 hover:border-bg-green-400'}`} onClick={() => { salvaConfigs() }}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Alerta texto='Salvo com sucesso' status='suceso' show={showAlerta} apagaAlerta={apagaAlerta} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tema: state.appReducer.tema,
        dadosUsuario: state.appReducer.dadosUsuario
    }
}

export default connect(mapStateToProps, null)(ConfigModal)
