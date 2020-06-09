import React, {useContext} from 'react'
import Proyecto from './Proyecto'

import proyectoContext from '../../context/proyectos/proyectoContext'
import { useEffect } from 'react'
import AlertaContext from '../../context/alertas/alertaContext'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const ListadoProyectos = () => {

    //state de proyectos de state inicial
    const proyectosContext = useContext(proyectoContext)
    const {mensaje,proyectos, obtenerProyectos} = proyectosContext

    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext

    //obtenerProyectos cuando carga el componente
    useEffect(() =>{

        //si hay un error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        obtenerProyectos()
        // eslint-disable-next-line
    },[mensaje])



    //revisar si proyecto tiene contendio
    if(proyectos.length === 0) return <h3>No hay proyectos, comienza creando uno</h3>;

    return ( 
        <ul className="listado-proyectos">
            {alerta ?  (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
           <TransitionGroup>
           {proyectos.map(proyecto  => (
                <CSSTransition
                    key={proyecto._id}
                    timeout={200}
                    classNames="proyecto"
                    >
                    <Proyecto
                    
                    proyecto={proyecto}/>
                </CSSTransition>
            ))}
           </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;