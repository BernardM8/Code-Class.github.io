// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
export default class Firebase{

//constructor
constructor(){
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDICcooHUciQZvAs_dPpExVxqBhtJMojbY",
    authDomain: "codelab-database-1.firebaseapp.com",
    databaseURL: "https://codelab-database-1-default-rtdb.firebaseio.com",
    projectId: "codelab-database-1",
    storageBucket: "codelab-database-1.appspot.com",
    messagingSenderId: "573387563239",
    appId: "1:573387563239:web:161f23412c218ba50ac242",
    measurementId: "G-4XTVC35JQL"
  };

// Initialize Firebase
var app = initializeApp(firebaseConfig);
var database = getDatabase(app);
var dataRef  = ref(database, 'User1/');
var txt = "";
this.app  = app;
this.database  = database;
this.dataRef  = dataRef;
this.txt = txt;
}


//JsCodeArea.addEventListener('input', Listener);


  /*//function for getter and set value in ace editor
  UpdateCodeEditor(editor,data)
  {
    //get value from firebase
    //var txtarea = data.val().codeEditor;
    //var txtarea = get(codeEditor);
    //console.log("txtarea = "+txtarea);
    console.log("data = "+data);
    //if (txtarea == null||undefined){txtarea="";}
    
    //set value in ace editor
    editor.setValue(data);
    //editor.setValue(txtarea);
    //return txtarea;
  }*/



getCode(){ 
  var txt="";        
    txt = onValue(this.dataRef, (snapshot)=>{//listener function can't return value from event listener
      txt = snapshot.val().codeEditor;
      console.log("txt1 = "+ txt);
      return txt;
    }, {
      onlyOnce: true
    });
    console.log("txt2 = "+ txt);
    return txt;
  }
  /*var txt;
  get(child(this.dataRef)).then((snapshot) => {
    if (snapshot.exists()) {
      txt = snapshot.val().codeEditor;
      console.log("txt1 = "+ txt);
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  console.log("txt2 = "+  txt); 
  return txt;*/

  //set setText(text){this.txt = text; }
  //get getText() {return this.txt; }
/*

  getCode(){    
    var firebase=new Firebase(); 
    
     onValue(this.dataRef, (snapshot)=>{
       const data = snapshot.val().codeEditor;
       console.log("data = "+ data);       
       //this.editor.setValue(data);
       //console.log("editor = "+ this.editor);
       firebase.setText(data); 
       //txt=data;
       console.log("txt1 = "+  firebase.getText()); 
       //updateEditor(data);
     });
     console.log("txt2 = "+  firebase.getText()); 
     return firebase.getText();
  }*/


  //function listener and setter for firebase
  Listener(editor) 
  { 
    var CodeArea=editor.getSession().getValue();
    console.log("Listener = "+CodeArea);

    var jsedit = 
    {
      //codeEditor : JsCodeArea.value
      codeEditor : CodeArea
    };
    set(this.dataRef, jsedit);
  }
}