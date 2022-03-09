import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase-config.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration

//Create a reference to the firebase app
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

//Create a reference to the firestore database.
const db = getFirestore(firebaseApp);

// Signup with email and password. use createUserWithEmailAndPassword async function and pass it auth reference, email and password. The useRCredential is returned. Read userCredential.user

function signupNewUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => console.log(userCredential.user, "Signed up"))
    .catch((error) => console.log(error.code, error.message));

  // {email: 'raju@gmail.com', password: 'raju eating kaju'}
}

// Sign in existing user - use signInWithEmailAndPassword function and pass auth, email and password. Then you will recieve userCredntial. Extract user information by using userCredntial.user
// If you use async method, should you use inside useEffect. But using in handleForm should be okay too. If data required initialisation useEffect, else inside any other function. Avoid infinite loop.

async function signinExistingUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("signinExistingUser", "logged in");
    console.log("signinExistingUser", userCredential.user);
    return userCredential.user.uid;
  } catch (error) {
    console.log(error.code, error.message, "signinExistingUser");
  }
}

// Sign out existing user. Return a void promise.
async function signoutUser() {
  try {
    await signOut(auth);
    return "User Signed Out";
  } catch (error) {
    console.log(error.message, "signoutUser");
  }
}

// Set auth state change. That is if user log in or logs out, something happens.
// For each page that need info about signed in user. Attach observer to gloabl auth object by onAuthStateChanged and pass auth and callback. Callback receives user. Can get user.uid.

// Get currently signed in user or run callback on login/logout. Runs when function is called, and  a callback on login/logoff. Can be initialised in useEffect once. Return undefined.
function authMonitor() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user is signed in", "authMonitor");
      console.log(user.uid, user.email, "authMonitor");
      return user.uid;
    } else {
      console.log("user is signed out", "authMonitor");
      return null;
    }
  });
}

// Get currently signed in user. Returns a property already saved with auth. No async function run.
function getUser2() {
  const user = auth.currentUser;
  if (user) {
    console.log(user.uid, "getUser2");
    return user.uid;
  } else {
    console.log("user not logged in", "getUser2");
    return null;
  }
}

// Get all docs from collection- Create a reference to collection. Get document collection(query snapshot) with getDocs function. Loop over each document snapashot and convert into JSON with .data() method.
async function readAllDocs(collectionName) {
  const dataArray = [];
  //Create a coolection refernce
  const collectionRef = collection(db, collectionName);
  //return a snapshot which is an iterable of document snapshot
  const querySnapshot = await getDocs(collectionRef);
  //Loop over and log data for each snapshot by using .data() method
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, "=>", doc.data())
    let docId = doc.id;
    dataArray.push({ ...doc.data(), docId });
  });
  // console.log("docs",querySnapshot.docs)
  return dataArray;
}

async function getSomeDocs(author) {
  let photoArray = [];
  //create a collection reference
  const collectionRef = collection(db, "photos");
  // Create a query by query function by passing collection reference and where function
  const q = query(collectionRef, where("author", "==", author));
  // use getDocs function to get list of document for this query
  try {
    const querySnapshot = await getDocs(q);
    //Lopp over list and log data for each snapshot by using .data() method
    querySnapshot.forEach((doc) => photoArray.push(doc.data()));
    console.log("photoarray", photoArray);
    return photoArray;
  } catch (error) {
    console.log(error.message);
  }
}

// Get 1 document from collection - Create a reference file with doc function; Get document with getDoc function, convert document into JSON with .data method.
async function readOneDoc(docId) {
  //Create a document reference but doesnt yet call it
  const docRef = doc(db, "users", docId);
  //return a snapshot but it is still not readable
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    //This method convert the snapshot in JSON object.
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

async function getUserDetails(userId) {
  let userArray = [];
  //create a collection reference
  const collectionRef = collection(db, "users");
  // Create a query by query function by passing collection reference and where function
  const q = query(collectionRef, where("userId", "==", userId));
  // use getDocs function to get list of document for this query
  try {
    const querySnapshot = await getDocs(q);
    //Lopp over list and log data for each snapshot by using .data() method
    querySnapshot.forEach((doc) => userArray.push(doc.data()));
    console.log("user array", userArray);
    return userArray[0];
  } catch (error) {
    console.log(error.message);
  }
}

export {
  signupNewUser,
  signinExistingUser,
  authMonitor,
  getUser2,
  signoutUser,
  readAllDocs,
  getSomeDocs,
  readOneDoc,
  getUserDetails,
};

// password: scrimbainsta123
