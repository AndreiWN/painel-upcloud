import React from "react";
import Card from "../template/Card";
import { connect } from "react-redux";
import { deslogar, trocaTema } from "../redux/actions";
import { useNavigate } from "react-router-dom";


function Header(props) {

    const navigate = useNavigate();
    const fontSize = 'text-xl'
    const percentageArmazenmaneto = 60

    function desloga() {
        props.deslogar()
        navigate("/")
    }

    const { dadosUsuario } = props

    return (
        <div className="container py-3 mt-2">
            <div className="row">
                <div className="lado-esquerdo flex flex-col col">
                    <h1 className={`${fontSize} mb-2`}> Painel Do Usuário </h1>
                    <h1 className={`${fontSize}`}> Tema <span onClick={props.trocaTema} className='cursor-pointer'> <i class={`bi bi-${props.tema === 'claro' ? 'moon-stars' : 'sun-fill'}`}></i></span> </h1>
                </div>

                <div className="col flex justify-center items-center">
                    <Card text={`ARMAZENMENTO ${percentageArmazenmaneto}% 670G DE 1000G`} percentage={percentageArmazenmaneto} />
                    {/* <Card text={`SAÚDE DOS BACKUPS`} percentage={percentageBackup} /> */}
                </div>

                <div className="lado-esquerdo flex flex-col col text-right">
                    <h1 className={`${fontSize} mb-2`}>{dadosUsuario.nome} <span className={props.tema === 'claro' ? 'hover:text-emerald-600' : 'hover:text-emerald-300'}> <i class="bi bi-box-arrow-right cursor-pointer" onClick={desloga}></i> </span> </h1>
                    <h1 > <span className={`${fontSize} cursor-pointer ${props.tema === 'claro' ? 'hover:text-emerald-600' : 'hover:text-emerald-300'}`} onClick={props.abreFecha} >Configurações <i class="bi bi-gear-wide"></i> </span> </h1>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tema: state.appReducer.tema,
        dadosUsuario: state.appReducer.dadosUsuario,
        dadosTarefas: state.appReducer.dadosTarefas,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        trocaTema: () => dispatch(trocaTema()),
        deslogar: () => dispatch(deslogar())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)