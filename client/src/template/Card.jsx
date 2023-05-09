import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { connect } from "react-redux";

function Card(props) {

    const { percentage, text } = props

    return (
        <div>
            <div className={`w-80 h-24 mr-5 rounded-xl degt bg-gradient-to-tr ${props.tema === 'escuro' ?
                'from-slate-800 to-slate-700' :
                'from-slate-200 to-gray-200'
                } row`}>
                <div className="col-8 flex justify-center items-center text-lg">
                    {text}
                </div>
                <div className="col flex justify-center items-center">
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        strokeWidth={10}
                        styles={buildStyles({
                            textColor: props.tema === 'claro' ? 'black' : '#fff',
                            pathColor: props.tema === 'claro' ? '#00a08b' : "#2bffb4",
                            trailColor: "transparent"
                        })}
                    />
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        tema: state.appReducer.tema
    }
}

export default connect(mapStateToProps, null)(Card)
