import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

function ModalDetalhesErros(props) {

    const tableTemaEscuro = 'bg-slate-800 text-white border-b-slate-500 text-black '
    const theadTemaEscuro = 'border-slate-500 bg-gradient-to-tr from-slate-700 to-slate-600'
    const tbodyTemaEscuro = 'border-slate-500'

    const tableTemaClaro = 'bg-tail-200 text-black border-gray-700 table-bordered'
    const theadTemaClaro = 'bg-gradient-to-tr from-gray-100 to-gray-200 border-gray-700'
    const tbodyTemaClaro = 'border-gray-700'

    const backgroudClass = (
        props.tema === 'escuro' ?
            'bg-slate-800 border-slate-700 text-white' :
            'bg-slate-300 border-gray-400'
    )



    return (
        <Modal show={props.show} onHide={props.handleShow}>
            <Modal.Header closeButton className={backgroudClass}>
                <Modal.Title>Tabela Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body className={backgroudClass}>
                <table className={`table max-h-96 ${props.tema === 'claro' ? tableTemaClaro : tableTemaEscuro} text-center`}>
                    <thead className={props.tema === 'claro' ? theadTemaClaro : theadTemaEscuro}>
                        <tr>
                            <th>Tarefa</th>
                            <th>Dias</th>
                        </tr>
                    </thead>
                    <tbody className={props.tema === 'claro' ? tbodyTemaClaro : tbodyTemaEscuro}>
                        {props.dados[props.index].nome_da_tarefa.map((item) => {
                            return (
                                <tr>
                                    <th>{item.nome}</th>
                                    <th>{item.dias}</th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer className={backgroudClass}>
                <Button variant="secondary" onClick={props.handleShow}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

const mapStateToProps = (state) => {
    return {
        tema: state.appReducer.tema
    }
}

export default connect(mapStateToProps, null)(ModalDetalhesErros)