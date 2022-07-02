import {
  Button,
  Text,
  FormControl,
  HStack,
  Image,
  Input,
  Link,
  Stack,
  VStack,
} from "native-base";
import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { AppCenter, AppContainer, LoginHeading } from "./login.styles";
import { login } from "../../services/auth.service";

export function Login({ navigation }) {
  const [formData, setData] = useState({});

  return (
    <AppCenter>
      <AppContainer>
        <Image source={logo} alt="Alternate Text" />
        <LoginHeading>WELCOME BACK</LoginHeading>
        <VStack space={3} mt="5">
          <FormControl isRequired>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input
              onChangeText={(value) => {
                setData({ ...formData, email: value });
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              onChangeText={(value) => {
                setData({ ...formData, password: value });
              }}
            />
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={async () => {
              if (formData.email && formData.password) {
                await login(formData.email, formData.password);
              } else {
                console.log("incomplete details");
              }
            }}
          >
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => {
                navigation.push("Register");
              }}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </AppContainer>
    </AppCenter>
  );
}

export default Login;
