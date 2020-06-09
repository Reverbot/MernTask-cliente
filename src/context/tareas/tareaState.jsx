import React, {useReducer} from 'react'
import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer'
import clienteAxios from '../../config/axios'
import {
    TAREAS_PROYECTOS,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA
    } from '../../types/index'


const TareaState = props => {
    const initialState = {
       
        tareasProyecto : [],
        errorTarea : false,
        tareaSelecionada : null
    }


    //crear dispath y state
    const [state, dispath] = useReducer(TareaReducer, initialState)

    //obtener las tareas de un proyecto
    const obtenerTareas =async proyecto  => {
       try {
           const resultado = await clienteAxios.get('/api/tareas', {params : {proyecto}})

           dispath({
            type : TAREAS_PROYECTOS,
            payload : resultado.data.tareas
        })
       } catch (error) {
           console.log(error);
       }
    }

    //agregar una tarea al proyecto seleccionado
    const agregarTarea =async tarea => {

        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea)
            console.log(resultado); 
            dispath({
                type : AGREGAR_TAREA,
                payload : tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    //valida y muestra un error en caso de ser necesario
    const validarTarea = () => {
        dispath({
            type : VALIDAR_TAREA
        })
    }

    //EDITA UNA TAREA
    const actualizarTarea = async tarea => {
       try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
           

        dispath({
            type: ACTUALIZAR_TAREA,
            payload : resultado.data.tarea
        })
       } catch (error) {
           console.log(error);
       }
    }
    //ELIMINAR UNA TAREA POR ID
    const eliminarTarea = async ( id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params:{proyecto}})

            dispath({
                type : ELIMINAR_TAREA,
                payload : id
            })
        } catch (error) {
            console.log(error);
        }
    }

    //EXTRAER UNA TAREA PARA EDICION
    const guardarTareaActual = tarea => {
        dispath({
            type : TAREA_ACTUAL,
            payload : tarea
        })
    }

   

    return(
        <TareaContext.Provider
            value={{
                tareasProyecto : state.tareasProyecto, 
                errorTarea : state.errorTarea,
                tareaSelecionada : state.tareaSelecionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea
            }}    
        >
            {props.children}
        </TareaContext.Provider>
    )
} 

export default TareaState;