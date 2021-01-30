import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import { useRouter } from 'next/router'


const Header = () => {

    const router = useRouter();

    const AuthContext = useContext(authContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = AuthContext;

    //Context de la aplicacion
    const AppContext = useContext(appContext);
    const { limpiarApp } = AppContext;

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            usuarioAutenticado();
        }
    }, []);

    const redireccionar = () => {
        router.push('/');
        limpiarApp();
    }
    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <img src="/logo.svg" className="w-64 mb-8 md:mb-0 cursor-pointer" onClick={() => redireccionar()} />
            <div>
                { usuario ? 
                (
                    <div className="flex items-center">
                        <p className="mr-2">Hola <span className="font-bold">{usuario.nombre}</span></p>
                        <button
                            type="button"
                            className="bg-red-500 px-5 py-3 rounded text-white font-bold uppercase ml-3"
                            onClick={() => cerrarSesion()}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                ) : 

                (
                    <>
                        <Link href="/login">
                            <a className="bg-red-500 px-5 py-3 rounded text-white font-bold uppercase">Iniciar Sesión</a>
                        </Link>

                        <Link href="/crearcuenta">
                            <a className="bg-black px-5 py-3 rounded text-white font-bold uppercase ml-2">Crear Cuenta</a>
                        </Link>
                    </>
                ) 
                    
                }
                
                
            </div>
        </header>
     );
}
 
export default Header;