import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./componentes/Login";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import PainelADM from "./painelADM/PainelADM";

function MyRoutes(props) {

    return (
        <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/painel" element={<App />} />
            <Route path="/painel-adm" element={<PainelADM />} />
        </Routes>
    )
}

const mapStateToProps = (state) => {
    return {
        logado: state.logado
    }
}


export default connect(mapStateToProps, null)(MyRoutes)