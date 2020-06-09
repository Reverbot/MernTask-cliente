import React, {useContext} from 'react'
import ProyectoContext from '../../context/proyectos/proyectoContext'
import TareaContext from '../../context/tareas/tareaContext'





const Proyecto = ({proyecto}) => {
    //obtener el state de proyectos
    const ProyectosContext = useContext(ProyectoContext)
    const {proyectoActual} = ProyectosContext

    //obtener la funcion del context tarea
    const TareasContext = useContext(TareaContext)
    const {obtenerTareas} = TareasContext

    //agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id) //fijar un proyecto actual
        obtenerTareas(id)   //filtrar las tareas cuando se de click
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >
                {proyecto.nombre}
            </button>
        </li>
     );
}
 
export default Proyecto;