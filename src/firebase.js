import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDHv9SHIWfQO5bv8DAWNt6wbVEWkKflgFI",
  authDomain: "academia-iron.firebaseapp.com",
  projectId: "academia-iron",
  storageBucket: "academia-iron.firebasestorage.app",
  messagingSenderId: "382899108881",
  appId: "1:382899108881:web:3d99dba1af48cd413245b0"
};

const app = initializeApp(firebaseConfig);
export default app;