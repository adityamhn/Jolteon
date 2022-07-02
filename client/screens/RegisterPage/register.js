import React, { Component, useState } from "react";

import { Container } from "../initPage/init.styles";
import logo from "../../assets/fulllogo.png"
import { Box, FormControl, Image, Text, VStack } from "native-base";
import { register } from "../../services/auth.service";
import { DashboardButton, InputField, WelcomeText } from "../LoginPage/login.styles";

export function Register() {
  const [formData, setData] = useState({});
  return (
    <Container flex="1" backgroundColor="#0d0d0d" style={{ paddingHorizontal: 32 }}>
      <Image source={logo} style={{ width: 130, height: 40, marginLeft: -18 }} />

      <WelcomeText>
        CREATE ACCOUNT
      </WelcomeText>

      <VStack space={3} mt="10">
        <FormControl isRequired>
          <InputField
            variant="unstyled"
            placeholder="Enter your Name"
            onChangeText={(value) => {
              setData({ ...formData, name: value });
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <InputField
            variant="unstyled"
            placeholder="Enter your email"
            onChangeText={(value) => {
              setData({ ...formData, email: value });
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <InputField
            variant="unstyled"
            placeholder="Enter your email"
            onChangeText={(value) => {
              setData({ ...formData, password: value });
            }}
          />
        </FormControl>
        <Box mt="8">
          <DashboardButton
            mt="2"
            onPress={async () => {
              if (
                formData.name != null &&
                formData.password != null &&
                formData.email != null
              ) {
                await register(formData);
              } else {
                console.log("Incomplete information");
              }
            }}
          >
            <Text style={{ color: "#000" }} bold>Register</Text>
          </DashboardButton>
        </Box>
        <Box alignItems="center">
          <Text style={{ color: "#e5e5e5" }}>Already a member ? <Text onPress={() => navigation.navigate("Register")} style={{ color: "#e5e5e5" }}>Login</Text></Text>
        </Box>
      </VStack>
    </Container>
  );
}

export default Register;
