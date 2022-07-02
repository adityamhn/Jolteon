import React, { useState } from "react";
import { login } from "../../services/auth.service";
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
} from "native-base";
import { WelcomeText, InputField, DashboardButton } from "./login.styles";

export function Login({ navigation }) {
  const [formData, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  return (
    <Container
      flex="1"
      backgroundColor="#0d0d0d"
      style={{ paddingHorizontal: 32 }}
    >
      <ScrollView>
        <Image
          source={logo}
          style={{ width: 130, height: 40, marginLeft: -18 }}
          alt={"logo"}
        />

        <WelcomeText>WELCOME BACK</WelcomeText>

        <VStack space={3} mt="10">
          <FormControl isRequired mt="2">
            <InputField
              autoCapitalize="none"
              variant="unstyled"
              placeholder="Enter your email"
              onChangeText={(value) => {
                setData({ ...formData, email: value });
              }}
            />
          </FormControl>
          <FormControl isRequired mt="2">
            <InputField
              autoCapitalize="none"
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
              isLoading={isLoading}
              isLoadingText="Logging you in..."
              onPress={() => {
                setIsLoading(true);
                login(formData.email, formData.password)
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
                            Logged In Successfully!
                          </Box>
                        );
                      },
                    });
                    setIsLoading(false);
                  })
                  .catch((err) => {
                    toast.show({
                      render: () => {
                        return (
                          <Box
                            // text
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
              }}
            >
              <Text style={{ color: "#000", fontFamily: "MontserratMedium" }}>
                Login
              </Text>
            </DashboardButton>
          </Box>
          <Box alignItems="center">
            <Text style={{ color: "#e5e5e5", fontFamily: "MontserratMedium" }}>
              New here?{" "}
              <Text
                onPress={() => navigation.navigate("Register")}
                style={{ color: "#ffe040" }}
              >
                Register
              </Text>
            </Text>
          </Box>
        </VStack>
      </ScrollView>
    </Container>
  );
}

export default Login;
