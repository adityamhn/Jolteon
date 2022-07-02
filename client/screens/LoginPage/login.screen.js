import React, { useState } from "react";
import { login } from "../../services/auth.service";
import { Container } from "../initPage/init.styles";
import logo from "../../assets/fulllogo.png";
import { Box, FormControl, Image, Text, VStack } from "native-base";
import { WelcomeText, InputField, DashboardButton } from "./login.styles";

export function Login({ navigation }) {
  const [formData, setData] = useState({});

  return (
    <Container
      flex="1"
      backgroundColor="#0d0d0d"
      style={{ paddingHorizontal: 32 }}
    >
      <Image
        source={logo}
        style={{ width: 130, height: 40, marginLeft: -18 }}
        alt={"logo"}
      />

      <WelcomeText>WELCOME BACK</WelcomeText>

      <VStack space={3} mt="10">
        <FormControl isRequired mt="2">
          <InputField
            variant="unstyled"
            placeholder="Enter your email"
            onChangeText={(value) => {
              setData({ ...formData, email: value });
            }}
          />
        </FormControl>
        <FormControl isRequired mt="2">
          <InputField
            variant="unstyled"
            type="password"
            placeholder="Enter your password"
            onChangeText={(value) => {
              setData({ ...formData, password: value });
            }}
          />
        </FormControl>
        <Box mt="8">
          <DashboardButton
            mt="2"
            onPress={async () => {
              await login(formData.email, formData.password);
            }}
          >
            <Text style={{ color: "#000" }} bold>
              Login
            </Text>
          </DashboardButton>
        </Box>
        <Box alignItems="center">
          <Text style={{ color: "#e5e5e5" }}>
            New here ?{" "}
            <Text
              onPress={() => navigation.navigate("Register")}
              style={{ color: "#e5e5e5" }}
            >
              Register
            </Text>
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}

export default Login;
