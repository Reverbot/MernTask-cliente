import React, {useContext} from 'react';
import TareaContext from '../../context/tareas/tareaContext'
import ProyectoContext from '../../context/proyectos/proyectoContext'

const Tarea = ({tarea}) => {

     //extraer si un proyecto esta activo
     const ProyectosContext = useContext(ProyectoContext)
     const { proyecto } = ProyectosContext

     const [proyectoActual] = proyecto

    //obtener la funcion del context tarea
    const TareasContext = useContext(TareaContext)
    const {eliminarTarea,obtenerTareas,actualizarTarea ,guardarTareaActual} = TareasContext

    //funcion que se ejecuta cuando el usuario elmina tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id)
        obtenerTareas(proyectoActual.id)
    }

    //funcion que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if(tarea.estado){
            tarea.estado = false
        }else{
            tarea.estado = true
        }
        actualizarTarea(tarea)
    }

    //agrega una tarea actual cuando el suaurio dedes editarla
    const selecionarTarea = tarea => {
        guardarTareaActual(tarea)
    }

    return ( 
       <li className="tarea sombra">    
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado
                    ?  
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstado(tarea)}
                                >
                                    Completo
                            </button>
                        )
                    :
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstado(tarea)}
                                >
                                    Incompleto
                            </button>
                        )
                        
                    }
            </div>
            <div className="acciones">
                <button
                    className="btn btn-primario"
                    onClick={() => selecionarTarea(tarea)}
                > 
                    Editar</button>
                <button
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea._id)}
                >
                    Eliminar</button>
            </div>
       </li>
     );
}
 
export default Tarea;