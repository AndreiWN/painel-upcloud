import React from "react";
import { connect } from "react-redux";

function Table(props) {
    let tableEl = <div></div>

    const tableTemaEscuro = 'bg-slate-800 text-white border-b-slate-500 text-black'
    const theadTemaEscuro = 'border-slate-500 bg-gradient-to-tr from-slate-700 to-slate-600'
    const tbodyTemaEscuro = 'border-slate-500'

    const tableTemaClaro = 'bg-tail-200 text-black border-gray-700'
    const theadTemaClaro = 'bg-gradient-to-tr from-gray-100 to-gray-200 border-gray-700'
    const tbodyTemaClaro = 'border-gray-700'

    if (props.tipo === 'listaBackups') {
        tableEl = (
            <table className={`table table-bordered max-h-96 ${props.tema === 'claro' ? tableTemaClaro : tableTemaEscuro} text-center`}>
                <thead className={props.tema === 'claro' ? theadTemaClaro : theadTemaEscuro}>
                    <tr>
                        <th></th>
                        <th>Nome</th>
                        <th>Tamanho</th>
                        <th>Última Execução</th>
                        <th>Tempo Total</th>
                        <th>Tipo Do Backup</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className={props.tema === 'claro' ? tbodyTemaClaro : tbodyTemaEscuro}>
                    {props.children}
                </tbody>
            </table>
        )
    }

    if (props.tipo === 'histBackups') {
        tableEl = (
            <table className={`table table-bordered max-h-96 ${props.tema === 'claro' ? tableTemaClaro : tableTemaEscuro} text-center`}>
                <thead className={props.tema === 'claro' ? theadTemaClaro : theadTemaEscuro}>
                    <tr>
                        <th></th>
                        <th>Nome</th>
                        <th>Tamanho</th>
                        <th>Dia</th>
                        <th>Data De Execução</th>
                        <th>Tempo</th>
                        <th>Download</th>
                        <th>Enviar Por Email</th>
                        <th>Deletar</th>
                    </tr>
                </thead>
                <tbody className="border-slate-500 max-h-72 overflow-auto">
                    {props.children}
                </tbody>
            </table>
        )
    }

    return (
        <div>
            {tableEl}
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        tema: state.appReducer.tema
    }
}

export default connect(mapStateToProps, null)(Table)
