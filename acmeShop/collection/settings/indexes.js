//   creacion de Inidices : 

export const createIndexes = async (db) => {
    
    //   Índices para articles :
    

    // ( 1 ) buscar por codigo único  :
    await db.collection(' articles ').createIndex({ code : 1 }, { unique : true, name : " codigo " });
    
    // ( 2 ) buscar por estado y categoria :
    await db.collection(' articles ').createIndex({ "category.code" : 1 }, { mod : 1 }, { unique : true });
   
   
    //   Índices para inventory :


    // ( 1 ) buscar por fecha  :
    await db.collection(' inventory ').createIndex ({ date : -1, "whareHouses.code": 1 , name : " codigo bodegas "});
    
    // ( 2 ) buscar por bodega :
    await db.collection(' inventory ').createIndex({ movement : 1 , mod : 1 , name : " movimientos " });
    

}; 