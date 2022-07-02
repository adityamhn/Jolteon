import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Garage from "../screens/GaragePage/garage";
import VendorInfoScreen from "../screens/VendorInfoPage/VendorInfoPage.screen";
import CardDetails from "../screens/CarDetails/CarDetails";

const Stack = createStackNavigator();

export const GarageNavigator = () => (
  <Stack.Navigator
    initialRouteName="GaragePage"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="GaragePage" component={Garage} />
    <Stack.Screen name="VendorInfo" component={VendorInfoScreen} />
    <Stack.Screen name="CarInfo" component={CardDetails} />
  </Stack.Navigator>
);
