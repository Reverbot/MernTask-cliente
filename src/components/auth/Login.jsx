import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const Login = (props) => {

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    const authContext = useContext(AuthContext)
    const { iniciarSesion, mensaje,  autenticado } = authContext

      //en caso de que el password o usuariuo no exista
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
        email : '',
        password : ''
    })

    //extraer de usuario
    const {email, password} = usuario

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        //validar
        if(email.trim() === "" || password.trim() === ""){
            mostrarAlerta('todos lo camopos son obligatorios', 'alerta-error ')
            return
        }


        //pasarlo al action
        iniciarSesion({email, password})
    }

    return ( 
        <div className="form-usuario">
            {alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null}

            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>

                <form action="" onSubmit={onSubmit}>
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
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesion"
                            />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta" >
                    Obtener Cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;