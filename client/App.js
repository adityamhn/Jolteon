import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import firebase from "./firebase";
import Login from "./screens/LoginPage/login";
import Register from "./screens/RegisterPage/register";
import Profile from "./screens/ProfilePage/profile";
import Garage from "./screens/GaragePage/garage";
import Map from "./screens/MapPage/map";
import { NativeBaseProvider, Image, CheckIcon } from "native-base";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

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
          <Tabs.Navigator initialRouteName="Profile">
            <Tabs.Screen
              name="Map"
              component={Map}
              options={{
                tabBarIcon: ({ color, size }) => {
                  return <CheckIcon size={size} color={color} />;
                },
              }}
            />
            <Tabs.Screen name="Garage" component={Garage} />
            <Tabs.Screen name="Profile" component={Profile} />
          </Tabs.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    );
  }
}
