import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import VendorInfoScreen from "../screens/VendorInfoPage/VendorInfoPage.screen";
import Profile from "../screens/ProfilePage/profile";

const Stack = createStackNavigator();

export const ProfileNavigator = () => (
  <Stack.Navigator
    initialRouteName="ProfilePage"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="ProfilePage" component={Profile} />
    <Stack.Screen name="VendorInfo" component={VendorInfoScreen} />
  </Stack.Navigator>
);
