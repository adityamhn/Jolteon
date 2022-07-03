import React, { Component, useEffect, useState } from "react";
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
  ScrollView,
} from "native-base";
import { logout } from "../../services/auth.service";
import { allBookingDetails } from "../../services/auth.service";

const BookingCard = ({ arrival, departure, cost, status }) => (
  <Flex
    w="90%"
    mx={"auto"}
    backgroundColor={"#565656"}
    borderRadius={10}
    alignItems="center"
  >
    <Flex
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-around"}
      py={2}
    >
      <Box p="2">
        <Text
          style={{
            fontSize: 16,
            color: "#fff",
            fontFamily: "MontserratMedium",
            marginLeft: 10,
          }}
        >
          Arrive
        </Text>
        <Text
          style={{
            fontSize: 8,
            color: "#fff",
            fontFamily: "MontserratMedium",
            marginLeft: 10,
          }}
        >
          Today at {arrival}
        </Text>
      </Box>
      <Box p="2">
        <Text
          style={{
            fontSize: 12,
            color: "#ffe040",
            marginLeft: 10,
          }}
        >
          1 hr
        </Text>
      </Box>
      <Box p="2">
        <Text
          style={{
            fontSize: 16,
            color: "#fff",
            fontFamily: "MontserratMedium",
            marginLeft: 10,
          }}
        >
          Depart
        </Text>
        <Text
          style={{
            fontSize: 8,
            color: "#fff",
            fontFamily: "MontserratMedium",
            marginLeft: 10,
          }}
        >
          Today at {departure}
        </Text>
      </Box>
    </Flex>
    <Text
      style={{
        fontSize: 14,
        color: "#fff",
        fontFamily: "MontserratMedium",
      }}
      my={2}
    >
      {cost} estimated
    </Text>
    <Text
      style={{
        fontSize: 14,
        color: "#fff",
        fontFamily: "MontserratMedium",
      }}
      my={2}
    >
      {status}
    </Text>
  </Flex>
);

const TotalEarningCard = ({ today, yesterday, week, month }) => (
  <Flex
    w="90%"
    mx={"auto"}
    my={4}
    py={2}
    backgroundColor={"#FFE040"}
    borderRadius={10}
  >
    <Text
      style={{
        fontSize: 14,
        color: "#0d0d0d",
        fontFamily: "MontserratBold",
      }}
      my={2}
      ml={4}
    >
      TOTAL EARNINGS
    </Text>
    <Flex
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-around"}
      py={2}
    >
      <Box p="2">
        <Text
          style={{
            fontSize: 20,
            color: "#0d0d0d",
            fontFamily: "MontserratMedium",
            marginLeft: 10,
          }}
        >
          {today}
        </Text>
        <Text
          style={{
            fontSize: 8,
            color: "#0d0d0d",
            fontFamily: "MontserratBold",
            marginLeft: 10,
          }}
        >
          Today
        </Text>
      </Box>
      <Box p="2">
        <Text
          style={{
            fontSize: 20,
            color: "#0d0d0d",
            fontFamily: "MontserratMedium",
            marginLeft: 10,
          }}
        >
          {yesterday}
        </Text>
        <Text
          style={{
            fontSize: 8,
            color: "#0d0d0d",
            fontFamily: "MontserratBold",
            marginLeft: 10,
          }}
        >
          Yesterday
        </Text>
      </Box>
      <Box p="2">
        <Text
          style={{
            fontSize: 20,
            color: "#0d0d0d",
            fontFamily: "MontserratMedium",
            marginLeft: 10,
          }}
        >
          {week}
        </Text>
        <Text
          style={{
            fontSize: 8,
            color: "#0d0d0d",
            fontFamily: "MontserratBold",
            marginLeft: 10,
          }}
        >
          Last week
        </Text>
      </Box>
      <Box p="2">
        <Text
          style={{
            fontSize: 20,
            color: "#0d0d0d",
            fontFamily: "MontserratMedium",
            marginLeft: 10,
          }}
        >
          {month}
        </Text>
        <Text
          style={{
            fontSize: 8,
            color: "#0d0d0d",
            fontFamily: "MontserratBold",
            marginLeft: 10,
          }}
        >
          This Month
        </Text>
      </Box>
    </Flex>
  </Flex>
);

export function Booking() {
  const [bookings, setAllBookings] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  useEffect(() => {
    (async () => {
      let data = await allBookingDetails();
      console.log(data.bookingDetails);
      console.log(data.sellerData);
      setAllBookings(data.bookingDetails);
      setSellerData(data.sellerData);
    })();
  }, []);
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
          fontSize: 24,
          color: "#fff",
          fontFamily: "MontserratMedium",
          marginTop: 25,
          padding: 25,
          textAlign: "center",
        }}
      >
        Current Bookings
      </Text>
      <ScrollView
        pb={10}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Flex
          mt={8}
          alignItems="center"
          justifyContent={"center"}
          flexDirection={"row"}
        >
          <Image
            alt={"addres1"}
            source={{
              uri: "https://images.unsplash.com/photo-1605282003441-a966bb348137?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGV0cm9sJTIwc3RhdGlvbnxlbnwwfHwwfHw%3D&w=1000&q=80",
            }}
            style={{ width: 90, height: 90 }}
            resizeMode={"cover"}
            borderRadius={10}
          />
          <View marginLeft={4}>
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
                fontFamily: "MontserratMedium",
              }}
            >
              Your Address
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#fff",
                fontFamily: "MontserratLight",
              }}
            >
              4th Cross, 4th block, Koramangala
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "MontserratLight",
                color: "#FFE040",
              }}
            >
              4 Ports available{" "}
            </Text>
          </View>
        </Flex>

        <Divider
          style={{
            backgroundColor: "#E5E5E588",
            width: "80%",
            height: 1,
            marginTop: 10,
            marginBottom: 10,
          }}
          mx={"auto"}
        />

        {bookings &&
          sellerData &&
          bookings[0].map((booking, index) => (
            <React.Fragment key={index + 1}>
              {console.log("helloin", booking?.fromtime.toDate())}
              <BookingCard
                arrival={new Date(
                  booking?.fromtime.toDate()
                ).toLocaleTimeString()}
                departure={new Date(
                  booking?.totime.toDate()
                ).toLocaleTimeString()}
                cost={"$" + sellerData.fee + "/hour"}
                status={booking.status}
              />
              <Divider
                style={{
                  backgroundColor: "#E5E5E588",
                  width: "80%",
                  height: 1,
                  marginTop: 10,
                  marginBottom: 10,
                }}
                mx={"auto"}
              />
            </React.Fragment>
          ))}
      </ScrollView>
      <TotalEarningCard today="$56" yesterday="$78" week="$120" month="$560" />
    </Box>
  );
}
export default Booking;
