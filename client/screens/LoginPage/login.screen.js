import React, { useState } from "react";
import { login } from "../../services/auth.service";
import { Container } from "../initPage/init.styles";
import logo from "../../assets/fulllogo.png";
import { Button, FormControl, Image, Input, VStack } from "native-base";
import { WelcomeText, InputField } from "./login.styles";

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

      <VStack space={3} mt="5">
        <FormControl isRequired>
          <InputField
            variant="filled"
            placeholder="Enter your phone number"
            onChangeText={(value) => {
              setData({ ...formData, email: value });
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <InputField
            variant="filled"
            placeholder="Enter your password"
            onChangeText={(value) => {
              setData({ ...formData, password: value });
            }}
          />
        </FormControl>
        <Button
          mt="2"
          colorScheme="indigo"
          onPress={async () => {
            await login(formData.email, formData.password);
          }}
        >
          Sign in
        </Button>
      </VStack>
    </Container>
  );
}

export default Login;
