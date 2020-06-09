import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea'
import ProyectoContext from '../../context/proyectos/proyectoContext'
import TareaContext from '../../context/tareas/tareaContext'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const ListadoTarea = () => {

    //obtener el state de proyectos
    const ProyectosContext = useContext(ProyectoContext)
    const { proyecto, eliminarProyecto } = ProyectosContext

    //obtener el state de tareas
    const TareasContext = useContext(TareaContext)
    const {tareasProyecto} = TareasContext
  
    //si no hay proyecto seleccionado
    if(!proyecto) return <h2>Seleciona un Proyecto</h2>;

    //array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto

    //elimina un proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id)
    }

    return ( 
        <Fragment>
             <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasProyecto.length === 0  
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    :  
                    <TransitionGroup>
                        {tareasProyecto.map(tarea => (
                        <CSSTransition
                            key={tarea.id}
                            timeout={200}
                            classNames="tarea"
                            >
                            <Tarea
                            
                             tarea={tarea}/>
                        </CSSTransition>
                    ))}
                    </TransitionGroup>
                 }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
                >
                    Eliminar Proyecto &times;
            </button>
        </Fragment>
       
     );
}
 
export default ListadoTarea;