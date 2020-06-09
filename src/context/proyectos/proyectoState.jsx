import React, { useReducer } from 'react'   

import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import {
        FORMULARIO_PROYECTO,
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTO,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO,
        PROYECTO_ERROR
    } from '../../types'

    import clienteAxios from '../../config/axios'

const ProyectoState = props => {

    
    
    const  initialSate = {
         proyectos : [],
        formulario : false,
        errorFormulario: false,
        proyecto : null,
        mensaje : null
    }

    // Dispath para ejecutar las acciones
    const [state, dispath] = useReducer(proyectoReducer,initialSate)


    //serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispath({
            type : FORMULARIO_PROYECTO
        })
    }

    //obtener proyectos
    const obtenerProyectos = async() => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos')

            dispath({
                type : OBTENER_PROYECTOS,
                payload : resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg : 'Hbo un error',
                categoria : 'alerta-error'
            }


            dispath({
                type: PROYECTO_ERROR,
                payload : alerta
            })
        }
    }
    //agregar proyectos
    const agregarproyecto = async proyecto => {

        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto)
            console.log(resultado)
            //insertar el proyecto al state
            dispath({
                type : AGREGAR_PROYECTO,
                payload : resultado.data
            })
        } catch (error) {
            const alerta = {
                msg : 'Hbo un error',
                categoria : 'alerta-error'
            }


            dispath({
                type: PROYECTO_ERROR,
                payload : alerta
            })
        }
    }

    //valida el formulario por errores
    const mostrarError = () =>{
        dispath({
            type : VALIDAR_FORMULARIO   
        })
    }

    //seleciona el proyecto que el usuario dio click
    const proyectoActual = proyectoId => {
        dispath({
            type : PROYECTO_ACTUAL,
            payload : proyectoId
        })
    }

    //ELIMINA UN PROYECTO
    const eliminarProyecto = async proyectoId => {
        
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`) 
            
        dispath({
            type: ELIMINAR_PROYECTO,
            payload : proyectoId
        })
        } catch (error) {
            const alerta = {
                msg : 'Hbo un error',
                categoria : 'alerta-error'
            }


            dispath({
                type: PROYECTO_ERROR,
                payload : alerta
            })
        }
    }

    return(
        <proyectoContext.Provider
            value={{
                proyectos : state.proyectos,
                formulario: state.formulario,
                errorFormulario : state.errorFormulario,
                proyecto : state.proyecto,
                mensaje : state.mensaje,  
                mostrarFormulario,
                obtenerProyectos,
                agregarproyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState