import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const apiKEY = process.env.FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: apiKEY,
  authDomain: "pokemon-d9c4f.firebaseapp.com",
  projectId: "pokemon-d9c4f",
  storageBucket: "pokemon-d9c4f.appspot.com",
  messagingSenderId: "815058120014",
  appId: "1:815058120014:web:6b1d9e52c283bc7d37421f",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
