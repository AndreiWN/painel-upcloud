import React, { useEffect, useState } from "react";
import { Button, FormCheck } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import { salvaDadosCliente } from "../redux/actions";
import { getListaTodos, selecionaDetalheCliente } from "./actions";
import apiUrl from "../const";

function TableListaTodos(props) {
    const dispatch = useDispatch()

    const tableTemaEscuro = 'bg-slate-800 text-white border-b-slate-500 text-black'
    const theadTemaEscuro = 'border-slate-500 bg-gradient-to-tr from-slate-700 to-slate-600'
    const tbodyTemaEscuro = 'border-slate-500'

    const tableTemaClaro = 'bg-tail-200 text-black border-gray-700 table-bordered'
    const theadTemaClaro = 'bg-gradient-to-tr from-gray-100 to-gray-200 border-gray-700'
    const tbodyTemaClaro = 'border-gray-700'


    function formatarData(dataString) {
        const data = new Date(dataString);
        const ano = data.getFullYear();
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const dia = data.getDate().toString().padStart(2, '0');
        return `${dia}/${mes}/${ano}`;
    }

    function validaPlano(idPlano) {
        const tabelaPlanos = [
            { id: "1", descricao: 'Sem Data Center', },
            { id: "2", descricao: '5GB', },
            { id: "3", descricao: '10GB', },
            { id: "4", descricao: '25GB', },
            { id: "5", descricao: '50GB', },
            { id: "6", descricao: '10GB', },
            { id: "7", descricao: '25GB', },
            { id: "8", descricao: '50GB', },
            { id: "9", descricao: '100GB', },
            { id: "10", descricao: 'Pacote de Teste 500MB', },
            { id: "11", descricao: 'Pacote Teste 5MB', },
            { id: "12", descricao: '250GB', },
            { id: "13", descricao: '500GB', },
            { id: "14", descricao: '1TB', },
            { id: "15", descricao: '3TB', },
            { id: "16", descricao: '5TB', },
            { id: "99", descricao: 'Flexível', }
        ];

        const plano = tabelaPlanos.find(p => p.id === idPlano);
        if (plano) {
            return `${plano.descricao}`;
        } else {
            return 'Plano não encontrado.';
        }
    }

    const [tableBody, setTableBody] = useState([])

    useEffect(() => {
        setTableBody(
            props.listaTodos.map((item, index) => (
                <tr key={index} className={(props.tema === 'claro' ? 'hover:bg-gray-200' : 'hover:bg-slate-700')}>
                    <td>{item.nome}</td>
                    <td>{validaPlano(item.plano)}</td>
                    <td>{item.contato}</td>
                    <td>{formatarData(item.data)}</td>
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
                        <Button variant="warning" onClick={() => { dispatch(selecionaDetalheCliente(index)); props.setModal(true) }} className={`ml-3  ${props.tema === 'claro' ? 'text-black hover:bg-yellow-300' : 'text-white'}`}>Detalhes</Button>
                    </td>
                </tr>
            ))
        )
    }, [props.listaTodos, props.tema])

    return (
        <div>
            <table className={`table max-h-96 ${props.tema === 'claro' ? tableTemaClaro : tableTemaEscuro} text-center`}>
                <thead className={props.tema === 'claro' ? theadTemaClaro : theadTemaEscuro}>
                    <tr>
                        <th> Cliente </th>
                        <th> Plano </th>
                        <th> Contato </th>
                        <th> Cadastro </th>
                        <th> Acesso </th>
                    </tr>
                </thead>
                <tbody className={props.tema === 'claro' ? tbodyTemaClaro : tbodyTemaEscuro}>
                    {tableBody}
                </tbody>
            </table >
            <div>
                <h1 className="text-xl mb-3 text-center">Total de clientes: {props.listaTodos.length}</h1>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        tema: state.appReducer.tema,
        listaTodos: state.admReducers.listaTodos
    }
}

export default connect(mapStateToProps, null)(TableListaTodos)