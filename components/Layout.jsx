import React, { Fragment } from 'react'
import Head from 'next/head';
import Header from './Header';


const Layout = (props) => {
    return ( 
        <Fragment>

            <Head>
                <title>ReactSend</title>
                <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
            </Head>

            

            <div className="bg-gray-100 min-h-screen">

                <div className="container mx-auto">
                    <Header />
                    <main className="mt-20">
                        {props.children}
                    </main>
                    
                </div>

            </div>
            
        </Fragment>
     );
}
 
export default Layout;