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
        normal: "Montserrat",
        italic: "Montserrat",
      },
      200: {
        normal: "Montserrat",
        italic: "Montserrat",
      },
      300: {
        normal: "Montserrat",
        italic: "Montserrat",
      },
      400: {
        normal: "Montserrat",
        italic: "Montserrat",
      },
      500: {
        normal: "Montserrat",
      },
      600: {
        normal: "MontserratBold",
        italic: "Montserrat-Italic",
      },
      // Add more variants
      //   700: {
      //     normal: 'Montserrat-Bold',
      //   },
      //   800: {
      //     normal: 'Montserrat-Bold',
      //     italic: 'Montserrat-BoldItalic',
      //   },
      //   900: {
      //     normal: 'Montserrat-Bold',
      //     italic: 'Montserrat-BoldItalic',
      //   },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
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
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeArea>
      <NativeBaseProvider theme={theme}>
        <Navigation />
      </NativeBaseProvider>
    </SafeArea>
  );
}
