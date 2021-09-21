// import { writable } from 'svelte/store';
// import { getUserInfo } from '../lib/firebase';
// import { initializeApp } from '@firebase/app';
// import { getFirestore } from '@firebase/firestore/lite';
// const apiKey = import.meta.env.VITE_KEY;
// const authDomain = import.meta.env.VITE_AUTHDOMAIN;
// const projectId = import.meta.env.VITE_PROJECTID;
// const storageBucket = import.meta.env.VITE_STORAGEBUCKET;
// const messagingSenderId = import.meta.env.VITE_MESSAGINGSENDERID;
// const appId = import.meta.env.VITE_APPID;
// const measurementId = import.meta.env.VITE_MEASUREMENTID;

// const firebaseConfig = {
//   apiKey,
//   authDomain,
//   projectId,
//   storageBucket,
//   messagingSenderId,
//   appId,
//   measurementId,
// };

// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// import { getAuth } from 'firebase/auth';

// export const answers = writable([]);

// export const formatUsersAnswers = async () => {
//   // get current user
//   const auth = getAuth();

//   // get current users info
//   const userData = await getUserInfo(auth.currentUser.uid);

//   // get current users answers
//   const userAnswers = userData.answers;
//   return userAnswers;

//   // format users answers into object containing arrays of answers per day

//   // set writeable answers to above formatted object
// };

// export default answers;
