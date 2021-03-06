import React from 'react';
import { useReducer } from 'react'
import authContext from './authContext';
import authReducer from './authReducer';
import { USUARIO_AUTENTICADO, REGISTRO_EXITOSO, REGISTRO_ERROR, LIMPIAR_ALERTA, LOGIN_ERROR, LOGIN_EXITOSO, CERRAR_SESION } from '../../types/index';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = (props) => {

    //Definir un state inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    //Definir el reducer
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    //Funcion que registra nuevos usuarios
    const registrarUsuario = async (datos) => {
        try {
            const nuevoUsuario = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: nuevoUsuario.data.msg
            });


        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        }

        //lIMPIA LA ALERTA DESPUES DE 3SEG
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA,
                payload: null
            })
        }, 3000)
    }

    // //Funcion que devuelve un usuario autenticado
    // const usuarioAutenticado = nombre => {
    //     dispatch({
    //         type: USUARIO_AUTENTICADO,
    //         payload: nombre
    //     })
    // }

    //Autenticar usuarios
    const iniciarSesion = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA,
                payload: null
            })
        }, 3000)
    }

    //Funcion que retorna el usuario autenticado en base al JWT
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            if(respuesta.data.usuario) {
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                })
            }
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }



    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </authContext.Provider>
    )
};

export default AuthState;