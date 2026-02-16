import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Para los datos de los productos
import { getStorage } from "firebase/storage";     // Para subir las fotos

const firebaseConfig = {
  apiKey: "AIzaSyCqkFATaJrXPXv8mitgdSQ9-sxKwa-rbe4",
  authDomain: "creaciencia-a0c51.firebaseapp.com",
  projectId: "creaciencia-a0c51",
  storageBucket: "creaciencia-a0c51.firebasestorage.app",
  messagingSenderId: "269242009191",
  appId: "1:269242009191:web:735fecf99bc6de07d636c2",
  measurementId: "G-TZXMFBX2V4"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos las herramientas para usarlas en tus páginas (Home, Admin, etc.)
export const db = getFirestore(app);
export const storage = getStorage(app);