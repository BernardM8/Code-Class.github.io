// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand } from "aws-sdk/client-s3";
import { s3Client } from "./libs/s3Client.js"; // Helper function that creates Amazon S3 service client module.
import {path} from "path";
import {fs} from "fs";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

export const run = async (uploadParams) => {
  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};


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

// Initialize Firebase editor
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dataRef  = ref(database, 'User1/');
const JsCodeArea = document.getElementById("editor");

// Create ACE editor
  const aceEditor = ace.edit("editor"); 
  aceEditor.setTheme("ace/theme/monokai");
  const session = aceEditor.getSession();

// Create ACE editor 2
const aceEditor2 = ace.edit("editor2"); 
aceEditor2.setTheme("ace/theme/monokai");
const session2 = aceEditor.getSession();
aceEditor2.session.setMode("ace/mode/c_cpp");
const JsCodeArea2 = document.getElementById("editor2");



//Change Language select section
window.changeLanguage = function changeLanguage(){
  let language = $("#languages").val();
  if(language == 'c++' ){aceEditor.session.setMode("ace/mode/c_cpp");}
  else if(language == 'java' ){aceEditor.session.setMode("ace/mode/java");}
  else if(language == 'python' ){aceEditor.session.setMode("ace/mode/python");}
  else if(language == 'node' ){aceEditor.session.setMode("ace/mode/javascript");}
}

//Assign code problem select section
window.assignProblem = function assignProblem(){
  let mode = $("#assign").val();
  if(mode == 'timed' ){ 
    console.log("timed triggered");
    var CodeArea=aceEditor.getSession().getValue();
    //need to add setter to firebase
    aceEditor2.getSession().setValue(CodeArea, 1);
  }
  else if(mode == 'practice' ){
    console.log("practice triggered");
    var CodeArea=aceEditor.getSession().getValue();
    //need to add setter to firebase
    aceEditor2.getSession().setValue(CodeArea, 1);
  } 
}

//function getter from firbase and setter into ace editor
function updateEditor(data)
	{
    var cursorPosition = aceEditor.getCursorPosition();
    var txtarea = data.val().codeEditor;
    console.log("txtarea = "+txtarea);
    aceEditor.getSession().setValue(txtarea, 1); //set value in ace editor
    aceEditor.moveCursorToPosition(cursorPosition);
	}

//function getter from ace editor and setter for firebase
function listenSetFirebase(event) 
{ 
  console.log("check event.key: "+event.key);
  var CodeArea=aceEditor.getSession().getValue();
  console.log("Listener = "+CodeArea);
  var jsedit = 
  {
    codeEditor : CodeArea
  };
  set(dataRef, jsedit);
}

//----Main-----
changeLanguage();
onValue(dataRef, updateEditor); //update editor from firebase
JsCodeArea.addEventListener('keyup', listenSetFirebase); //set firebase from key event





// Run button to compile code       
window.executeCode = function executeCode(){  
  var CodeArea=aceEditor.getSession().getValue();
  console.log("Output =" +CodeArea);

  //const file = "OBJECT_PATH_AND_NAME"; // Path to and name of object. For example '../myFiles/index.js'.
  const fileStream = fs.createReadStream(CodeArea);

  // Set the parameters
  const uploadParams = {
    Bucket: "primaryinputsortbucket",
    // Add the required 'Key' parameter using the 'path' module.
    //Key: path.basename(file),
    // Add the required 'Body' parameter
    Body: fileStream,
  };

  run(uploadParams);
  document.getElementById("output").innerHTML = CodeArea
  
}