const express=require('express');
const app=express();
const cors=require("cors");
const mongoose = require('mongoose')
const FriendModel=require("./models/Friends");

//4-TO ACCEPT AN OBJECT AS JSON (COMES FROM CLIENT/APP.JS BULLET 7-) WE NEED A MIDDLEWARE (APP.USE) 
//AND CORS, WHICH ALLOWS US TO CONNECT FRONT AND BACKEND

app.use(cors());
app.use(express.json());

//1-SET UP A SPACE TO CREATE THE CONNECTION WITH DB
//Poner nombre de la base de datos antes de ? y al final ,{useNewUrlParser:true} porque...
    //"The underlying MongoDB driver has deprecated their current connection string parser. 
    //Because this is a major change, they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser. 
    //You should set useNewUrlParser: true unless that prevents you from connecting."
//Para comprobar que estamos conectados con la base de datos ok poner node index.js

mongoose.connect("mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
{useNewUrlParser:true}
);

//2-CREATE THE ROUTES TO BE ABLE TO REQUEST(TO THE DB) OR RESPONSE(TO DE DB) INFO 
//2A. CREATE/ADD(POST) A FRIEND
        //HEY! The software has to wait until the document(registro) is create before saving it. That is why you use "async" 

app.post("/addfriend", async (req, res) => {
    //5-TO RECEIVE THE DATA FROM THE BODY/OBJECT FROM THE FRONTEND:
    const name=req.body.name
    const age=req.body.age


    const friend = new FriendModel ({name:name, age:age});
    await friend.save();
    res.send(friend)
});

//Para ver si el registro de friend con datos Jessica, 38 fue insertado en la bd:
    // a) se carga http://localhost:3001/insert y b) se refresca la bd en MondoDBCompass

//2B. READ / DISPLAY (GET) DATA. 
        //using "find" to search for specific info
        //with Express, when you are inside localhost:3000 or 3001, which es where our server is running,
        //when you say res.send(), which is a GET request, the message you put inside of it will appear in that address (https://localhost:3001/insert or read)
        //That means that if we are sending the error, it will appear there
        //and if we area getting people from the db, it will also appear there

app.get("/read", async (req, res) => {
    FriendModel.find({}, (err,result) => {
        if(err) {
            res.send(err);
        }else{
            res.send(result); //WITH THIS WE SEND THE FOUND INFO TO THE FRONTEND
            }
    });
});


//13-UPDATE (PUT) DATA
app.put('/update', async(req, res)=>{
    const newAge=req.body.newAge
    const id=req.body.id

    try{
        await FriendModel.findById(id,(error,friendToUpdate)=>{ //13A-FIND THE ELEMENT TO BE CHANGED
            friendToUpdate.age=Number(newAge);  //13B-SET A NEW VALUE FOR THE ELEMENT
            friendToUpdate.save(); //13C-SAVE THE NEW INFO/DATA
        })
    } catch(err){
        console.log(err);
    }
    res.send('Updated');
});

//15-DELETE(DELETE) DATA (USE :ID TO INDICATE ITEMS TO BE DELETED). THEN GO TO FRONTEND.
app.delete('/delete/:id', async(req, res)=>{
    const id=req.params.id;
    await FriendModel.findByIdAndRemove(id).exec()
    res.send("Item deleted");
});


app.listen(3001,() => {
    console.log("You are connected"); 
});



//3-TO SET UP OUR DATABASE(S) WE CREATE MODEL(S) 