const express = require('express');
const mysql = require('mysql2')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const secretKey = 'T&n!1zF2@w#yD8qR';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bancoteste',
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado no banco com sucesso');
});

app.post('/api/login', (req, res) => {
    const username = req.body.emailInput;
    const password = req.body.senhaInput;
    const passwordSemCripto = req.body.senhaSemCripto
    let token

    let dadosUsuario = {};
    let dadosTarefas = {};

    const sqlDadosUsuario = `SELECT * FROM usuario 
                            WHERE usuario = ?
                            AND (senha = ? OR senha = ?)`;

    const slqTarefas = `SELECT tarefa.*, tarefa_configuracao.backup_ativo
                        FROM tarefa 
                        INNER JOIN tarefa_configuracao
                        ON tarefa_configuracao.tarefa_id = tarefa.id
                        WHERE tarefa.usuario_id = ?
                        ORDER BY tarefa.nome;`;

    db.query(sqlDadosUsuario, [username, password, passwordSemCripto], (err, results) => {
        if (err) {
            throw err;
        }
        if (results.length > 0) {
            const user = results[0];
            dadosUsuario = user;
            token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '2d' });
        } else {
            res.status(401).send('Senha ou usuário inválido');
        }

        if (results.length > 0) {
            db.query(slqTarefas, [dadosUsuario.id], (err, results) => {
                if (err) {
                    throw err;
                }

                if (results.length > 0) {
                    dadosTarefas = results;
                }

                if (dadosUsuario && Object.keys(dadosUsuario).length > 0 && dadosTarefas && Object.keys(dadosTarefas).length > 0) {
                    res.status(200).json({ dadosUsuario, dadosTarefas, token });

                } else {
                    res.status(401).send('Dados de usuário ou tarefas inválidos');
                }
            });
        }
    });
});

app.post('/api/tokenLogin', (req, res) => {
    const token = req.body.token

    if (!token) {
        return res.status(401).send('Token não fornecido');
    }

    let decoded;
    try {
        decoded = jwt.verify(token, secretKey);
    } catch (err) {
        return res.status(401).send('Token inválido');
    }

    const userId = decoded.userId;
    let dadosUsuario = {};
    let dadosTarefas = {};


    const sqlUsuario = 'SELECT * FROM usuario WHERE id = ?'

    const slqTarefas = `SELECT tarefa.*, tarefa_configuracao.backup_ativo
                        FROM tarefa 
                        INNER JOIN tarefa_configuracao
                        ON tarefa_configuracao.tarefa_id = tarefa.id
                        WHERE tarefa.usuario_id = ?
                        ORDER BY tarefa.nome;`;

    db.query(sqlUsuario, [userId], (err, results) => {
        if (err) {
            throw err;
        } if (results.length > 0) {
            const user = results[0];
            dadosUsuario = user;
        }

        if (results.length > 0) {
            db.query(slqTarefas, [userId], (err, results) => {
                if (err) {
                    throw err;
                }

                if (results.length > 0) {
                    dadosTarefas = results;
                }

                if (dadosUsuario && Object.keys(dadosUsuario).length > 0 && dadosTarefas && Object.keys(dadosTarefas).length > 0) {
                    res.status(200).json({ dadosUsuario, dadosTarefas });

                } else {
                    res.status(401).send('Dados de usuário ou tarefas inválidos');
                }
            });
        }

    })


})

app.post('/api/atualizaDadosUsuario', (req, res) => {
    const usuario = req.body.id;

    let dadosUsuario = {};

    const sqlDadosUsuario = 'SELECT * FROM usuario WHERE id = ?';

    db.query(sqlDadosUsuario, [usuario], (err, results) => {
        if (err) {
            throw err;
        } if (results) {
            res.status(200).json({ dadosNovos: results });
        }
    })
})

app.post('/api/getTarefaHistorico', (req, res) => {

    const tarefaID = req.body.tarefaID;
    const numeroLinhas = req.body.numeroLinhas
    const pagina = req.body.pagina
    const slqHistoricoTarefa = 'SELECT * FROM historico WHERE tarefa_id = ? ORDER BY data_execucao DESC LIMIT ? OFFSET ?;'

    let totalDeLinhas = 2485
    const sqlTotalDeLinhas = 'SELECT COUNT(*) FROM historico WHERE tarefa_id = ?;'


    db.query(sqlTotalDeLinhas, [tarefaID], (err, results) => {
        if (err) {
            throw err;
        } if (results.length > 0) {
            totalDeLinhas = results
        }
    })

    db.query(slqHistoricoTarefa, [tarefaID, numeroLinhas, pagina], (err, results) => {
        if (err) {
            throw err;
        }
        if (results.length > 0) {
            res.status(200).json({ historicoTarefa: results, totalDeLinhas: totalDeLinhas })
        } else {
            res.status(401).send('Dados da tarefa não encontrados ');
        }
    })

})

