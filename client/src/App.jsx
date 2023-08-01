import React, { useEffect } from 'react';
import './App.css';
import Header from './componentes/Header';
import Tables from './componentes/ContTables';
import { useState } from 'react';
import ConfigModal from './componentes/ConfigModal';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ConfigModalTarefas from './componentes/ConfigModalTarefas';
import { abreTarefasConfig, fechaTarefasConfig, salvaDadosCliente } from './redux/actions';
import axios from 'axios';
import apiUrl from './const';

function App(props) {

  const [abreConfig, setAbreConfig] = useState(false)
  const navigate = useNavigate()

  function appBackgroundClass() {
    if (props.tema === 'claro') {
      return 'bg-white min-h-screen app-div text-black'
    } else {
      return 'bg-slate-900 min-h-screen app-div text-white'
    }
  }

  function modificaModalConfig() {
    setAbreConfig(!abreConfig)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      axios.post(`${apiUrl}/tokenLogin`, {
        token: token
      }).then((response) => {
        props.salvaDadosCliente(response.data)
      }).catch((e) => {
        navigate('/painel')
      })
    } else {
      navigate('/')
    }

    document.title = 'Painel'

  }, [])

  return (

    <div className={appBackgroundClass()}>
      <Header abreFecha={modificaModalConfig} />
      <Tables />
      <ConfigModal show={abreConfig} abreFecha={modificaModalConfig} />
      <ConfigModalTarefas show={props.showTarefasConfig} abreFecha={props.fechaTarefasConfig} />
    </div>

  );
}

const mapStateToProps = (state) => {
  return {
    tema: state.appReducer.tema,
    logado: state.appReducer.logado,
    dadosUsuario: state.appReducer.dadosUsuario,
    showTarefasConfig: state.appReducer.showTarefasConfig
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    abreTarefasConfig: () => dispatch(abreTarefasConfig()),
    fechaTarefasConfig: () => dispatch(fechaTarefasConfig()),
    salvaDadosCliente: (data) => dispatch(salvaDadosCliente(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
