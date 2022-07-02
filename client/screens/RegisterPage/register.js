import React, { Component, useState } from "react";
import {
  Box,
  Center,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
} from "native-base";
import { register } from "../../services/auth.service";

export function Register() {
  const [formData, setData] = useState({});
  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              isRequired
              onChangeText={(value) => {
                setData({ ...formData, email: value });
              }}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              isRequired
              onChangeText={(value) => {
                setData({ ...formData, password: value });
              }}
              type="password"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              isRequired
              onChangeText={(value) => {
                setData({ ...formData, name: value });
              }}
            />
          </FormControl>
          <Button
            mt="2"
            colorScheme="indigo"
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
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default Register;
