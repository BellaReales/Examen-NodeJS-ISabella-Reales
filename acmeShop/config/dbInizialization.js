import { connectDB, closeDB } from './connection.js';



async function inicializarDB() {
    let db;
    try {
        db = await connectDB();
        
        //   crear colecciones si no existen :
        const collections = ['articles', 'inventory'];
        for (const collectionName of collections) {
            await db.createCollection(collectionName);
            console.log(`Colección ${collectionName} creada exitosamente`);
        }

        //   crear índices :
        await crearIndices(db);
        
        //   limpiar colecciones existentes :
        await limpiarColecciones(db);
        
        //   cargar datos desde CSV :
        await cargarDatosDesdeCSV(db, 'articles.csv', 'articles');
        await cargarDatosDesdeCSV(db, 'inventory.csv', 'inventory');
        
        console.log('Base de datos inicializada correctamente');
    } catch (error) {
        console.error('Error durante la inicialización de la base de datos:', error);
        throw error;
    } finally {
        await closeDB();
    }
}


//   ejecutar la inicialización : 
inicializarDB().catch(console.error); 