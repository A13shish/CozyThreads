import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAXRvhocfMS4ro6DEFQtElG9_-Owio2z4M",
  authDomain: "cozythreads-993bd.firebaseapp.com",
  projectId: "cozythreads-993bd",
  storageBucket: "cozythreads-993bd.appspot.com",
  messagingSenderId: "33669084475",
  appId: "1:33669084475:web:5724f212508b5b82f31400",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

// Send Email Link for Authentication
const sendEmailLink = async (email) => {
  const actionCodeSettings = {
    url: "http://localhost:5173/verify-email", // Change this to your actual URL
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
    alert("Check your email for the sign-in link.");
  } catch (error) {
    console.error("Error sending email link:", error);
  }
};

// Verify Email Link
const verifyEmailLink = async () => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = window.prompt("Please provide your email for confirmation");
    }

    try {
      await signInWithEmailLink(auth, email, window.location.href);
      window.localStorage.removeItem("emailForSignIn");
      alert("Successfully signed in!");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  }
};

export { fireDB, auth, sendEmailLink, verifyEmailLink };
