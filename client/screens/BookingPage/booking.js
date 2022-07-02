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
  Divider,
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

export function Booking() {
  return (
    <Box
      safeArea
      w="100%"
      h="100%"
      backgroundColor={"#2B2B2B"}
      alignItems="center"
    >
      <Text
        style={{
          fontSize: 20,
          color: "#fff",
          fontWeight: "bold",
          marginTop: 40,
        }}
      >
        Current Bookings
      </Text>
      <Flex mt={8} alignItems="center" flexDirection={"row"}>
        <View marginLeft={20}>
          <Image
            alt={"addres1"}
            source={{
              uri: "https://images.unsplash.com/photo-1605282003441-a966bb348137?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGV0cm9sJTIwc3RhdGlvbnxlbnwwfHwwfHw%3D&w=1000&q=80",
            }}
            style={{ width: 120, height: 120 }}
            resizeMode={"cover"}
            borderRadius={10}
          />
        </View>
        <View width={"70%"} marginLeft={4}>
          <Text
            style={{
              fontSize: 10,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Your Address
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: "#fff",
            }}
          >
            4/1, 2nd Floor, 4th Cross, 4th block, Koramangala, Bengaluru
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: "#FFE040",
              fontWeight: "bold",
            }}
          >
            4 Ports available{" "}
          </Text>
        </View>
      </Flex>
      <Divider
        my="2"
        style={{
          backgroundColor: "#E5E5E588",
          width: "80%",
          height: 1,
          marginTop: 20,
          marginBottom: 10,
        }}
      />
      <Box
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      ></Box>

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
export default Booking;
