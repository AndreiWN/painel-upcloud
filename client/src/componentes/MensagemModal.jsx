import React from "react";
import { Modal, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
import { FechaMensagemBackup } from "../redux/actions";

function MensagemModal(props) {

    const dispatch = useDispatch();

    function converterTexto(textoOriginal) {
        const textoConvertido = decodeURIComponent(textoOriginal)
            .replace(/Ã§Ã£o/g, 'ção')
            .replace(/Ã£/g, 'ã')
            .replace(/Ã¡/g, 'á')
            .replace(/Ã©/g, 'é')
            .replace(/Ã­/g, 'í')
            .replace(/Ã³/g, 'ó')
            .replace(/Ã´/g, 'ô')
            .replace(/Ãº/g, 'ú')
            .replace(/Ã¼/g, 'ü')
            .replace(/Ã§/g, 'ç')
            .replace(/Ãµ/g, 'õ');

        return textoConvertido;
    }


    const backgroudClass = (
        props.tema === 'escuro' ?
            'bg-slate-800 border-slate-700 text-white' :
            'bg-gray-300 border-gray-400'
    )

    function transformaStringToList(string) {
        if (!string) {
            return <p>Nenhuma mensagem</p>
        } else {
            const items = typeof string === 'string' ? string.split('@') : [];
            const listItems = items.map((item, index) => (
                <li className="mb-3" key={index}>{converterTexto(item)}</li>
            ));
            return <ul>{listItems}</ul>;
        }

    }

    return (
        <Modal show={props.showBackupMensagem} className='modal-lg' onHide={() => dispatch(FechaMensagemBackup())}>
            <Modal.Header closeButton className={backgroudClass}>
                <Modal.Title>Mensagem</Modal.Title>
            </Modal.Header>
            <Modal.Body className={backgroudClass}>
                <p>{props.mensagemBackup === 'carregando...' ?
                    <div className="flex justify-center">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div> :
                    transformaStringToList(props.mensagemBackup[0])
                }</p>
            </Modal.Body>
            <Modal.Footer className={backgroudClass}>
                <Button variant="primary" className={props.tema === 'claro' ? 'text-black' : ''} onClick={() => dispatch(FechaMensagemBackup())}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        showBackupMensagem: state.appReducer.showBackupMensagem,
        tema: state.appReducer.tema,
        mensagemBackup: state.appReducer.mensagemBackup
    }
}

export default connect(mapStateToProps, null)(MensagemModal)