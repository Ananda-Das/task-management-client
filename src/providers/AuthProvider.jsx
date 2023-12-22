/* eslint-disable react/prop-types */
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
  import app from "../firebase/firebase.config";
  import { createContext, useEffect, useState } from "react";
  import axios from "axios";
  
  export const AuthContext = createContext(null);
  
  const auth = getAuth(app);
  
  const googleProvider = new GoogleAuthProvider();
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const signInWithGoogle = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
    };
  
    const signIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log("user in the auth state changed", currentUser);
        const userEmail = currentUser?.email || user?.email;
        const loggedUserEmail = { email: userEmail };
        setUser(currentUser);
        setLoading(false);
        //token
        if (currentUser) {
          axios.post("http://localhost:5000/jwt", loggedUserEmail, { withCredentials: true }).then((res) => {
            console.log("token res", res.data);
          });
        } else {
          axios.post("https://job-hunter-server-nine.vercel.app/logout", loggedUserEmail, { withCredentials: true }).then((res) => {
            console.log(res.data);
          });
        }
      });
      return () => {
        unSubscribe();
      };
    }, [user?.email]);
  
    const authInfo = {
      user,
      loading,
      createUser,
      signInWithGoogle,
      signIn,
      logOut,
    };
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
  };
  
  export default AuthProvider;
  