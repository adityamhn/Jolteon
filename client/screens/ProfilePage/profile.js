import React, { Component } from "react";
import {
  Box,
  Center,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Text,
  HStack,
  Button,
} from "native-base";
import { logout } from "../../services/auth.service";
export function Profile() {
  const signUserOut = async () => {
    try {
      const res = await logout();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

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
          Welcome homie
        </Heading>
        <Button onPress={signUserOut}>Sign Out</Button>
      </Box>
    </Center>
  );
}

export default Profile;
