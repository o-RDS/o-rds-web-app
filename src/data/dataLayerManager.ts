import { initializeApp } from "firebase/app"
import { getAuth, signInAnonymously } from "firebase/auth";
import {
    getFirestore, doc, getDoc
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB6d-taZfAJEpjzl46igYQjx0l-l2Xp92E",
  authDomain: "o-rds-edcc9.firebaseapp.com",
  projectId: "o-rds-edcc9",
  storageBucket: "o-rds-edcc9.appspot.com",
  messagingSenderId: "467120561765",
  appId: "1:467120561765:web:e08ecab4e2e6998740708c"
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

export function writeSurveyResponse() {
    return (1);
}

export async function retrieveSurveyData(id: string) {
    const db = getFirestore();
    const docRef = doc(db, "surveys", id);
    try {
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("Document does not exist")
        }
    
    } catch(error) {
        console.log(error)
    }
}

export function createSurvey() {
     
}