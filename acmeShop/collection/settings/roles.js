//  CREACION DE ROLES 

export const roles = {

    //   creacion de rol admin  : 
    admin : {
        description : " Aministrador del sistema ",
        privileges : [
            {
                resource : { db : "acmeShop", collection : ("articles" , "inventory")},
                actions : [ "find", "insert", "update", "delete", "createIndex", "dropIndex" ]

            }
        ]

    },


    // creacion de rol usuario  :
    user : {
        description : " Usuario general ",
        privileges : [
            {

                resource : { db : "acmeShop", collection : ("articles" , "inventory")},
                privileges : [ "find" ]

            }
        ]
    }
};


// comando de creacion  ( roles ):

export const createRoles = async (db) => {

    //  admin : 
    await db.command ({
        createRole : "admin", 

        // tendra acceso a todas las acciones de las colecciones (control general) : 
        privileges : [
            {
                resource : { db : "acmeShop", collection : ("articles" , "inventory")},
                actions : [ "find", "insert", "update", "delete", "createIndex", "dropIndex" ]

            }
        ],

        roles : []
    })
}



export const createUsers = async (db) => {

    //  user : 
    await db.command ({
        createUser : "user", 

        // tendra unicamente la accion de poder hacer busquedas y lecturas : 
        privileges : [
            {

                resource : { db : "acmeShop", collection : ("articles" , "inventory")},
                privileges : [ "find" ]

            }
        ]
    })
}