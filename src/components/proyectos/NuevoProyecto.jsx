import React, {Fragment, useState, useContext} from 'react'
import protectoContext from '../../context/proyectos/proyectoContext'


const NuevoProyecto = () => {

    //obtener el state del formulario
    const proyectosContext = useContext(protectoContext)
    const {formulario, mostrarFormulario, agregarproyecto, mostrarError, errorFormulario} = proyectosContext

    //state para proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre : ''
    }) 
    //extraer nombre proyecto
    const {nombre} = proyecto

    //lee el contenido de los inputs
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    //cuando el usuario envia el proyecto
    const onsubmitProyecto = e => {
        e.preventDefault()

        //validar el proyecto   
        if(nombre === ''){
            mostrarError()
            return
        
        }

        //agregar al state
        agregarproyecto(proyecto)
        //reiniciar el form
        guardarProyecto({
            nombre : ''
        })
    }

    //mostrar formulario
    const onClickFormulario = () => {
        mostrarFormulario()
    }
 
    return ( 
        <Fragment>
            <button
            type="button"
            className="btn btn-block btn-primario"
            onClick = {onClickFormulario}
        >
            Nuevo Proyecto
        </button>

       {
           formulario 
            ?
                (
                    <form 
                    action=""
                    className="formulario-nuevo-proyecto"
                    onSubmit={onsubmitProyecto}
                    >
                        <input 
                            type="text"  
                            id=""
                            className="input-text"
                            placeholder="Nombre Proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProyecto}
                            />
                        <input 
                            type="submit"
                            className="btn btn-block btn-primario"
                            value="Agregar Proyecto"
                        />
                </form>
                )
            : null}
            { errorFormulario
                ?
                
                    <p className="mensaje error"> El nombre es obligatorio</p>
                
                :   null

            }
        </Fragment>
        
     );
}
 
export default NuevoProyecto;