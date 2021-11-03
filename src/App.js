 
import './App.css';
import {useState, useEffect} from "react";
import Axios from 'axios';


function App() {

//TO SEND INFO TO THE DB USE STATES:
  //1-YOU CREATE THE VARIABLE ("name") AND THE FUNCTION TO CHANGE THE VARIABLE ("useState")
    //AND YOU PUT THE INITIAL STATE IN (e.g "", 0, [])
const [name, setName]=useState("");
const [age, setAge]=useState(0);

{/*4-YOU CREATE A FUNCTION TO ALERT ON THE DATA IN OUR INPUT*/}
{/*5-YOU USE AXIOS TO PLACE ANY REQUEST, E.G. SEND (POST) THE DATA TO THE BACKEND. YARN ADD AXIOS*/}
{/*6-TO SEND THE DATA OF THE NEW FRIEND TO THE BACKEND YOU HAVE TO PASS AN OBJECT THAT CONTAINS THE DATA {}*/}
  {/*THIS OBJECT {} WILL BE THE BODY OF YOUR REQUEST TO THE BACKEND*/}
  {/*THIS BODY CAN CONTAIN ANY PROPERTIES AND CONTENT WE WANT (E.G VARIABLE AND VALUE FOR NAME, AGE, ETC. */}
  {/*IN A POST REQUEST YOU WANT TO SEE THE RESULT OF THE REQUEST: DID IT WORK OR NOT (CATCH ERRORS)?*/}
{/*7-TO RECEIVE THIS DATA OBJECT FROM OUR BACKEND AS A JSON, WE GO TO BACKEND/INDEX.JS   */}

//9-TO DISPLAY A LIST IN OUR FRONT END WE CREATE A VARIABLE LISTOFFRIENDS:

const [listOfFriends,setListOfFriends]=useState([]); 

const addFriend=()=>{
  Axios.post('http://localhost:3001/addfriend', {
    name:name,
    age:age,
      //}).then(()=>{
       // alert('yey, it worked');
      //}).catch(()=>{
        //alert('aww, it did not work'); 
  
  //11-DESTRUCTURING: PARA EVITAR ESTAR REFRESCANDO PARA QUE APAREZCAN LOS CAMBIOS, Y QUE LA INFO DE UN NUEVO AMIGO ME APAREZCA EN LA LISTA  JUSTO CUANDO INGRESO LOS DATOS EN FORMULARIO, 
      //ORDENO:  SETLISTOFFRIENDS([...LISTAR TODO LO QUE HAYA EN LA BD, {AGREGAR UN OBJETO NUEVO CON SUS CAMPOS RESPECTIVOS}])
    }).then((response)=> {
      setListOfFriends([...listOfFriends,
        {_id:response.data.id,name:name,age:age}])
    })
  //alert(name+age);
};

//14-CREATE UPDATE FUNCTION

  const updateFriend =(id)=>{
    const newAge=prompt("Enter new age: ");

    Axios.put('http://localhost:3001/update',{newAge:newAge, id:id}).then(()=>{
      setListOfFriends(listOfFriends.map((val)=>{
        return val._id==id 
        ? {_id:id, name:val.name, age:newAge}
        : val;
      })) 
    }) 
  };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        


//15-CREATE DELETE FUNCTION (GO TO INDEX.JS ON SERVER)

const deleteFriend =(id)=>{ 
  Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
    setListOfFriends(listOfFriends.filter((val)=>{
      return val._id!=id; 
    })
    );
  });
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       


  //8-TO DISPLAY DATA (GET) FROM THE BACKEND, USE USEEFFECT
      //THIS IS A FUNCTION THAT WILL BE CALLED WHEN OUR PROJECT RENDERS
      //WHENEVER I RENDER MY PAGE I WANT TO SEE THE DATA DISPLAYED
      //YOU PUT AN AXIOS GET REQUEST WITHIN THE USEEFFECT FUNCTION TO RECEIVE THE DATA

  useEffect(()=>{
    Axios.get('http://localhost:3001/read')
      .then((response)=>{
        setListOfFriends(response.data);
        {/*12-UPDATE INFO WITH PROMPT TO VIEW AN ALERT AND AN INPUT TO ENTER INFO */}
        {/*13-GO TO BACKEND, OPEN ROUTE TO UPDATE INFO*/}
        //const update=prompt("Enter val: ");
        {/*console.log(update);*/}
      })
      .catch(()=>{
        console.log('ERR'); 
    }); 
  },[]); //USE [] TO CALL THIS FUNCTION ONLY ONCE, WHEN IT RENDERS
  

  //2-YOU CREATE THE INPUTS FOR SENDING INFO:
  return (
    <div className="App">
      <div className="inputs">
          <input 
            type="text" 
            placeholder="Friend name..."
            onChange={(event)=>{
              setName(event.target.value);
            }} //TO CAPTURE THE INFO IN INPUT BOXES AND STORE IT IN A VARIABLE USE ONCHANGE. 
                                    //WHENEVER STHG HAPPENS IN THE INPUT BOX THE FUNCTION ONCHANGE WILL BE TRIGGERED
                                    //WE GRAB THE INFO IN INPUT AS AN "EVENT" AND USE IT AS AN ARGUMENT TO A FUNCTION {setName}
                                    //EVERY TIME WE WRITE SOMETHING IN INPUT, IT WILL CHANGE THE INFO IN THE VARIABLE
          
          />
          <input 
            type="number" 
            placeholder="Friend age..."
            onChange={(event)=>{
              setAge(event.target.value);
            }} 
          /> 

      {/*3-YOU CREATE A BUTTON TO SEND THE INFO TO YOUR BACKEND, AND CALL THE FUNCION TO ADD A FRIEND (CREAR REGISTRO NUEVO)*/}
          <button onClick={addFriend}>Add Friend</button>
      </div>

      {/*10-YOU CREATE A TABLE TO DISPLAY THE INFO IN OWR SCREEN*/}
        {/*TO DO SO I MAP THROUGH ALL THE ELEMENTS IN THE LIST*/}
        {/*YOU GRAB THE VALUE -VAL ITERATES THROUGH EACH ELEMENT IN THE LIST-, AND ITERATE THROUGH ALL THE LIST TO RETURN VALUE ON SCREEN*/}
      
      <div className="listOfFriends">
        {listOfFriends.map((val)=>{
          return (
            <div className="friendContainer">
              <div className="friend">
                {""}
                <h3> Name: {val.name} </h3>
                <h3> Age: {val.age} </h3>
              </div>

              {/*PARA ADICIONAR LOS BOTONES DE EDITAR Y BORRAR: */}
              {/*14: PASS A FUNCTION TO THE BUTTON UPDATE */}
              <button onClick={()=>{updateFriend(val._id)}}>Update</button> 
              <button id="removeBtn" onClick={()=>{deleteFriend(val._id)}}>X</button>
           
            </div> 
          );
        })}  
      </div>


    </div>
  );
}

export default App;
