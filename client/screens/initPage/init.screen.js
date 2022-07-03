import React from "react";
import { Container, GetStartedButton } from "./init.styles";
import Logo from "../../assets/init.png";

import { Box, Button, Center, Image, Text } from "native-base";
import { ImageBackground } from "react-native";
import map from "../../assets/map.png";
import Icon from "react-native-vector-icons/AntDesign";

const InitialScreen = ({ navigation }) => {
  return (
    <Container flex="1" backgroundColor="#0d0d0d" alignItems="center">
      <ImageBackground
        source={map}
        resizeMode="cover"
        style={{
          height: "100%",
          paddingHorizontal: 50,
        }}
      >
        <Box
          flex="1"
          alignItems="center"
          justifyContent="center"
          style={{ width: "100%" }}
        >
          <Box style={{ marginLeft: -36, marginBottom: -30, marginTop: -100 }}>
            <Image
              source={Logo}
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
            />
          </Box>
          <Text
            fontFamily="body"
            letterSpacing="3"
            style={{
              color: "#e5e5e5",
              fontFamily: "MontserratMedium",
            }}
          >
            YOUR SMART EV SOLUTION
          </Text>
          <GetStartedButton
            style={{ position: "absolute", bottom: 56, padding: 26 }}
            onPress={() => navigation.push("Login")}
          >
            <Icon name="arrowright" style={{ fontSize: 24 }} />
          </GetStartedButton>
        </Box>
      </ImageBackground>
    </Container>
  );
};

export default InitialScreen;
