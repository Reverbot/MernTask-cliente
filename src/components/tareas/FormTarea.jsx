import React, {useContext, useState, useEffect} from 'react'
import ProyectoContext from '../../context/proyectos/proyectoContext'
import TareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {

    //extraer si un proyecto esta activo
    const ProyectosContext = useContext(ProyectoContext)
    const { proyecto } = ProyectosContext

    //obtener la funcion del context tarea
    const TareasContext = useContext(TareaContext)
    const {errorTarea,agregarTarea, validarTarea, obtenerTareas,tareaSelecionada,actualizarTarea} = TareasContext

    //effect que detecta si hay una tarea selecionada
    useEffect(() => {
        if(tareaSelecionada !== null){
            guardarTarea(tareaSelecionada)
        }else{
            guardarTarea({
                nombre : ''
            })
        }

    }, [tareaSelecionada])

    //state del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    const {nombre} = tarea

    //si no hay proyecto seleccionado
    if(!proyecto) return null;

    //array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto

    //leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        //validar
        if(nombre.trim()=== ''){
            validarTarea()
            return
        }

        //validar si es edicion o nueva tarea
        if(tareaSelecionada === null){
        tarea.proyecto  = proyectoActual._id
        agregarTarea(tarea)
        }else{
            actualizarTarea(tarea)
        }
        
        //obtener y filtrar tareas del proyecto actual
        obtenerTareas(proyectoActual.id)

        //reiniciar el form
        guardarTarea({
            nombre: ''
        })
    }

    return ( 
        <div className="formulario">
            <form action="" onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                        />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit" 
                        name="" 
                        id=""
                        className="btn btn-primario btn-block"
                        value={tareaSelecionada ? 'Editar Tarea' : 'Agregar Tarea'}
                        />
                </div>
            </form>
            {errorTarea ? <p className="mensaje error">El nombre de la tarea es oblogatorio</p> : null}
        </div>
     );
}
 
export default FormTarea;