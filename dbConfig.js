db.createCollection("inventory", {
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
})

db.createCollection("articles" , {
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
                        _id : {bsonType : "objectid"},
                        code : {bsonType : "string"},
                        name : {bsonType : "string"},
                        description : {bsonType : "string"},
                        mod : {enum : ["active", "inactive"]}
                    }
                }
            }
        }
    }
})

db.createRole ({
    role : "inventoryAdmin",
    privileges : [
        { resource : { db : "acme" , collection : ""}, 
        actions : ["find", "insert", "update", "remove", "createcollection", "createIndex"]}
    ],

    roles : []
    
})

db.createRole ({
    role : "inventoryAux",
    privileges : [
        {resource : { db : "acme", collection : ""},
        actions : ["find"]}
    ],

    roles : []

})

db.createUser ({
    user : "assistant",
    pwd : "Assist123",
    roles : [{ role : "inventoryAux" , db : "acme "}]
})



db.movement.agreggate ([
    {
        $match : {
            date : { $gte : "01/01/25" , $lte : "31/01/25" }
        }
    },
    {
        $project : {
            fecha : "$date",
            tipoMovimiento : {
                $cond : {if : {$eq : ["$movement", 1]},
            then : "entrada", else : "salida"}
            },
            categoriaCodigo : "$category.code",
            categoriaNombre : "$category.name",
            productCodigo : "$product.code",
            productNombre : "$product.name",
            precio : "$price",
            cantidad : "$quantity",
            totalMovimiento : { "$multity" : ["$price", "$quantity"]}
        }
    }
])

db.movement.agreggate ([
    {
        $group : {
            _id : "$category.name",
            articulos : {$addToset : "$product.name"}
        }
    }
])

db.movement.agreggate ([
    {
        $group : {
            _id : {
                producto : "$product.name",
                bodega : "$wharehouses.name"
            },
            stock : {
                $sum : {
                    $cond : {
                        if : {$eq : ["$movement" , 1]},
                        then : "$quantity",
                        else : { $multiply : ["$quantity" , -1]}
                    }
                }
            }
        }
    }
])

db.movement.aggregate([
    {
      $match: { movement: 0 }
    },
    {
      $group: {
        _id: "$category.name",
        TotalSalidas: { $sum: "$quantity" }
      }
    },
    {
      $sort: { TotalSalidas: -1 }
    },
    {
      $limit: 1
    }
  ])




