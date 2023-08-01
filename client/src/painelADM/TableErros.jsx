import React, { useEffect, useState } from "react";
import { Button, FormCheck } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import ModalDetalhesErros from "./ModalDetalhesErros";
import axios from "axios";
import { salvaDadosCliente } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import apiUrl from "../const";

function TableErros(props) {
    const dispatch = useDispatch()

    const tableTemaEscuro = 'bg-slate-800 text-white border-b-slate-500 text-black '
    const theadTemaEscuro = 'border-slate-500 bg-gradient-to-tr from-slate-700 to-slate-600'
    const tbodyTemaEscuro = 'border-slate-500'

    const tableTemaClaro = 'bg-tail-200 text-black border-gray-700 table-bordered'
    const theadTemaClaro = 'bg-gradient-to-tr from-gray-100 to-gray-200 border-gray-700'
    const tbodyTemaClaro = 'border-gray-700'

    const [dadosOrganizados, setDadosOrganizados] = useState([{
        contato: "",
        dias_sem_executar: 1,
        nome: "",
        nome_da_tarefa: [
            { nome: '', dias: 1 },
        ],
        senha: "",
        usuario: ""

    }])
    const [indexCliente, setIndexCliente] = useState(0)
    const [showErrosModal, setShowErrosModal] = useState(false)

    function handleShow() {
        setShowErrosModal(!showErrosModal)
    }

    function organizarDados(dados) {
        const novoArray = [];

        dados.forEach((item) => {
            const index = novoArray.findIndex((el) => el.nome === item.nome);

            if (index === -1) {
                novoArray.push({ nome: item.nome, dias_sem_executar: item.dias_sem_executar, contato: item.contato, usuario: item.usuario, senha: item.senha, nome_da_tarefa: [{ nome: item.nome_da_tarefa, dias: item.dias_sem_executar }] });
            } else {
                novoArray[index].nome_da_tarefa.push({ nome: item.nome_da_tarefa, dias: item.dias_sem_executar });
            }
        });

        return novoArray;
    }

    useEffect(() => {
        setDadosOrganizados(organizarDados(props.dados))
        console.log(dadosOrganizados)
    }, [props.dados])

    function createTable(data) {

        return (
            <table className={`table max-h-96 ${props.tema === 'claro' ? tableTemaClaro : tableTemaEscuro} text-center`}>
                <thead className={props.tema === 'claro' ? theadTemaClaro : theadTemaEscuro}>
                    <tr>
                        <th> </th>
                        <th> Cliente </th>
                        <th> Dias </th>
                        <th> Contato </th>
                        <th> Acessar </th>
                    </tr>
                </thead>
                <tbody className={props.tema === 'claro' ? tbodyTemaClaro : tbodyTemaEscuro}>
                    {data.map((item, index) => (
                        <tr key={index} className={(props.tema === 'claro' ? 'hover:bg-gray-200' : 'hover:bg-slate-700')}>
                            <td className="w-24">
                                <FormCheck className="inline mr-3 text-lg checkBorder" />
                                <FormCheck className="inline text-lg checkBorder" />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.dias_sem_executar}</td>
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
                                }} className={`${props.tema === 'claro' && 'text-black hover:bg-blue-400'} mr-2`}>Abrir Painel</Button>
                                <Button variant="warning" className={`${props.tema === 'claro' ? 'text-black hover:bg-yellow-400' : 'text-white'}`} onClick={e => { setIndexCliente(index); setShowErrosModal(true) }}>
                                    Detalhe Erros
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const Table = createTable(dadosOrganizados);

    return (
        <div>
            <ModalDetalhesErros show={showErrosModal} handleShow={handleShow} dados={dadosOrganizados} index={indexCliente} />
            <div className="text-right">
                <h1 className="text-xl painelAdm-totais">Total de clientes com erros: {dadosOrganizados.length}</h1>
            </div>
            {Table}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        tema: state.appReducer.tema,
    }
}

export default connect(mapStateToProps, null)(TableErros)