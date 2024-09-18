import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_ID1,
  authDomain: "weather-ap-3f402.firebaseapp.com",
  projectId: "weather-ap-3f402",
  storageBucket: "weather-ap-3f402.appspot.com",
  messagingSenderId: "1078327679929",
  appId: "1:1078327679929:web:cb0a81811aef8c11d77468"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup function
const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Store user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
    });

    toast.success("Account created successfully!");
  } catch (error) {
    console.error("Error signing up:", error);
    if (error.code === 'auth/email-already-in-use') {
      toast.error("The email address is already in use. Please try logging in or use a different email.");
    } else {
      toast.error("An error occurred during signup. Please try again.");
    }
  }
};

// Login function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Logged in successfully!");
  } catch (error) {
    console.error("Error logging in:", error);
    toast.error("An error occurred during login. Please check your credentials and try again.");
  }
};

// Logout function
const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out successfully!");
  } catch (error) {
    console.error("Error logging out:", error);
    toast.error("An error occurred during logout. Please try again.");
  }
};

export { auth, db, signup, login, logout };
