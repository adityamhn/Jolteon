import React from "react";
import firebase from "./firebase";
import { Navigation } from "./navigation";
// import "react-native-gesture-handler";
import { SafeArea } from "./components/SafeArea.component";
import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat: require("./fonts/Montserrat.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeArea>
      <NativeBaseProvider>
        <Navigation />
      </NativeBaseProvider>
    </SafeArea>
  );
}
