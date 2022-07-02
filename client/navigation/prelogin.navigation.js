import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/LoginPage/login.screen";
import Register from "../screens/RegisterPage/register";

const Stack = createStackNavigator();

export const PreLoginNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: true }}
  >
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);
