import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyB6d-taZfAJEpjzl46igYQjx0l-l2Xp92E",
  authDomain: "o-rds-edcc9.firebaseapp.com",
  projectId: "o-rds-edcc9",
  storageBucket: "o-rds-edcc9.appspot.com",
  messagingSenderId: "467120561765",
  appId: "1:467120561765:web:e08ecab4e2e6998740708c",
};
// Initialize Firebase
initializeApp(firebaseConfig);

export function signIn() {
  const auth = getAuth();
  signInAnonymously(auth)
    .then(() => {
      console.log("signed in");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

export function generateAlias(surveyID: string) {
  const db = getFirestore();
  let aliasCreated = false;
  // loops until free alias is found
  while (!aliasCreated) {
    let alias = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);
    const aliasRef = doc(db, "surveys", surveyID, "aliases", alias);
    getDoc(aliasRef).then((docSnap) => {
      if (!docSnap.exists()) {
        setDoc(aliasRef, { responseID: uuidv4() });
        aliasCreated = true;
        return alias;
      }
    });
  }
}

export function writeSurveyResponse(
  surveyID: string,
  alias: string,
  response: any
) {
  const db = getFirestore();
  const aliasRef = doc(db, "surveys", surveyID, "aliases", alias);
  getDoc(aliasRef).then((docSnap) => {
    if (docSnap.exists()) {
      let responseID = docSnap.data().responseID;
      const responseRef = doc(db, "surveys", surveyID, "responses", responseID);
      setDoc(responseRef, response);
      if (response.completed) {
        // delete the alias after the response is completed so it can't be updated again
        deleteDoc(aliasRef);
      }
    } else {
      console.log("Alias does not exist");
      return false;
    }
  });
  return true;
}

export async function retrieveSurveyConfig(id: string) {
  const db = getFirestore();
  const docRef = doc(db, "surveys", id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("Document does not exist");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function saveSurveyConfig(
  userID: string,
  surveyID: string,
  surveyData: any
) {
  const db = getFirestore();
  const docRef = doc(db, "surveys", surveyID);
  const userRef = doc(db, "users", userID);
  console.log(`Saving survey ${surveyID} for user ${userID}`);
  try {
    getDoc(docRef).then((snap) => {
      if (snap.exists()) {
        console.log("Document exists");
        getDoc(userRef).then((docSnap) => {
          console.log(docSnap.data());
          if (docSnap.exists()) {
            let data = docSnap.data();
            console.log(data.surveys, surveyID);
            if (data.surveys.includes(surveyID)) {
              setDoc(docRef, surveyData);
            } else {
              console.log("Unauthorized access to survey");
              return false;
            }
          } else {
            console.log("User does not exist");
            return false;
          }
        });
      } else {
        addSurveyToUser(userID, surveyID);
        setDoc(docRef, surveyData);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export async function addSurveyToUser(userID: string, surveyID: string) {
  const db = getFirestore();
  const userRef = doc(db, "users", userID);
  try {
    getDoc(userRef).then((docSnap) => {
      console.log(docSnap.data());
      if (docSnap.exists()) {
        let newData = docSnap.data();
        newData.surveys.push(surveyID);
        setDoc(userRef, newData);
        return true;
      } else {
        console.log("Document does not exist");
        return false;
      }
    });
  } catch (error) {
    console.log(error);
    return false;
  }
}
