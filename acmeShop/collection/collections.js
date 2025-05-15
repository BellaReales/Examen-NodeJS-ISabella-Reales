// CREACION DE COLECCIONES (Se hace la creacion y validacion)


//  coleccion articulos :
const articles = {
    validator: {
        $jsonSchema : {
            bsonType: "object",
            required : ["code", "name", "description", "category", "mod"],
            properties : {
                _id : {bsonType : "objectid"},
                code : {bsonType : "string"}, 
                name : {bsonType : "string"},
                description : { bsonType : "string"},
                mod : {enum : ["active", "inactive"]},
                category : {
                    bsonType : "object",
                    required : ["_id", "code", "name", "description", "mod"],
                    properties : {
                        _id : {bsonType : "string"},
                        code : {bsonType : "string"},
                        name : {bsonType : "string"},
                        description : {bsonType : "string"},
                        mod : {enum : ["active", "inactive"]}
                    }
                }
            }
        }
    }
};

//coleccion inventario :
const inventory = {
    validator : {
        $jsonSchema : {
            bsonType : "object",
            required : ["date", "quantity", "price", "movement", "whareHouses", "description", "mod"],
            properties : {
                _id : {bsonType : "objectid"}, 
                date : {bsonType : "string"},
                quantity : {bsonType : "int", minimum : 0},
                price : {bsonType : "double", minimum : 0},
                movement : { bsonType : "int",
                description : "1 para entrada, -1 para salida" },
                mod : { enum : ["active" , "inactive"]},
                whareHouses : {
                    bsonType : "object",
                    required : ["_id", "code", "name", "mod"],
                    properties: {
                        _id : {bsonType : "string"},
                        code : { bsonType : "string"},
                        name : { bsonType : "string"},
                        description : {bsonType : "string"},
                        mod : {enum : ["active", "inactive"]}
                    }
                }
            }
        }
    }
}