app.post('/api/getTarefaHistoricoEspecifico', (req, res) => {
    const historicoID = req.body.historicoID;
    const sqlGetHistorico = 'SELECT * FROM mensagem WHERE historico_id = ?;'

    db.query(sqlGetHistorico, [historicoID], (err, results) => {
        if (err) {
            throw err;
        } if (results) {
            res.status(200).json({ resultado: results });
        }
    })

})

app.post('/api/getConfiguracaoTarefa', (req, res) => {
    const tarefaID = req.body.tarefaID
    const sqlGetConfiguracoes = 'SELECT * FROM tarefa_configuracao WHERE tarefa_id = ?;'


    db.query(sqlGetConfiguracoes, [tarefaID], (err, results) => {
        if (err) {
            throw err;
        } if (results) {
            res.status(200).json({ configTarefa: results });
        }
    })

})

app.post('/api/atualizarConfiguracoesTarefa', (req, res) => {
    const {
        tarefa_id,
        backup,
        compactacao_tipo,
        compactacao_senha,
        backup_ativo,
        agendamento_tipo,
        agendamento_dias,
        agendamento_hora,
        origem,
        destino,
        substitui_ultima_copia,
        copia_diaria,
        copia_semanal,
        copia_mensal,
        desliga_computador,
        solicita_usuario_senha,
        validacao_normal,
        validacao_avancada,
        copia_mensal_ultima,
        criptografa_compactacao,
        envia_email_conclusao,
        tipo_conexao,
        executa_restauracao_automatica,
        email_enviado_rest_auto
    } = req.body;

    const sql = `UPDATE tarefa_configuracao SET
                backup = ?,
                compactacao_tipo = ?,
                compactacao_senha = ?,
                backup_ativo = ?,
                agendamento_tipo = ?,
                agendamento_dias = ?,
                agendamento_hora = ?,
                origem = ?,
                destino = ?,
                substitui_ultima_copia = ?,
                copia_diaria = ?,
                copia_semanal = ?,
                copia_mensal = ?,
                desliga_computador = ?,
                solicita_usuario_senha = ?,
                validacao_normal = ?,
                validacao_avancada = ?,
                copia_mensal_ultima = ?,
                criptografa_compactacao = ?,
                envia_email_conclusao = ?,
                tipo_conexao = ?,
                executa_restauracao_automatica = ?,
                email_enviado_rest_auto = ?
                WHERE tarefa_id = ?`;

    db.query(sql, [
        backup,
        compactacao_tipo,
        compactacao_senha,
        backup_ativo,
        agendamento_tipo,
        agendamento_dias,
        agendamento_hora,
        origem,
        destino,
        substitui_ultima_copia,
        copia_diaria,
        copia_semanal,
        copia_mensal,
        desliga_computador,
        solicita_usuario_senha,
        validacao_normal,
        validacao_avancada,
        copia_mensal_ultima,
        criptografa_compactacao,
        envia_email_conclusao,
        tipo_conexao,
        executa_restauracao_automatica,
        email_enviado_rest_auto,
        tarefa_id
    ], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send('Dados atualizados com sucesso');
    });
});

app.post('/api/ativaBackup', (req, res) => {
    const id = req.body.id
    const sql = `UPDATE tarefa SET executa = 1 WHERE id = ?;`

    db.query(sql, [id], (err, results) => {
        if (err) {
            throw err;
        } if (results) {
            res.status(200).json({ status: 'sucesso' });
        }
    })
})

app.post('/api/atualizaConfigsEmail', (req, res) => {
    const {
        email,
        email_responsavel,
        id,
    } = req.body.dados;

    const sqlEmail = `UPDATE usuario SET 
                     email = ?,
                     email_responsavel = ?
                     WHERE id = ?`

    db.query(sqlEmail, [email, email_responsavel, id], (err, results) => {
        if (err) {
            throw err;
        } if (results) {
            res.status(200).json({ status: 'sucesso' });
        }
    })

})

app.post('/api/atualizaSenha', (req, res) => {
    const {
        email,
        email_responsavel,
        id,
    } = req.body.dadosUsuario;

    const senhaNova = req.body.senhaNova



    const sqlEmailSenha = `UPDATE usuario SET 
                            email = ?,
                            email_responsavel = ?,
                            senha = ?
                            WHERE id = ?`

    db.query(sqlEmailSenha, [email, email_responsavel, senhaNova, id], (err, results) => {
        if (err) {
            throw err;
        } if (results) {
            res.status(200).json({ status: 'sucesso' });
        }
    })

})

