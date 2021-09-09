import firebase from "firebase";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase App

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const usersRef = firebase
  .firestore()
  .collection('Users');

export const auth = firebase.auth();

export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password)
    .then(function(userCredential) {
    usersRef
      .doc(`${userCredential.user.uid}`)
      .set({
        uid: userCredential.user.uid
      });
    });
    
export const logout = () => auth.signOut();

export const passwordReset = (email) => {
  console.log(email);
  return auth.sendPasswordResetEmail(email);
};

export const verifyEmail = (verifyEmail) => auth.verifyEmail(email);

export const user = firebase.auth().currentUser;

export const email = firebase.auth().email;

export const uid = firebase.auth().uid;

const storage = firebase.storage();

export { storage };