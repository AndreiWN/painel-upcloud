import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import FormModal from "../componentes/FormModal";
import Checkbox from "../componentes/componentes Tarefas/Checkbox";
import { atulizaCadastroCliente, getListaTodos } from "./actions";

export function ModalDetalhes(props) {

    const backgroudClass = (
        props.tema === 'escuro' ?
            'bg-slate-800 border-slate-700 text-white' :
            'bg-slate-300 border-gray-400'
    )

    const dispatch = useDispatch()

    const [clienteDetalhe, setClienteDetalhe] = useState({
        cidade_id: "",
        contato: "",
        contrato_assinado: "",
        dados_contratada: "",
        data: "",
        email: "",
        email_responsavel: "",
        estado_id: "",
        horario_download: "",
        id: "",
        inscricao: "",
        nome: "",
        observacao: "",
        plano: "",
        plano_contratado: "",
        reinicia_upcloud: "",
        senha: "",
        status: "",
        telefone: "",
        tipo: "",
        ultimo_acesso: "",
        usuario: "",
        usuario_adm: "",
        versao: "",
        whatsapp: "",
    })

    function salvaGeral(chave, valor) {
        setClienteDetalhe(prev => ({
            ...prev,
            [chave]: valor
        }))
    }

    useEffect(() => {
        if (props.clientesLista.length > 0) {
            setClienteDetalhe(props.clientesLista[props.clienteIndex])
        }
    }, [props.clienteIndex, props.clientesLista, props.show])

    return (
        <>
            <Modal show={props.show} onHide={() => props.setShow(false)} className="modal-lg" >
                <Modal.Header closeButton className={backgroudClass}>
                    <Modal.Title>Cadastro De Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body className={backgroudClass}>

                    <FormModal className="mb-2" label="Código" value={clienteDetalhe.id} />
                    <FormModal className="mb-2" type="number" label="Inscrição" value={clienteDetalhe.inscricao} onChange={e => salvaGeral('inscricao', e.target.value)} />
                    <FormModal className="mb-2" label="Razão Social" value={clienteDetalhe.nome} onChange={e => salvaGeral('nome', e.target.value)} />
                    <FormModal className="mb-2" label="Usuário" value={clienteDetalhe.usuario} onChange={e => salvaGeral('usuario', e.target.value)} />
                    <FormModal className="mb-2" label="Senha criptografada" value={clienteDetalhe.senha} onChange={e => salvaGeral('senha', e.target.value)} />
                    <FormModal className="mb-2" label="E-mail" value={clienteDetalhe.email} onChange={e => salvaGeral('email', e.target.value)} />

                    <FormModal className="mb-4" label="E-mail responsável" value={clienteDetalhe.email_responsavel} onChange={e => salvaGeral('email_responsavel', e.target.value)} />

                    <Checkbox width='w-52' mbn titulo="Plano" value={clienteDetalhe.plano} onChange={e => salvaGeral('plano', e.target.value)} >
                        <option value="2">Pacote até 5GB</option>
                        <option value="6">Pacote até 10GB</option>
                        <option value="7">Pacote até 25GB</option>
                        <option value="8">Pacote até 50GB</option>
                        <option value="9">Pacote até 100GB</option>
                        <option value="12">Pacote até 250GB</option>
                        <option value="13">Pacote até 500GB</option>
                        <option value="14">Pacote até 1TB</option>
                        <option value="15">Pacote até 3TB</option>
                        <option value="16">Pacote até 5TB</option>
                    </Checkbox>

                    <FormModal className="mb-2 mt-3" label="Telefone" value={clienteDetalhe.telefone} onChange={e => salvaGeral('telefone', e.target.value)} />
                    <FormModal className="mb-2" label="Contato" value={clienteDetalhe.contato} onChange={e => salvaGeral('contato', e.target.value)} />

                    <label for="observação" className="form-label">Observação</label>
                    <textarea className={"form-control mb-3 " + (props.tema === 'escuro' ? "bg-slate-700 focus:bg-slate-800 text-white border-slate-500" : "")} id="observação" rows="3" value={clienteDetalhe.observacao} onChange={e => salvaGeral('observacao', e.target.value)} ></textarea>

                    <Checkbox width='w-24' mbn titulo="Contrato Assinado" value={clienteDetalhe.contrato_assinado} onChange={e => salvaGeral('contrato_assinado', e.target.value)}>
                        <option value="1">Sim</option>
                        <option value="0">Não</option>
                    </Checkbox>

                    <label for="dados-contato" className="form-label mt-3">Dados Contato</label>
                    <textarea className={"form-control " + (props.tema === 'escuro' ? "bg-slate-700 focus:bg-slate-800 text-white border-slate-500" : "")} id="dados-contato" rows="3" value={clienteDetalhe.dados_contratada} onChange={e => salvaGeral('dados_contratada', e.target.value)}></textarea>

                </Modal.Body>
                <Modal.Footer className={backgroudClass}>
                    <Button variant="primary" className={props.tema === 'claro' ? 'text-black' : ''} onClick={e => props.setShow(false)} >
                        Fechar
                    </Button>
                    <Button variant="success" className={props.tema === 'claro' ? 'text-black' : ''} onClick={() => {
                        dispatch(atulizaCadastroCliente(clienteDetalhe)); props.setShow(false)
                    }}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        clienteIndex: state.admReducers.clienteDetalhe,
        clientesLista: state.admReducers.listaTodos,
        tema: state.appReducer.tema
    }
}

export default connect(mapStateToProps, null)(ModalDetalhes)
