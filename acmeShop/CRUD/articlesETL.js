import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { connectDB, closeDB } from '../config/connection.js';
import { articles } from '../collection/collections.js';


const processArticles = async (db) => {
    let db;

    try {

        db = await connectDB();
        const collection = db.collection ( 'articles' );


        const records = [];
        const parser = createReadStream('./raw_Data/estudiantes.csv')
            .pipe(parse({
                columns : true,
                skip_empty_lines : true
            }));
        
        for await (const record of parser) {

            const article = {
                code : record.code,
                name : record.name,
                description : record.description,
                category : {
                    _id : record.categoryCode,
                    code : record.categoryCode,
                    name : record.categoryName,
                    description : record.categoryDescription,
                    mod : record.categoryMod
                },
                mod : record.mod


            };

            const validationsErrors = validateArticle(article);
            if ( validationsErrors.length > 0 ) {
                console.warn ( `advertencia : article ${article.id} tiene errores de validacion: `, validationsErrors );
                continue;
            }

            records.push(article);

        }

        await collection.deleteMany ({});

        if (records.length > 0) {
            const result = await collection.insertMany(records);
            console.log (`${result.insertedCount} articulos insertados `);
            return {
                collection : 'articles',
                documentLoaded : result.insertedCount
            };
        }

        return {
            collection : 'articles',
            documentLoaded : 0 
        };

    } catch (error) {
        console.error ( 'Error en el proceso ETL de articles !! : ', error );
        throw error;

    } finally {
        await closeDB();
    }
    
}

export default processArticles;

