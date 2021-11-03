const mongoose=require('mongoose');

//IN MODELS WE CONFIGURE ALL THE DATABASES THAT WE WANT (E.G. FRIENDS)
//La BASE DE DATOS es un contenedor de datos con esquema. Cada bd tiene su propio esquema
//El SCHEME (esquema) dice qué tablas hay en la base de datos, qué columnas o campos tienen, con qué tipo de datos, cómo están relacionadas las tablas, etc.)
//You can use a schema to require a specific set of fields, configure the content of a field, or to validate changes to a document based on its beginning and ending states.
//EN MONGODB: BD=BD, COLLECTION=TABLA, DOCUMENT=FILA O REGISTRO EN LA TABLA (INSTANCE OF A MODEL), FIELDS(CAMPOS)=COLUMNAS EN LA TABLA
//En este archivo Friends.js, donde configuramos la base de datos, hacemos lo siguiente:

//1-WE DEFINE OUR SCHEMA (give our schema a name -FriendSchema-, establish fields, describe the fields, establish states)

const FriendSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:false, 
    }
});

//2-WE CREATE A MODEL 
//To use our schema definition (1), we need to convert our FriendSchema into a Model we can work with. 
//A model defines a programming interface for interacting with the database (read, insert, update, etc).
//To convert the schema into a model, we pass our schema into mongoose.model(modelName, schema):
const FriendModel = mongoose.model('friends', FriendSchema)

module.exports=FriendModel

