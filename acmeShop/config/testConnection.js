//  TESTCONNECTION : se hace el test de la conexion (connection.js)
//  importacion :

import { connectDB, closeDB } from './connection.js';
import dotenv from 'dotenv';


//  se cargan las variables de entorno :
dotenv.config ();

const testConnection = async () => {

    try {

        console.log ('Verificando configuracion . . .') ;
        console.log ('MONGODB_URI esta definida !! ', !!process.env.MONGODB_URI );

        //  se espera a que se cumpla la promesa (la conexion) :
        console.log ('\n Intentando conectar con MongoDB localHost . . .');
        const db = await connectDB();

        //  respuesta de conexion :
        const collections = await db.listCollections().toArray();

        console.log (' Conexion Exitosa a mongoDB Local Host !! ' )
        console.log (' Colecciones disponibles : ', collections.map (c => c.name));

        //  en caso de que se cumpla de manera correcta la conexion se cierra la conexion :

        await closeDB();

        // manejo de posibles errores : 
    
    } catch (error) {

        console.log (' Error al conectar con mongoDB : ', error);

        process.exit(1);

    }


    };

// Se ejecuta el test :
testConnection();



