import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/LoginPage/login.screen";
import Register from "../screens/RegisterPage/register";
import InitialScreen from "../screens/initPage/init.screen";

const Stack = createStackNavigator();

export const PreLoginNavigator = () => (
  <Stack.Navigator initialRouteName="Initial" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Initial" component={InitialScreen} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />

  </Stack.Navigator>
);
