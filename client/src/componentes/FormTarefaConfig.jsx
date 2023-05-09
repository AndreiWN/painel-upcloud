import React from "react";
import { connect } from "react-redux";

function FormTarefaConfig(props) {
    return (
        <div className={'flex mb-3 mr-5 flex-nowrap' + props.clases} >
            <label for="exampleFormControlInput1" className="form-label mr-3 mt-2">{props.label}</label>
            <input type={props.type}
                className={`form-control 
            ${props.tema === 'escuro' ? "text-slate-100 bg-slate-700 border-slate-500 focus:bg-slate-800 focus:text-slate-100" : 'focus:text-black'} ` + props.width}
                placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
        </div>
    )
}

FormTarefaConfig.defaultProps = {
    width: 'w-9/12'
}

const mapStateToProps = (state) => {
    return {
        tema: state.appReducer.tema
    }
}

export default connect(mapStateToProps, null)(FormTarefaConfig)


