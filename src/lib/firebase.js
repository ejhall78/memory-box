import { initializeApp } from '@firebase/app';
import { getFirestore, collection, getDocs } from '@firebase/firestore/lite';
const apiKey = import.meta.env.VITE_KEY;
const authDomain = import.meta.env.VITE_AUTHDOMAIN
const projectId = import.meta.env.VITE_PROJECTID
const storageBucket = import.meta.env.VITE_STORAGEBUCKET
const messagingSenderId = import.meta.env.VITE_MESSAGINGSENDERID
const appId = import.meta.env.VITE_APPID
const measurementId = import.meta.env.VITE_MEASUREMENTID

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';    

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// console.log(db)
// console.log(app)

// Get a list of users from your database
export const getUsers = async () => {
  const usersCol = collection(db, 'users');
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map(doc => doc.data());
  return userList;
}