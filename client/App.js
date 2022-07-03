import React from "react";
import firebase from "./firebase";
import { Navigation } from "./navigation";
import "react-native-gesture-handler";
import { SafeArea } from "./components/SafeArea.component";
import { NativeBaseProvider, extendTheme } from "native-base";
import { useFonts } from "expo-font";

const theme = extendTheme({
  fontConfig: {
    Montserrat: {
      100: {
        normal: "MontserratLight",
        italic: "MontserratLightItalic",
      },
      200: {
        normal: "MontserratLight",
        italic: "MontserratLightItalic",
      },
      300: {
        normal: "MontserratLight",
        italic: "MontserratLightItalic",
      },
      400: {
        normal: "MontserratRegular",
        italic: "MontserratItalic",
      },
      500: {
        normal: "MontserratMedium",
      },
      600: {
        normal: "MontserratMedium",
        italic: "MontserratMediumItalic",
      },
      700: {
        normal: "MontserratBold",
        italic: "MontserratBoldItalic",
      },
    },
  },

  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
    mono: "Montserrat",
  },
});
export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat: require("./fonts/Montserrat.ttf"),
    MontserratBold: require("./fonts/Montserrat-Black.ttf"),
    MontserratItalic: require("./fonts/Montserrat-Italic.ttf"),
    MontserratLight: require("./fonts/Montserrat-Light.ttf"),
    MontserratMedium: require("./fonts/Montserrat-Medium.ttf"),
    MontserratSemiBold: require("./fonts/Montserrat-SemiBold.ttf"),
    MontserratThin: require("./fonts/Montserrat-Thin.ttf"),
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
