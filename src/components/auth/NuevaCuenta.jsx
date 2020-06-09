import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const NuevaCuenta = (props) => {

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext

    const authContext = useContext(AuthContext)
    const {registrarUsuario, mensaje,  autenticado} = authContext

    //en caso de que el usuario se alla registrado o sea duplicado
    useEffect(() => {
        
        if(autenticado){
            props.history.push('/proyectos')
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])


    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email : '',
        password : '',
        confirmar : ''
    })

    //extraer de usuario
    const {nombre,email, password, confirmar} = usuario

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        //validar
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return
        }

        //validar que el password que sea mayor a 6 caracteres
        if (password.length <= 5){
            mostrarAlerta('el password debe ser mayor a 6 caracteres', 'alerta-error')
            return
        }

        if(password !== confirmar ){
            mostrarAlerta('password no son iguales', 'alerta-error')
            return
        }


        //pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        })
    }

    return ( 
        <div className="form-usuario">
            {alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una Cuenta</h1>

                <form action="" onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            placeholder="Tu Nombre"
                            onChange={onChange}
                            />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Tu Email"
                            onChange={onChange}
                            />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Tu Password"
                            onChange={onChange}
                            />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            value={confirmar}
                            placeholder="Confirmar Tu Password"
                            onChange={onChange}
                            />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                            />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta" >
                    volver a Iniciar Sesion
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;