import React, {useReducer} from 'react'

import AuthContext from './authContext'
import AuthReducer from './authReducer'

import clienteAxios from '../../config/axios'
import tokenAuth     from '../../config/token'

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types/index'

const AuthState = (props) => {

    const initialState = {
        token : localStorage.getItem('token'),
        autenticado : null,
        usuario : null,
        mensaje : null,
        cargando : true
    }

    const [state, dispath] = useReducer(AuthReducer, initialState)

    const registrarUsuario = async datos => {

        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos)
            console.log(respuesta);

            dispath({
                type: REGISTRO_EXITOSO,
                payload : respuesta.data
            })

            //obtener usuario
            usuarioAutenticado()
            
        } catch (error) {
            //console.log(error.response.data.msg);
            const alerta = {
                msg : error.response.data.msg,
                categoria : 'alerta-error'
            }

            dispath({
                type: REGISTRO_ERROR,
                payload : alerta
            })
        }
    }

        //Retorna el usuario autenticado
        const usuarioAutenticado = async () => {
            const token = localStorage.getItem('token')

            if(token){
                tokenAuth(token)
            }

            try {
                const respuesta = await clienteAxios.get('/api/auth')
                //console.log(respuesta)
                dispath({
                    type : OBTENER_USUARIO,
                    payload : respuesta.data
                })

            } catch (error) {
                
                dispath({
                    type : LOGIN_ERROR
                })
            }
        }

        const iniciarSesion = async datos =>  {
            try {
                const respuesta = await clienteAxios.post('/api/auth', datos)
                
                dispath({
                    type : LOGIN_EXITOSO,
                    payload : respuesta.data
                })

                //obtener el usuario
                usuarioAutenticado()
                
            } catch (error) {
                 console.log(error.response.data.msg);
                const alerta = {
                msg : error.response.data.msg,
                categoria : 'alerta-error'
            }

            dispath({
                type: LOGIN_ERROR,
                payload : alerta
            })
            }
        }

        const cerrarSesion = () => {
            dispath({
                type : CERRAR_SESION
            })
        }

    return(
        <AuthContext.Provider
            value={{
                token : state.token,
                autenticado : state.autenticado,
                usuario : state.usuario,
                mensaje : state.mensaje,
                cargando : state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
    
}

    

export default  AuthState

