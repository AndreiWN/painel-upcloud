import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Input from '../componentes/FormModal';
import axios from 'axios'
import { salvaDadosCliente } from "../redux/actions";
import Alerta from "./Alerta";
import { useNavigate } from 'react-router-dom';
import { MD5 } from "crypto-js";
import apiUrl from "../const";

function Login(props) {

    let [emailInput, setEmailInput] = useState("")
    let [senhaSemCripto, setSenhaSemCripto] = useState("")
    const [showAlerta, setShowAlerta] = useState()

    const navigate = useNavigate();

    const handleLogin = async (event) => {

        if (emailInput !== '' && senhaSemCripto !== '') {
            event.preventDefault();
            await axios.post(`${apiUrl}/login`, {
                emailInput,
                senhaInput: MD5(senhaSemCripto).toString().toUpperCase(),
                senhaSemCripto,
            }).then((response) => {
                localStorage.setItem('token', response.data.token)
                props.salvaDadosCliente(response.data)
                navigate('/painel');
            }).catch((e) => {
                setShowAlerta(true)
            })
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        document.title = 'Login'

        if (token) {
            axios.post(`${apiUrl}/tokenLogin`, {
                token: token
            }).then((response) => {
                props.salvaDadosCliente(response.data)
                document.title = 'Painel'
                navigate('/painel')
            }).catch((e) => {
                navigate('/')
            })
        } else {
            navigate('/')
        }

    }, [])

    return (
        <div className={`${props.tema === 'escuro' ? 'bg-slate-900 text-white' : 'text-black'}`}>
            <div className={`
            min-h-screen container
        `}>

                <div className="row cont-login">

                    <Alerta texto='Senha ou usuário inválido' status='erro' show={showAlerta} apagaAlerta={() => setShowAlerta(false)} />

                    <div className="col flex items-center justify-center border-r border-slate-700">
                        <img src={process.env.PUBLIC_URL + '/logo.png'} className='max-w-xs' />
                    </div>

                    <div className="col justify-center items-center">
                        <form action="" className="flex items-center justify-center flex-col h-full w-full" onSubmit={handleLogin}>
                            <Input value={emailInput} onChange={e => setEmailInput(e.target.value)} type='email' label='Email' placeholder='' className='text-2xl mb-4 w-5/6' />
                            <Input value={senhaSemCripto} onChange={e => { setSenhaSemCripto(e.target.value) }} type='password' label='Senha' placeholder='' className='text-2xl w-5/6 mb-5' />
                            <button className="bg-blue-600 hover:bg-sky-600 text-lg py-2 w-5/6 rounded-md">Fazer Login</button>
                            <a href="https://api.whatsapp.com/send?phone=5547999891745" className="text-slate-500 mt-3 hover:text-slate-500">Precisa de ajuda? clique aqui!</a>                       </form>
                    </div>

                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tema: state.appReducer.tema,
        logado: state.appReducer.logado,
        numeroLinhas: state.appReducer.numeroLinhas
    }
}

const mapDispatchToProps = { salvaDadosCliente }

export default connect(mapStateToProps, mapDispatchToProps)(Login)

