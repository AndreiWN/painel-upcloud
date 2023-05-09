import React from "react";
import { connect } from "react-redux";

function FormModal(props) {
    return (
        <div className={props.className}>
            <label for="exampleFormControlInput1" className="form-label">{props.label}</label>
            <input type={props.type} className={`form-control ${props.tema === 'escuro' ? "text-slate-200 bg-slate-700 border-slate-500 focus:bg-slate-800 focus:text-slate-100" : ''}`} placeholder={props.placeholder}
                value={props.value} onChange={props.onChange} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tema: state.appReducer.tema
    }
}

export default connect(mapStateToProps, null)(FormModal)
