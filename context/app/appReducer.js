import { AGREGAR_DESCARGAS, AGREGAR_PASSWORD, CREAR_ENLACE_EXITO, LIMPIAR_ALERTA, LIMPIAR_APP, MOSTRAR_ALERTA, SUBIR_ARCHIVO, SUBIR_ARCHIVO_ERROR, SUBIR_ARCHIVO_EXITO } from "../../types";

export default (state, action) => {
    switch(action.type) {
        case SUBIR_ARCHIVO:
            return {
                ...state,
                cargando: true
            }
        case MOSTRAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: action.payload
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: null
            }

        case SUBIR_ARCHIVO_EXITO:
            return {
                ...state,
                nombre: action.payload.nombre,
                nombre_original: action.payload.nombre_original,
                cargando: null
            }
        case SUBIR_ARCHIVO_ERROR:
            return {
                ...state,
                mensaje_archivo: action.payload,
                cargando: null
            }
        case CREAR_ENLACE_EXITO:
            return {
                ...state,
                url: action.payload
            }

        case LIMPIAR_APP: 
            return {
                ...state,
                mensaje_archivo: null,
                nombre: '',
                nombre_original: '',
                cargando: null,
                descargas: 1,
                password: '',
                autor: null,
                url: ''
            }
        case AGREGAR_PASSWORD:
            return {
                ...state,
                password: action.payload
            }

        case AGREGAR_DESCARGAS:
            return {
                ...state,
                descargas: action.payload
            }
        default:
            return state;
    }
}