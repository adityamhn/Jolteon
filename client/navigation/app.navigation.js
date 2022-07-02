import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Map from "../screens/MapPage/map";
import Profile from "../screens/ProfilePage/profile";
import Garage from "../screens/GaragePage/garage";
import { Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

export const AppNavigator = () => (
  <Tabs.Navigator
    initialRouteName="Map"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = focused
            ? "ios-information-circle"
            : "ios-information-circle-outline";
        } else if (route.name === "Settings") {
          iconName = focused ? "ios-list-box" : "ios-list";
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
      headerShown: false,
    })}
  >
    <Tabs.Screen name="Map" component={Map} />
    <Tabs.Screen name="Garage" component={Garage} />
    <Tabs.Screen name="Bookings" component={Map} />
    <Tabs.Screen name="Profile" component={Profile} />
  </Tabs.Navigator>
);
