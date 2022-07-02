import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Map from "../screens/MapPage/map";


const Tabs = createBottomTabNavigator();


export const AppNavigator = () => (
    <Tabs.Navigator initialRouteName="Map">
        <Tabs.Screen
            name="Map"
            component={Map}
        />
    </Tabs.Navigator>
);
