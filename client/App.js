import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "./firebase";
import Login from "./screens/LoginPage/login";
import Register from "./screens/RegisterPage/register";
import Dashboard from "./screens/DashboardPage/dashboard";
import { NativeBaseProvider } from "native-base";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

const AuthStack = createStackNavigator();
const DashboardStack = createStackNavigator();

export default function App() {
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

  if (currentUser == null) {
    return (
      <NavigationContainer>
        <NativeBaseProvider>
          <AuthStack.Navigator initialRouteName="Login">
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="Register" component={Register} />
          </AuthStack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <NativeBaseProvider>
          <DashboardStack.Navigator initialRouteName="Dashboard">
            <DashboardStack.Screen name="Dashboard" component={Dashboard} />
          </DashboardStack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    );
  }
}
