import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import FormModal from '../FormModal';

function ArquivoTabela({ dadosTabela, setDadosTabela, titulo, tema, setDadosTarefa, tipo }) {
    // Define o estado da posição da linha selecionada, do modal e do novo item a ser adicionado
    const [posicaoLinhaSelecionada, setPosicaoLinhaSelecionada] = React.useState(-1);
    const [showModal, setShowModal] = React.useState(false);
    const [novoItem, setNovoItem] = React.useState('');

    function salvaGeral(chave, valor) {
        setDadosTarefa(prev => ({
            ...prev,
            [chave]: objectToString(valor)
        }))
    }

    // Função para selecionar a linha da tabela
    function selecionarLinha(index) {
        // Mapeia os dados da tabela para alterar a propriedade isSelected apenas do item selecionado
        setDadosTabela(
            dadosTabela.map((item, i) => {
                if (i === index) {
                    return { ...item, isSelected: !item.isSelected };
                } else {
                    return { ...item, isSelected: false };
                }
            })
        );
        // Define a posição da linha selecionada
        setPosicaoLinhaSelecionada(index);
    }

    // Verifica se o tema é escuro
    const validaTema = tema === 'escuro'

    // Função para mover a linha selecionada para cima
    function moverLinhaCima() {
        if (posicaoLinhaSelecionada > 0) {
            const novaPosicaoLinhaSelecionada = posicaoLinhaSelecionada - 1;
            // Faz uma cópia do array de dados da tabela e troca a posição da linha selecionada com a linha acima
            setDadosTabela((prevDadosTabela) => {
                const novoArray = [...prevDadosTabela];
                [novoArray[posicaoLinhaSelecionada], novoArray[novaPosicaoLinhaSelecionada]] = [
                    novoArray[novaPosicaoLinhaSelecionada],
                    novoArray[posicaoLinhaSelecionada],
                ];
                salvaGeral(tipo, novoArray)
                return novoArray;
            });
            setPosicaoLinhaSelecionada(novaPosicaoLinhaSelecionada);
        }
    }

    // Função para mover a linha selecionada para baixo
    function moverLinhaBaixo() {
        if (posicaoLinhaSelecionada < dadosTabela.length - 1) {
            const novaPosicaoLinhaSelecionada = posicaoLinhaSelecionada + 1;
            // Faz uma cópia do array de dados da tabela e troca a posição da linha selecionada com a linha abaixo
            setDadosTabela((prevDadosTabela) => {
                const novoArray = [...prevDadosTabela];
                [novoArray[posicaoLinhaSelecionada], novoArray[novaPosicaoLinhaSelecionada]] = [
                    novoArray[novaPosicaoLinhaSelecionada],
                    novoArray[posicaoLinhaSelecionada],
                ];
                salvaGeral(tipo, novoArray)
                return novoArray;
            });
            setPosicaoLinhaSelecionada(novaPosicaoLinhaSelecionada);
        }
    }

    // Função para excluir a linha selecionada
    function excluirLinhaSelecionada() {

        let novoArray = [...dadosTabela];

        if (novoArray.length === 1) { // verifica se a lista tem apenas 1 objeto
            return; // se sim, retorna sem fazer nada
        }


        for (let i = 0; i < novoArray.length; i++) {
            if (novoArray[i].isSelected) {
                novoArray.splice(i, 1); // remove o objeto da novoArray
                i--; // decrementa o índice para compensar a remoção
            }
        }

        // atualiza os ids da novoArray
        for (let i = 0; i < novoArray.length; i++) {
            novoArray[i].id = i + 1;
        }
        salvaGeral(tipo, novoArray)
    }


    // Função para adicionar um novo item na tabela
    function adicionarItem() {
        console.log(dadosTabela)
        let novaTabela = [...dadosTabela];

        for (let i = 0; i < novaTabela.length; i++) {
            if (novaTabela[i].nome === '') {
                novaTabela.splice(i, 1); // remove o objeto da novaTabela
                i--; // decrementa o índice para compensar a remoção
            } else {
                novaTabela[i].id = i + 1; // atualiza o id com o novo valor
            }
        }

        if (novoItem !== '') {
            novaTabela.push(
                { id: novaTabela.length + 1, nome: novoItem, isSelected: false },
            )
            // Limpa o valor do novo item e fecha o modal
            salvaGeral(tipo, novaTabela)
            setNovoItem('');
            setShowModal(false);
        }
    }

    function objectToString(lista) {
        // Inicializa a string vazia
        let nomes = '';

        // Percorre cada objeto da lista e concatena o nome com a string de nomes separados por "?"
        for (let i = 0; i < lista.length; i++) {
            nomes += lista[i].nome;

            // Adiciona o caractere separador "?" após o nome
            nomes += '?';
        }

        // Retorna a string final com os nomes juntos e separados pelo caractere "?"
        return nomes;
    }

    const [linhasTabelas, setLinhasTabelas] = useState([])

    useEffect(() => {
        setLinhasTabelas(
            dadosTabela.map((item, index) => (
                <tr
                    key={item.id}
                    className={(item.isSelected ? validaTema ? 'bg-slate-700' : 'bg-slate-200' : '') + " cursor-pointer"}
                    onClick={() => selecionarLinha(index)}
                >
                    <td>{item.nome}</td>
                </tr>
            ))
        )
    }, [dadosTabela])

    return (
        <>
            <Table bordered className={(validaTema ? 'text-white' : 'text-black') + ' mt-3'}>
                <thead className={validaTema ? 'bg-slate-700 border-slate-500' : 'bg-slate-200 border-slate-500'}>
                    <tr>
                        <th>{titulo}</th>
                    </tr>
                </thead>
                <tbody className={(!validaTema ? 'bg-slate-100' : '') + ' border-slate-500'}>
                    {dadosTabela && dadosTabela.map((item, index) => (
                        <tr
                            key={item.id}
                            className={(item.isSelected ? validaTema ? 'bg-slate-700' : 'bg-slate-200' : '') + " cursor-pointer"}
                            onClick={() => selecionarLinha(index)}
                        >
                            <td>{item.nome}</td>
                        </tr>
                    ))}
                </tbody>

            </Table>

            <div className="d-flex">
                <Button variant="success" onClick={() => setShowModal(true)} className='mr-2'>
                    <i class={"bi bi-plus-lg" + (!validaTema ? ' text-black' : '')}></i>
                </Button>
                <Button variant="danger" onClick={excluirLinhaSelecionada} className='mr-2'>
                    <i class={"bi bi-dash-lg" + (!validaTema ? ' text-black' : '')}></i>
                </Button>
                <Button variant="primary" onClick={moverLinhaCima} className='mr-2'>
                    <i class={"bi bi-arrow-up" + (!validaTema ? ' text-black' : '')}></i>
                </Button>
                <Button variant="primary" onClick={moverLinhaBaixo}>
                    <i class={"bi bi-arrow-down" + (!validaTema ? ' text-black' : '')}></i>
                </Button>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} className={'Arquivo_Form pt-5 ' + (validaTema ? 'text-white' : 'text-black')}>
                <Modal.Header closeButton className={validaTema ? 'bg-slate-800 border-slate-500' : 'bg-gray-300 border-gray-400'}>
                    <Modal.Title>Adicionar Novo Item</Modal.Title>
                </Modal.Header>
                <Modal.Body className={validaTema ? 'bg-slate-800 border-slate-500' : 'bg-gray-300 border-gray-400'}>
                    {/* Componente de formulário para adicionar novo item */}
                    <FormModal label='Novo Caminho' placeholder='' value={novoItem} onChange={e => setNovoItem(e.target.value)} className='mb-2' />
                </Modal.Body>
                <Modal.Footer
                    className={validaTema ? 'bg-slate-800 border-slate-500' : 'bg-gray-300 border-gray-400'}>
                    <Button variant="primary" onClick={() => setShowModal(false)} className={`${!validaTema && 'text-black hover:bg-blue-400'}`}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={adicionarItem} className={`${!validaTema && 'text-black hover:bg-green-400 border-bg-green-400 hover:border-bg-green-400'}`}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        tema: state.appReducer.tema,
    }
}

export default connect(mapStateToProps, null)(ArquivoTabela)