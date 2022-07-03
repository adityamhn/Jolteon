import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Map from "../screens/MapPage/map";
import { Image, View } from "native-base";
import { Booking } from "../screens/BookingPage/booking";
import { GarageNavigator } from "./garage.navigation";
import { ProfileNavigator } from "./profile.navigation";

const Tabs = createBottomTabNavigator();

export const AppNavigator = () => (
  <Tabs.Navigator
    initialRouteName="Map"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === "Garage") {
          return (
            <View>
              <Image
                w={6}
                h={6}
                resizeMode={"contain"}
                alt={"garage"}
                source={
                  focused
                    ? require(`../assets/tab/garage.png`)
                    : require(`../assets/tab/ugarage.png`)
                }
              />
            </View>
          );
        }
        if (route.name === "Map") {
          return (
            <Image
              w={6}
              h={6}
              resizeMode={"contain"}
              alt={"map"}
              source={
                focused
                  ? require(`../assets/tab/map.png`)
                  : require(`../assets/tab/umap.png`)
              }
            />
          );
        }
        if (route.name === "Bookings") {
          return (
            <Image
              w={6}
              h={6}
              resizeMode={"contain"}
              alt={"map"}
              source={
                focused
                  ? require(`../assets/tab/map.png`)
                  : require(`../assets/tab/umap.png`)
              }
            />
          );
        }
        if (route.name === "Profile") {
          return (
            <Image
              w={6}
              h={6}
              resizeMode={"contain"}
              alt={"map"}
              source={
                focused
                  ? require(`../assets/tab/profile.png`)
                  : require(`../assets/tab/uprofile.png`)
              }
            />
          );
        }
      },
      tabBarActiveTintColor: "#FFE040",
      tabBarInactiveTintColor: "gray",
      headerShown: false,
      tabBarStyle: {
        backgroundColor: "#2B2B2B",
        height: 70,
        paddingBottom: 10,
        paddingTop: 10,
        borderColor: "transparent",
        shadowColor: "transparent",
      },
    })}
  >
    <Tabs.Screen name="Map" component={Map} />
    <Tabs.Screen name="Garage" component={GarageNavigator} />
    <Tabs.Screen name="Bookings" component={Booking} />
    <Tabs.Screen name="Profile" component={ProfileNavigator} />
  </Tabs.Navigator>
);
