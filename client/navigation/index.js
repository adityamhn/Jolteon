import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { PreLoginNavigator } from "./prelogin.navigation";
import app from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import { AppNavigator } from "./app.navigation";

const auth = getAuth();
const db = getFirestore();

export const Navigation = () => {
  const [currentUser, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <>
      <NavigationContainer>
        {currentUser === null ? <PreLoginNavigator /> : <AppNavigator />}
      </NavigationContainer>
      <ExpoStatusBar style="auto" backgroundColor={"#0d0d0d"} />
    </>
  );
};
