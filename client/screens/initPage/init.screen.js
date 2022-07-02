import React from 'react'
import { Container, GetStartedButton } from './init.styles'
import Logo from "../../assets/logo.svg"
import { Box, Button, Center, Text } from 'native-base';
import { ImageBackground } from 'react-native';
import map from "../../assets/map.png"
import Icon from "react-native-vector-icons/AntDesign"

const InitialScreen = ({ navigation }) => {
    return (
        <Container flex="1" backgroundColor="#0d0d0d" alignItems="center">
            <ImageBackground source={map} resizeMode="cover">
                <Box flex="1" alignItems="center" justifyContent="center" style={{ width: "100%" }}>
                    <Box style={{ marginLeft: -36, marginBottom: -30, marginTop: -100 }}>
                        <Logo />
                    </Box>
                    <Text fontFamily="body" letterSpacing="3" style={{ color: "#e5e5e5", fontFamily: "Montserrat" }} bold>YOUR SMART EV SOLUTION</Text>
                    <GetStartedButton style={{ position: "absolute", bottom: 56, padding: 26 }} onPress={() => navigation.push("Login")}>
                        <Icon name="arrowright" style={{ fontSize: 24 }} />
                    </GetStartedButton>
                </Box>
            </ImageBackground>
        </Container>
    )
}

export default InitialScreen