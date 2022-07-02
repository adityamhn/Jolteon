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
export function Garage() {
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
          Garage
        </Heading>
      </Box>
    </Center>
  );
}

export default Garage;
