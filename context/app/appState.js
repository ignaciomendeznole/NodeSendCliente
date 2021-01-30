import React, { useReducer } from 'react';
import appContext from './appContext';
import appReducer from './appReducer';
import { AGREGAR_DESCARGAS, AGREGAR_PASSWORD, CREAR_ENLACE_ERROR, CREAR_ENLACE_EXITO, LIMPIAR_ALERTA, LIMPIAR_APP, MOSTRAR_ALERTA, SUBIR_ARCHIVO, SUBIR_ARCHIVO_ERROR, SUBIR_ARCHIVO_EXITO } from '../../types/index';
import clienteAxios from '../../config/axios';

const AppState = props => {

    const initialState = {
        mensaje_archivo: null,
        nombre: '',
        nombre_original: '',
        cargando: null,
        descargas: 1,
        password: '',
        autor: null,
        url: ''
    }

    //Crear dispatch y state

    const [ state, dispatch ] = useReducer(appReducer, initialState);

    //Mostrar una alerta
    const mostrarAlerta = msg => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 5000)
    }

    //Sube los archivos al servidor
    const subirArchivo = async (formData, nombreArchivo) => {
        dispatch({
            type: SUBIR_ARCHIVO
        });
        try {
            const resultado = await clienteAxios.post('/api/archivos', formData);
            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: resultado.data.archivo,
                    nombre_original: nombreArchivo
                }
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    //Crea el enlace una vez que se subió el archivo

    const crearEnlace = async () => {
        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        }

        try {
            const resultado = await clienteAxios.post('/api/enlaces', data);
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data.msg
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: CREAR_ENLACE_ERROR
            })
        }
    }

    const limpiarApp = () => {
        dispatch({
            type: LIMPIAR_APP
        })
    }

    //Agregar el password al state

    const agregarPassword = password => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password
        })
    }

    //Agrega un numero de descargas
    const agregarDescargas = descargas => {
        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: descargas
        })
    }
    return (
        <appContext.Provider
            value={{
                mensaje_archivo: state.mensaje_archivo,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivo,
                crearEnlace,
                limpiarApp,
                agregarPassword,
                agregarDescargas
            }}
        >
            {props.children}
        </appContext.Provider>
    )
};

export default AppState;