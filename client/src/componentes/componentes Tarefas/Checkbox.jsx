import React, { useEffect } from "react";
import { connect } from "react-redux";

function Checkbox(props) {

    return (
        <div className={`flex ${props.mbn ? '' : 'mb-3'}`}>
            <span className="mt-2">{props.titulo}</span>
            <select className={
                (props.tema === 'escuro' ?
                    "bg-slate-800 text-base ml-3 border-slate-500 border1px rounded-md p-2" :
                    "text-base ml-3 border1px rounded-md p-2")

            } style={{
                backgroundImage: props.tema === 'escuro' ? (process.env.PUBLIC_URL + '/chevron-down.svg') : (process.env.PUBLIC_URL + '/chevron-black.svg')
            }}
                onChange={props.onChange}
                value={props.value}
            >

                {props.children}

            </select>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        tema: state.appReducer.tema,
    }
}

export default connect(mapStateToProps, null)(Checkbox)