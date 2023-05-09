import { MD5 } from 'crypto-js';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import FormModal from './FormModal';


function ModalEnvioEmail(props) {

    const backgroudClass = (
        props.tema === 'escuro' ?
            'bg-slate-800 border-slate-700 text-white' :
            'bg-slate-300 border-gray-400'
    )

    const [senhaAtual, setSenhaAtual] = useState('')
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    function salvaConfigs() {
        if (!senhaAtual || (MD5(senhaAtual).toString().toUpperCase() !== props.dadosUsuario.senha && senhaAtual !== props.dadosUsuario.senha)) {
            setErrorMessage('A senha está incorreta');
            return false; // senha atual não pode estar errada
        }

        limpaFormulario()
        props.setShow(false)
        return true;
    }

    function limpaFormulario() {
        setEmail('')
        setSenhaAtual('')
        setErrorMessage('')
    }

    return (
        <Modal show={props.show} onHide={() => { props.setShow(false); limpaFormulario() }} >
            <Modal.Header closeButton className={backgroudClass}>
                <Modal.Title>Enviar Backup Por Email</Modal.Title>
            </Modal.Header>
            <Modal.Body className={backgroudClass}>

                <FormModal label='Senha Atual' className='mb-2' value={senhaAtual} onChange={e => setSenhaAtual(e.target.value)} type='password' />
                <p className="text-red-400 mb-2">{errorMessage}</p>

                <FormModal label='E-mail' className='mb-2' value={email} onChange={e => setEmail(e.target.value)} type='email' />

            </Modal.Body>
            <Modal.Footer className={backgroudClass}>
                <Button variant="primary" onClick={() => { props.setShow(false); limpaFormulario() }} className={props.tema === 'claro' ? 'text-black' : ''}>
                    Fechar
                </Button>
                <Button variant="success" onClick={salvaConfigs} className={props.tema === 'claro' ? 'text-black' : ''}>
                    Enviar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


const mapStateToProps = (state) => {
    return {
        tema: state.appReducer.tema,
        dadosUsuario: state.appReducer.dadosUsuario
    }
}

export default connect(mapStateToProps, null)(ModalEnvioEmail)