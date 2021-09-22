import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,

  updateDoc,
  arrayRemove,
  arrayUnion,
  query,
  where
} from "@firebase/firestore/lite";

const apiKey = import.meta.env.VITE_KEY;
const authDomain = import.meta.env.VITE_AUTHDOMAIN;
const projectId = import.meta.env.VITE_PROJECTID;
const storageBucket = import.meta.env.VITE_STORAGEBUCKET;
const messagingSenderId = import.meta.env.VITE_MESSAGINGSENDERID;
const appId = import.meta.env.VITE_APPID;
const measurementId = import.meta.env.VITE_MEASUREMENTID;

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
  measurementId,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
// console.log(db)
// console.log(app)

// Get a list of users from your database
export const getUsers = async () => {
  const usersCol = collection(db, "users");
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
};

export const getUserInfo = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();
  return docData;
};



export const getAnswers = async (uid) => {
  const docRef = doc(db, 'answers', uid);
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();
  return docData
};

export const getQuestions = async () => {
  const docRef = doc(db, 'questions', 'question_sets');
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();
  return docData;
};

export const getTodaysQuestion = async (day) => {
  const docRef = doc(db, 'questions', 'question_sets');
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();
  const todaysQuestion = docData.original_set.filter(question => question['question_id'] === day);
  return todaysQuestion[0];

export const getAnswersByUser = async uid => {
  const docRef = doc(db, 'answers', uid);
  const docSnap = await getDoc(docRef);
  const answers = docSnap.data();
  return answers.original_set;
};

export const createAnsDaysRefObj = async (uid) => {
  // check if a user is signed in
  // await get answers by user
  const answers = await getAnswersByUser(uid);

  // initialize formattedAnswers object
  const formattedAnswers = {};

  // loop through answers
  // check each answers date
  // if date of answer already exists in formattedAnswers, push answer to that date array
  // else create an array with that dates key and push answer to that array
  answers.forEach((answer) => {
    if (answer.date in formattedAnswers) {
      answer.date.push(answer);
    } else {
      formattedAnswers[answer.date] = [answer];
    }
  });

  // return formattedAnswers
  return formattedAnswers;
};

export const deleteMemory = async (answer, uid) => {
  const memoryRef = doc(db, "answers", uid);
  await updateDoc(memoryRef, {
    original_set: arrayRemove(answer),
  });
};

export const toggleMemoryForget = async (answers, answer, uid, i) => {
  const memoryRef = doc(db, "answers", uid);
  const newAnswer = { ...answer };
  newAnswer.forget ? (newAnswer.forget = false) : (newAnswer.forget = true);
  const newArray = [...answers];
  newArray.splice(i, 1, newAnswer);
  await updateDoc(memoryRef, {
    original_set: newArray,
  });
};
