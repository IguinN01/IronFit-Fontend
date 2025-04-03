import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHv9SHIWfQO5bv8DAWNt6wbVEWkKflgFI",
  authDomain: "academia-iron.firebaseapp.com",
  projectId: "academia-iron",
  storageBucket: "academia-iron.appspot.com", 
  messagingSenderId: "382899108881",
  appId: "1:382899108881:web:3d99dba1af48cd413245b0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };