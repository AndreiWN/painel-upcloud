import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Input from '../componentes/FormModal';
import Alerta from "../componentes/Alerta"
import { apagaAlertaLogin, loginADM, tokenLoginADM } from "./actions";

function LoginADM(props) {

    let [emailInput, setEmailInput] = useState("")
    let [senhaSemCripto, setSenhaSemCripto] = useState("")

    const dispatch = useDispatch()

    function handleLogin(event) {
        event.preventDefault();
        dispatch(loginADM(emailInput, senhaSemCripto))
    }

    useEffect(() => {
        let token = localStorage.getItem('TokenADM')
        dispatch(tokenLoginADM(token))
    })

    return (
        <div className={`${props.tema === 'escuro' ? 'bg-slate-900 text-white' : 'text-black'}`}>
            <div className={`
            min-h-screen  container
        `}>

                <div className="row cont-login">

                    <Alerta texto='Senha ou usuário inválido' status='erro' show={props.loginErro} apagaAlerta={() => dispatch(apagaAlertaLogin())} />

                    <div className="col flex items-center justify-center border-r border-slate-700">
                        <img src={process.env.PUBLIC_URL + '/tools-ori.png'} className='max-w-xs' />
                    </div>

                    <div className="col justify-center items-center">
                        <form action="" className="flex items-center justify-center flex-col h-full w-full" onSubmit={handleLogin}>
                            <Input value={emailInput} onChange={e => setEmailInput(e.target.value)} type='email' label='Email' placeholder='' className='text-2xl mb-4 w-5/6' />
                            <Input value={senhaSemCripto} onChange={e => { setSenhaSemCripto(e.target.value) }} type='password' label='Senha' placeholder='' className='text-2xl w-5/6 mb-5' />
                            <button className="bg-blue-600 hover:bg-sky-600 text-lg py-2 w-5/6 rounded-md">Fazer Login</button>
                            <p className="text-slate-500 mt-3 hover:text-slate-500">Painel Administrador</p></form>
                    </div>

                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tema: state.appReducer.tema,
        loginErro: state.admReducers.loginErro
    }
}


export default connect(mapStateToProps, null)(LoginADM)

