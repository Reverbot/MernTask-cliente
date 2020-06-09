import React, {useReducer} from 'react'
import alertaReducer from './alertaReducer'
import alertaContext from './alertaContext'

import {OCULTAR_ALERTA, MOSTRAR_ALERTA} from '../../types/index'


const AlertaState = (props) => {

    const initialState = {
        alerta : null
    }

    const [state, dispath] = useReducer(alertaReducer, initialState)

    //funciones

    //mostrar alerta
    const mostrarAlerta = (msg, categoria) => {
        dispath({
            type : MOSTRAR_ALERTA,
            payload : {
                msg,
                categoria   
            }
        })

        //limpiar alerta
        setTimeout(() => {
            dispath({
                type : OCULTAR_ALERTA
            })
        }, 5000)
    }

    return(
        <alertaContext.Provider
            value={{
                alerta : state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )

}

export default AlertaState

