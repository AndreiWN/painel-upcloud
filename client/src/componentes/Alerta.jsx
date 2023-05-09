import React, { useEffect } from "react";

function Alerta(props) {

    const { show, apagaAlerta } = props

    useEffect(() => {
        const timeout = setTimeout(() => apagaAlerta(), 4000);
        return () => clearTimeout(timeout);
    }, [show]);


    return (
        show && (
            <div class={`alertas opacity-90 fixed bottom-3 right-3 toast align-items-center ${props.status === 'suceso' ? 'text-bg-success' : 'text-bg-danger'} border-0 fade show `} role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        {props.texto}
                        <span className="absolute right-4 top-2 cursor-pointer" onClick={apagaAlerta}>
                            <i class="bi bi-x-lg text-xl"></i>
                        </span>
                    </div>
                </div>
            </div>
        )
    );

}

export default Alerta