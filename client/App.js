import React from "react";
import { initializeApp } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebaseConfig } from "./firebaseconfig";
import Login from "./screens/LoginPage/login";
import Register from "./screens/RegisterPage/register";
import Dashboard from "./screens/DashboardPage/dashboard";
import { NativeBaseProvider } from "native-base";

initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
