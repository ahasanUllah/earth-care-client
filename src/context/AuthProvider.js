import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase.config';
import {
   createUserWithEmailAndPassword,
   getAuth,
   GoogleAuthProvider,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signInWithPopup,
   signOut,
} from 'firebase/auth';

export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState([]);
   const [loader, setLoader] = useState(true);

   const userRegister = (email, password) => {
      setLoader(true);
      return createUserWithEmailAndPassword(auth, email, password);
   };

   const userLogin = (email, password) => {
      setLoader(true);
      return signInWithEmailAndPassword(auth, email, password);
   };

   const googleLogin = () => {
      setLoader(true);
      return signInWithPopup(auth, provider);
   };

   const logout = () => {
      return signOut(auth);
   };

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         console.log('currentUser', currentUser);
         setLoader(false);
      });
      return () => unsubscribe();
   }, []);

   const authInfo = { userRegister, userLogin, logout, user, googleLogin, loader };
   return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
