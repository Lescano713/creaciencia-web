// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "TU_API_KEY",
//   authDomain: "TU_AUTH_DOMAIN",
//   projectId: "creaciencia-a0c51",
//   storageBucket: "creaciencia-a0c51.firebasestorage.app",
//   messagingSenderId: "269242009191",
//   appId: "1:269242009191:web:735fecf99bc6de07d636c2"
// };

// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);
// export const storage = getStorage(app);
// export const auth = getAuth(app);




import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqkFATaJrXPXv8mitgdSQ9-sxKwa-rbe4",
  authDomain: "creaciencia-a0c51.firebaseapp.com",
  projectId: "creaciencia-a0c51",
  storageBucket: "creaciencia-a0c51.firebasestorage.app",
  messagingSenderId: "269242009191",
  appId: "1:269242009191:web:735fecf99bc6de07d636c2",
  measurementId: "G-TZXMFBX2V4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
