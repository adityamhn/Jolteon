import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Map from "../screens/MapPage/map";
import Profile from "../screens/ProfilePage/profile";
import Garage from "../screens/GaragePage/garage";

const Tabs = createBottomTabNavigator();

export const AppNavigator = () => (
  <Tabs.Navigator initialRouteName="Map">
    <Tabs.Screen name="Map" component={Map} />
    <Tabs.Screen name="Garage" component={Garage} />
    <Tabs.Screen name="Bookings" component={Map} />
    <Tabs.Screen name="Profile" component={Profile} />
  </Tabs.Navigator>
);
