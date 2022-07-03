import React, { Component, useState } from "react";

import { Container } from "../initPage/init.styles";
import logo from "../../assets/fulllogo.png";
import {
  Box,
  FormControl,
  Image,
  Text,
  VStack,
  useToast,
  ScrollView,
  Icon
} from "native-base";
import { register } from "../../services/auth.service";
import {
  DashboardButton,
  InputField,
  WelcomeText,
} from "../LoginPage/login.styles";
import { MaterialIcons } from "@expo/vector-icons";
import { ImageBackground } from "react-native";
import map from "../../assets/map.png";


export function Register({ navigation }) {
  const [formData, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [show,setShow] = useState(false);

  const toast = useToast();
  return (
    <Container
      flex="1"
      backgroundColor="#0d0d0d"
      style={{ paddingHorizontal: 32 }}
    >
       <ImageBackground
        source={map}
        resizeMode="cover"
      >
      <ScrollView>
        <Image
          source={logo}
          style={{ width: 130, height: 40, marginLeft: -18 }}
          alt={"logo"}
        />
        <WelcomeText>CREATE ACCOUNT</WelcomeText>
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
              placeholder="Enter your password"
              type={show ? "text" : "password"}
              InputRightElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} style={{position: "absolute",elevation:10,right:10}} onPress={() => setShow(!show)} />}
              onChangeText={(value) => {
                setData({ ...formData, password: value });
              }}
            />
          </FormControl>

          <Box mt="8">
            <DashboardButton
              mt="2"
              isLoading={isLoading}
              isLoadingText="Registering your account..."
              onPress={() => {
                setIsLoading(true);
                if (
                  formData.name != null &&
                  formData.password != null &&
                  formData.email != null
                ) {
                  register(formData)
                    .then((res) => {
                      toast.show({
                        render: () => {
                          return (
                            <Box
                              bg="emerald.500"
                              px="2"
                              py="1"
                              rounded="sm"
                              mb={5}
                            >
                              Registered Successfully!
                            </Box>
                          );
                        },
                      });
                    })
                    .catch((err) => {
                      toast.show({
                        render: () => {
                          return (
                            <Box
                              _text={{
                                color: "white",
                              }}
                              bg="red.500"
                              px="2"
                              py="1"
                              rounded="sm"
                              mb={5}
                            >
                              {err.message}
                            </Box>
                          );
                        },
                      });
                      setIsLoading(false);
                    });
                }
              }}
            >
              <Text style={{ color: "#000", fontFamily: "MontserratMedium" }}>
                Register
              </Text>
            </DashboardButton>
          </Box>
          <Box alignItems="center">
            <Text style={{ color: "#e5e5e5", fontFamily: "MontserratMedium" }}>
              Already a member?{" "}
              <Text
                onPress={() => navigation.navigate("Login")}
                style={{ color: "#ffe040" }}
              >
                Login
              </Text>
            </Text>
          </Box>
        </VStack>
      </ScrollView>
      </ImageBackground>
    </Container>
  );
}

export default Register;
