import processArticles from './articlesETL.js';
import processInventory from './inventoryETL.js';
import { connectDB, closeDB } from '../../DB/connection.js';



const runAllETL = async () => {
    console.log('Iniciando proceso ETL general...');
    let db;
    
    try {
        // Conectar a la base de datos
        db = await connectDB();

        
        // Ejecutar los procesos en secuencia
        console.log('\nProcesando profesores...');
        await processArticles();
        
        console.log('\nProcesando cursos...');
        await processInventory();
        
        console.log('\n¡Proceso ETL general completado exitosamente!');

    } catch (error) {

        console.error('Error en el proceso ETL general:', error);
        process.exit(1);

    } finally {
        
        // Cerrar la conexión a la base de datos
        await closeDB();
    }
};

// Ejecutar el proceso ETL general
runAllETL(); 