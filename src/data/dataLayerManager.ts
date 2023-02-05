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
import { completion } from "yargs";

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

export async function generateAlias(surveyID: string) {
  const db = getFirestore();
  var aliasCreated = false;
  var tries = 0;
  // loops until free alias is found
  while (!aliasCreated && tries < 100) {
    let alias = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);
    const aliasRef = doc(db, "responses", surveyID, "aliases", alias);
    let docSnap = await getDoc(aliasRef);
    if (!docSnap.exists()) {
      let newID = uuidv4();
      setDoc(aliasRef, { responseID: newID, childResponses: [] });
      aliasCreated = true;
      return { alias: alias, responseID: newID };
    }
    tries++;
  }
  console.log("Failed to create alias");
  return false;
}

export async function loadResponse(surveyID: string, alias: string) {
  const db = getFirestore();
  const aliasRef = doc(db, "responses", surveyID, "aliases", alias);
  let docSnap = await getDoc(aliasRef);
  if (docSnap.exists()) {
    let responseID = docSnap.data().responseID;
    const responseRef = doc(
      db,
      "responses",
      surveyID,
      "surveyResults",
      responseID
    );
    let responseSnap = await getDoc(responseRef);
    if (responseSnap.exists()) {
      return responseSnap.data();
    } else {
      console.log("Response does not exist");
      return false;
    }
  }
}

export async function addHash(surveyID: string, hash: string) {
  const db = getFirestore();
  const hashRef = doc(db, "responses", surveyID, "incentives", hash);
  try {
    let docSnap = await getDoc(hashRef);
    if (!docSnap.exists()) {
      setDoc(hashRef, {
        isComplete: false,
        completionClaimed: false,
        successfulReferrals: 0,
        claimedReferrals: 0,
      });
      return false;
    } else {
      console.log("Hash already exists");
      return docSnap.data();
    }
  } catch (error) {
    console.log(error);
  }
}

export async function loadIncentiveInfo(surveyID: string, hash: string) {
  const db = getFirestore();
  const hashRef = doc(db, "responses", surveyID, "incentives", hash);
  try {
    let docSnap = await getDoc(hashRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("Hash does not exist");
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateIncentiveInfo(
  surveyID: string,
  hash: string,
  data: any
) {
  const db = getFirestore();
  const hashRef = doc(db, "responses", surveyID, "incentives", hash);
  try {
    let docSnap = await getDoc(hashRef);
    if (docSnap.exists()) {
      let currentData = docSnap.data();
      // checks to prevent updates that would allow a user to claim more than allowed incentives
      if (
        data.isComplete &&
        currentData.claimedReferrals < data.claimedReferrals &&
        currentData.successfulReferrals < data.successfulReferrals &&
        !(
          currentData.completionClaimed === true &&
          data.completionClaimed === false
        )
      ) {
        setDoc(hashRef, data);
      }
      return true;
    } else {
      console.log("Hash does not exist");
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function writeSurveyResponse(
  surveyID: string,
  alias: string,
  response: any
) {
  const db = getFirestore();
  const aliasRef = doc(db, "responses", surveyID, "aliases", alias);
  let docSnap = await getDoc(aliasRef);
  console.log(
    "Writing response",
    response,
    "to alias",
    alias,
    "for survey",
    surveyID,
    ""
  );
  if (docSnap.exists()) {
    console.log("Alias exists, writing response");
    let responseID = docSnap.data().responseID;
    const responseRef = doc(
      db,
      "responses",
      surveyID,
      "surveyResults",
      responseID
    );
    setDoc(responseRef, response);
    if (response.completed) {
      console.log("Survey completed, deleting alias");
      // delete the alias after the response is completed so it can't be updated again
      deleteDoc(aliasRef);
    }
  } else {
    console.log("Alias does not exist");
    return false;
  }
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
  console.log(`Saving survey ${surveyID} for user ${userID}`);
  try {
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().admins.includes(userID)) {
        console.log("User is admin, updating survey");
        setDoc(docRef, surveyData);
      } else {
        console.log("Unauthorized access to survey");
        return false;
      }
    } else {
      addSurveyToUser(userID, surveyID);
      setDoc(docRef, surveyData);
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function addSurveyToUser(userID: string, surveyID: string) {
  const db = getFirestore();
  const userRef = doc(db, "users", userID);
  try {
    let docSnap = await getDoc(userRef);
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
  } catch (error) {
    console.log(error);
    return false;
  }
}