app.post('/api/getTabelaDeErros', (req, res) => {
    const sqlErros = `SELECT painel_adm_erro.*, tarefa.nome AS nome_da_tarefa, usuario.nome, usuario.senha, usuario.usuario, usuario.contato
                    FROM painel_adm_erro
                    INNER JOIN tarefa
                    ON painel_adm_erro.tarefa_id = tarefa.id
                    INNER JOIN usuario
                    ON usuario.id = painel_adm_erro.usuario_id
                    ORDER BY dias_sem_executar DESC;`

    db.query(sqlErros, (err, results) => {
        if (err) {
            throw err
        }

        if (results) {
            res.status(200).json({ listaErros: results })
        }

    })
})

app.post('/api/getTabelaFechados', (req, res) => {
    const sqlFechados = `SELECT painel_adm_fechado.*, usuario.senha, usuario.usuario, usuario.contato, usuario.nome
                        FROM painel_adm_fechado
                        INNER JOIN usuario
                        ON usuario.id = painel_adm_fechado.usuario_id`

    db.query(sqlFechados, (err, results) => {
        if (err) {
            throw err
        }

        if (results) {
            res.status(200).json({ listaFechados: results })
        }
    })
})

app.post('/api/getTodosClientes', (req, res) => {
    const sqlTodos = `SELECT usuario.*, permissao.plano, permissao.data
                    FROM usuario
                    INNER JOIN permissao
                    ON permissao.usuario_id = usuario.id
                    WHERE  status = 'ATIVO'`

    db.query(sqlTodos, (err, results) => {
        if (err) {
            throw err
        }
        if (results) {
            res.status(200).json({ todosClientes: results })
        }
    })
})

app.post('/api/LoginADM', (req, res) => {
    const usuario = req.body.login
    const senha = req.body.senha

    const sqlLoginADM = `SELECT * 
                        FROM painel_usuario
                        WHERE usuario = ? AND senha = ?`

    let token

    db.query(sqlLoginADM, [usuario, senha], (err, results) => {

        if (err) {
            throw err
        }

        if (results.length > 0) {
            token = jwt.sign({ userId: usuario }, secretKey, { expiresIn: '7d' });
            res.status(200).json({ status: true, tokenADM: token })
        } else {
            res.status(401).send('Dados de usuário ou tarefas inválidos');
        }
    })
})

app.post('/api/TokenADMLogin', (req, res) => {
    const token = req.body.token

    if (!token) {
        return res.status(401).send('Token não fornecido');
    }

    let decoded;
    try {
        decoded = jwt.verify(token, secretKey);
    } catch (err) {
        return res.status(401).send('Token inválido');
    }

    const userId = decoded.userId;

    const sqlLoginADM = `SELECT usuario.*, permissao.plano, permissao.data
                        FROM usuario
                        INNER JOIN permissao
                        ON permissao.usuario_id = usuario.id
                        WHERE  status = 'ATIVO'`


    db.query(sqlLoginADM, [userId], (err, results) => {
        if (err) {
            throw err
        }
        if (results) {
            res.status(200).json({ status: true })
        }
    })
})

app.post('/api/atulizaCadastroCliente', (req, res) => {
    const {
        cidade_id,
        contato,
        contrato_assinado,
        dados_contratada,
        data,
        email,
        email_responsavel,
        estado_id,
        horario_download,
        id,
        inscricao,
        nome,
        observacao,
        plano,
        plano_contratado,
        reinicia_upcloud,
        senha,
        status,
        telefone,
        tipo,
        ultimo_acesso,
        usuario,
        usuario_adm,
        versao,
        whatsapp,
    } = req.body.dados;

    const sql = `
        UPDATE usuario
        INNER JOIN permissao ON permissao.usuario_id = usuario.id
        SET 
          cidade_id = ?,
          contato = ?,
          contrato_assinado = ?,
          dados_contratada = ?,
          data = ?,
          email = ?,
          email_responsavel = ?,
          estado_id = ?,
          horario_download = ?,
          inscricao = ?,
          nome = ?,
          observacao = ?,
          plano_contratado = ?,
          reinicia_upcloud = ?,
          senha = ?,
          telefone = ?,
          tipo = ?,
          ultimo_acesso = ?,
          usuario_adm = ?,
          versao = ?,
          whatsapp = ?,
          status = ?,
          usuario = ?,
          plano = ? 
        WHERE 
          usuario.id = ?
      `;

    db.query(sql, [
        cidade_id,
        contato,
        contrato_assinado,
        dados_contratada,
        data,
        email,
        email_responsavel,
        estado_id,
        horario_download,
        inscricao,
        nome,
        observacao,
        plano_contratado,
        reinicia_upcloud,
        senha,
        telefone,
        tipo,
        ultimo_acesso,
        usuario_adm,
        versao,
        whatsapp,
        status,
        usuario,
        plano,
        id
    ], (error) => {
        if (error) {
            res.status(500).send('Erro ao atualizar os dados do usuário.');
        } else {
            res.status(200).send('');
        }
    });
})

app.listen(14001, () => {
    console.log("Rodando na porta 14001")
})