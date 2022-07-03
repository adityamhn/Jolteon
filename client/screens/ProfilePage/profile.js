import React, { Component } from "react";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { logout } from "../../services/auth.service";
import { Container } from "../initPage/init.styles";
import { DashboardButton, InputField } from "../LoginPage/login.styles";

export function Profile({navigation}) {
  const signUserOut = async () => {
    try {
      const res = await logout();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
            flex="1"
            backgroundColor="#0d0d0d"
            style={{ paddingHorizontal: 32 }}
        >
                <Heading style={{ color: "#e5e5e5" }}>Your Profile</Heading>
                <VStack space={3} mt="10" alignItems={"center"}>
                    <Image
                        source={{
                            uri: "https://images.unsplash.com/photo-1582201872911-67877db5fb38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
                        }}
                        style={{ width: 120, height: 120, borderRadius: 8 }}
                        alt={"logo"}
                    />


                </VStack>
                    <DashboardButton mt="2" style={{width:"100%",marginTop:92, backgroundColor:"#565656"}} onPress={() => navigation.navigate("VendorInfo")}>Become a Vendor</DashboardButton>
                    <DashboardButton mt="2" style={{ width: "100%"}} onPress={signUserOut}>
                        <Text style={{ color: "#000" }} bold>
                            LOGOUT
                        </Text>
                    </DashboardButton>
        </Container>
  );
}

export default Profile;
