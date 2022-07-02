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
  Image,
  Flex,
  Spacer,
  View,
} from "native-base";
import { logout } from "../../services/auth.service";

const InfoBox = ({ image, data, dataName }) => (
  <View
    width={100}
    m={4}
    mx={8}
    rounded="sm"
    _text={{
      color: "warmGray.50",
      fontWeight: "medium",
    }}
  >
    <Flex flexDirection={"row"} alignItems={"center"}>
      <View>
        <Image
          alt={dataName}
          source={image}
          style={{ width: 40, height: 40, marginRight: 10 }}
          resizeMode={"contain"}
        />
      </View>
      <Flex>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: "#FFE040",
          }}
        >
          {data}
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: "bold",
            color: "#FFF",
          }}
        >
          {dataName}
        </Text>
      </Flex>
    </Flex>
  </View>
);

export function Garage() {
  return (
    <Box
      safeArea
      w="100%"
      h="100%"
      backgroundColor={"#2B2B2B"}
      alignItems="center"
    >
      <Image
        source={{
          uri: "https://www.pngmart.com/files/22/Tesla-PNG-Transparent.png",
        }}
        alt="mycar"
        style={{ width: 400, height: 160, marginTop: 64 }}
      />
      <Text
        style={{
          fontSize: 20,
          color: "#fff",
          fontWeight: "bold",
          marginTop: 30,
        }}
      >
        Tesla Model X
      </Text>
      <Flex
        mt={12}
        alignItems="center"
        flexDirection={"row"}
        justifyContent={"center"}
      >
        <InfoBox
          image={require("../../assets/garage/battery.png")}
          data={"50%"}
          dataName={"CHARGE"}
        />
        <InfoBox
          image={require("../../assets/garage/health.png")}
          data={"Good"}
          dataName={"HEALTH"}
        />
      </Flex>
      <Flex
        mt={2}
        alignItems="center"
        flexDirection={"row"}
        justifyContent={"center"}
      >
        <InfoBox
          image={require("../../assets/garage/time.png")}
          data={"5h 30mins"}
          dataName={"TIME EST"}
        />
        <InfoBox
          image={require("../../assets/garage/voltage.png")}
          data={"315 V"}
          dataName={"VOLTAGE"}
        />
      </Flex>

      <Button
        mt={"auto"}
        rounded="sm"
        bgColor={"#FFE040"}
        _text={{
          color: "#2B2B2B",
          fontWeight: "bold",
          fontSize: 14,
        }}
        w="90%"
      >
        VIEW PLANS
      </Button>
      <Button
        my={4}
        rounded="sm"
        bgColor={"#FFE040"}
        _text={{
          color: "#2B2B2B",
          fontWeight: "bold",
          fontSize: 14,
        }}
        w="90%"
      >
        ENTER VENDOR DETAILS
      </Button>
    </Box>
  );
}
export default Garage;
