import React from "react";
import { Button, FormCheck } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import { salvaDadosCliente } from "../redux/actions";
import apiUrl from "../const";

function TableFechados(props) {
    const dispatch = useDispatch()

    const tableTemaEscuro = 'bg-slate-800 text-white border-b-slate-500 text-black'
    const theadTemaEscuro = 'border-slate-500 bg-gradient-to-tr from-slate-700 to-slate-600'
    const tbodyTemaEscuro = 'border-slate-500'

    const tableTemaClaro = 'bg-tail-200 text-black border-gray-700 table-bordered'
    const theadTemaClaro = 'bg-gradient-to-tr from-gray-100 to-gray-200 border-gray-700'
    const tbodyTemaClaro = 'border-gray-700'

    function createTable(data) {
        return (
            <table className={`table max-h-96 ${props.tema === 'claro' ? tableTemaClaro : tableTemaEscuro} text-center`}>
                <thead className={props.tema === 'claro' ? theadTemaClaro : theadTemaEscuro}>
                    <tr>
                        <th> </th>
                        <th> Cliente </th>
                        <th> Contato </th>
                        <th> Acessar </th>
                    </tr>
                </thead>
                <tbody className={props.tema === 'claro' ? tbodyTemaClaro : tbodyTemaEscuro}>
                    {data.map((item, index) => (
                        <tr key={index} className={(props.tema === 'claro' ? 'hover:bg-gray-200' : 'hover:bg-slate-700')}>
                            <td className="w-24">
                                <FormCheck className="inline mr-2 text-lg checkBorder" />
                                <FormCheck className="inline text-lg checkBorder" />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.contato}</td>
                            <td>
                                <Button variant="primary" onClick={() => {
                                    axios.post(`${apiUrl}/login`, {
                                        emailInput: item.usuario,
                                        senhaInput: "null",
                                        senhaSemCripto: item.senha
                                    }).then((response) => {
                                        localStorage.setItem('token', response.data.token)
                                        dispatch(salvaDadosCliente(response.data))
                                        window.open('painel', '_blank');
                                    }).catch((e) => {
                                        alert('erro')
                                    })
                                }} className={`${props.tema === 'claro' && 'text-black hover:bg-blue-400'}`}>Abrir Painel</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const Table = createTable(props.dados);

    return (
        <div>
            <div className="text-right">
                <h1 className="text-xl painelAdm-totais">Total de fechados: {props.dados.length}</h1>
            </div>
            {Table}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        tema: state.appReducer.tema,
    }
}

export default connect(mapStateToProps, null)(TableFechados)