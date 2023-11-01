import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCgEm4OCdBLq5OmDNUf2xTbzvpCKY1Zhz0",
    authDomain: "gatepass-bc959.firebaseapp.com",
    projectId: "gatepass-bc959",
    storageBucket: "gatepass-bc959.appspot.com",
    messagingSenderId: "613667425450", 
    appId: "1:613667425450:web:1fcd152a12f0aed6d2d4d3"
  };
 

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  export { auth };
  

  
