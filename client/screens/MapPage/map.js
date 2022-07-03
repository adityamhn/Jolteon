import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import mapStyle from "./mapStyle.json";
import * as Location from "expo-location";
import { AddIcon, Box, Button, Fab, Flex, Icon } from "native-base";
import { book, getAllSeller } from "../../services/auth.service";
import { SwipeablePanel } from "rn-swipeable-panel";

export function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [allmarkers, setAllmarkers] = useState(null);
  const panelProps = {
    fullWidth: true,
    openSmall: true,
    showCloseButton: false,
    smallPanelHeight: 500,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    style: {
      backgroundColor: "#323232",
    },
    closeOnTouchOutside: true,
  };
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [openMarker, setOpenMarker] = useState(null);
  const [isADatePickerVisible, setADatePickerVisibility] = useState(false);
  const [isDDatePickerVisible, setDDatePickerVisibility] = useState(false);

  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);

  const showDatePicker = () => {
    setADatePickerVisibility(true);
  };

  const handleAConfirm = (date) => {
    setArrivalDate(date);
    setADatePickerVisibility(false);
  };

  const handleDConfirm = (date) => {
    setDepartureDate(date);
    setDDatePickerVisibility(false);
  };

  const openPanel = (marker) => {
    setOpenMarker(marker);
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  const onBook = async () => {
    if (!arrivalDate || !departureDate) console.log("choose date properly");
    let bookingData = {
      fromtime: arrivalDate,
      totime: departureDate,
      status: "pending",
      date: new Date(),
      sid: openMarker.id,
    };

    console.log("booking data", bookingData);

    try {
      let retdata = await book(bookingData);

      console.log(retdata);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    (async () => {
      let data = await getAllSeller();
      // console.log(data.sellerData);
      setAllmarkers(data.sellerData);
      // console.log(allmarkers);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log(location);
  }

  return (
    <View style={styles.container}>
      {openMarker && (
        <SwipeablePanel {...panelProps} isActive={isPanelActive}>
          <Flex
            my={6}
            alignItems="center"
            justifyContent={"flex-start"}
            flexDirection={"row"}
            mx={8}
          >
            <Image
              alt={"addres1"}
              source={{
                uri: "https://images.unsplash.com/photo-1605282003441-a966bb348137?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGV0cm9sJTIwc3RhdGlvbnxlbnwwfHwwfHw%3D&w=1000&q=80",
              }}
              style={{
                width: 90,
                height: 90,
                shadowColor: "black",
                shadowOpacity: 0.5,
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 15,
                elevation: 4,
                backgroundColor: "black",
              }}
              resizeMode={"cover"}
              borderRadius={10}
            />
            <View
              marginLeft={16}
              style={{
                height: 90,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#fff",
                  fontFamily: "MontserratMedium",
                }}
              >
                {console.log(openMarker)}
                {openMarker.stationName} Station
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#fff",
                  fontFamily: "MontserratLight",
                }}
              >
                {openMarker.address}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#FFE040",
                  fontFamily: "MontserratLight",
                }}
              >
                {openMarker.numberofports} ports available{" "}
              </Text>
            </View>
          </Flex>

          <View
            marginBottom={20}
            style={{
              flex: 1,
              height: 1,
              width: 260,
              marginLeft: "20%",
              marginRight: "80%",
              backgroundColor: "#E5E5E5",
              opacity: 0.25,
            }}
          />
          <Flex
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-around"}
            py={2}
          >
            <Box p="2">
              <Text
                style={{
                  fontSize: 15,
                  color: "#ffe040",
                  fontFamily: "MontserratMedium",
                  marginLeft: 10,
                }}
              >
                CABLE {openMarker.portType}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#fff",
                  fontFamily: "MontserratLight",
                  marginLeft: 10,
                  opacity: 0.5,
                }}
              >
                PORT TYPE
              </Text>
            </Box>
            <Box p="2">
              <Text
                style={{
                  fontSize: 15,
                  color: "#ffe040",
                  fontFamily: "MontserratMedium",
                  marginLeft: 10,
                }}
              >
                ${openMarker.fee / 100}/KWH
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#fff",
                  fontFamily: "MontserratLight",
                  marginLeft: 10,
                  opacity: 0.5,
                }}
              >
                COST
              </Text>
            </Box>
            <Box p="2">
              <Text
                style={{
                  fontSize: 15,
                  color: "#ffe040",
                  fontFamily: "MontserratMedium",
                  marginLeft: 10,
                }}
              >
                200 A, {openMarker.power} kW
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#fff",
                  fontFamily: "MontserratLight",
                  marginLeft: 10,
                  opacity: 0.5,
                }}
              >
                POWER
              </Text>
            </Box>
          </Flex>
          <Text
            style={{
              marginTop: 18,
              marginLeft: 26,
              fontSize: 12,
              color: "#fff",
              fontFamily: "MontserratMedium",
            }}
          >
            Additional Ammenities available here:
          </Text>

          <Flex
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            py={2}
          >
            {openMarker.ameneties.map((item, idx) => {
              let img;
              if (item === "cafe") {
                img = (
                  <Image
                    alt={"addres1"}
                    source={require("../../assets/ameneties/cafe.png")}
                    style={{ width: 24, height: 24 }}
                    resizeMode={"contain"}
                  />
                );
              } else if (item === "wc") {
                img = (
                  <Image
                    alt={"addres1"}
                    source={require("../../assets/ameneties/wc.png")}
                    style={{ width: 24, height: 24 }}
                    resizeMode={"contain"}
                  />
                );
              } else if (item === "rooms") {
                img = (
                  <Image
                    alt={"addres1"}
                    source={require("../../assets/ameneties/rooms.png")}
                    style={{ width: 24, height: 24 }}
                    resizeMode={"contain"}
                  />
                );
              }
              return (
                <Box
                  p="3"
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  w={"1/3"}
                >
                  {img}
                  <Text
                    style={{
                      fontSize: 9,
                      color: "#fff",
                      fontFamily: "MontserratMedium",
                      marginTop: 10,
                      textAlign: "center",
                    }}
                  >
                    {item === "cafe"
                      ? "CAFE"
                      : item === "wc"
                      ? "WASHROOM"
                      : "ROOMS"}
                  </Text>
                </Box>
              );
            })}
          </Flex>
          <Text
            style={{
              marginTop: 18,
              marginLeft: 26,
              fontSize: 12,
              color: "#fff",
              fontFamily: "MontserratMedium",
            }}
          >
            Book your <Text style={{ color: "#ffe040" }}>charger!</Text>
          </Text>

          <Flex
            flexDirection={"row"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            marginLeft={2}
            marginTop={3}
          >
            <Box p="2">
              <Text
                style={{
                  fontSize: 12,
                  color: "#fff",
                  fontFamily: "MontserratMedium",
                  marginLeft: 10,
                }}
              >
                Arrival
              </Text>
              <Button
                style={{
                  color: "#fff",
                  marginLeft: 10,
                  marginTop: 6,
                  backgroundColor: "#FFE040",
                }}
                _text={{
                  color: "#0d0d0d",
                  fontFamily: "MontserratBold",
                  fontSize: 12,
                }}
                onPress={showDatePicker}
              >
                Pick Arrival Time
              </Button>
              <DateTimePickerModal
                isVisible={isADatePickerVisible}
                mode="time"
                onConfirm={handleAConfirm}
                onCancel={() => {
                  setADatePickerVisibility(false);
                }}
              />
            </Box>
            {/* <Box p="2">
              <Text
                style={{
                  fontSize: 12,
                  color: "#ffe040",
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                {departureDate && arrivalDate && (
                  <>
                    {new Date(
                      departureDate.getTime() - arrivalDate.getTime()
                    ).getHours()}{" "}
                    Hour(s)
                  </>
                )}
              </Text>
            </Box> */}
            <Box p="2">
              <Text
                style={{
                  fontSize: 12,
                  color: "#fff",
                  fontFamily: "MontserratMedium",

                  marginLeft: 10,
                }}
              >
                Departure
              </Text>
              <Button
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  marginLeft: 10,
                  marginTop: 6,
                  backgroundColor: "#FFE040",
                }}
                _text={{
                  color: "#0d0d0d",
                  fontFamily: "MontserratBold",
                  fontSize: 12,
                }}
                onPress={() => {
                  setDDatePickerVisibility(true);
                }}
              >
                Pick Departure Time
              </Button>
              <DateTimePickerModal
                isVisible={isDDatePickerVisible}
                mode="time"
                onConfirm={handleDConfirm}
                onCancel={() => {
                  setDDatePickerVisibility(false);
                }}
              />
            </Box>
          </Flex>

          <Button
            my={6}
            mx={"auto"}
            rounded="sm"
            bgColor={"#FFE040"}
            _text={{
              color: "#2B2B2B",
              fontWeight: "bold",
              fontSize: 12,
            }}
            w="87%"
            disabled={!departureDate || !arrivalDate}
            onPress={onBook}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/map/Group.png")}
                style={{
                  height: 15,
                  width: 15,
                  marginRight: 6,
                }}
                resizeMode={"contain"}
              />
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  fontFamily: "MontserratMedium",
                }}
              >
                BOOK CHARGER
              </Text>
            </View>
          </Button>

          {/* <Button
            mx={"auto"}
            rounded="sm"
            bgColor={"#565656"}
            _text={{
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: 12,
            }}
            w="80%"
          >
            SHOW DIRECTIONS
          </Button> */}
        </SwipeablePanel>
      )}
      {location && location.coords && allmarkers != null ? (
        <>
          {/* <View
            style={{ position: "absolute", top: 40, width: "100%", zIndex: 10 }}
          >
            <TextInput
              style={{
                borderRadius: 4,
                margin: 10,
                color: "#fff",
                borderColor: "#666",
                backgroundColor: "#565656",
                borderWidth: 1,
                height: 45,
                paddingHorizontal: 10,
                fontSize: 18,
              }}
              placeholder={"Search"}
              placeholderTextColor={"#FFFFFF50"}
            />
          </View> */}
          <MapView
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={true}
            customMapStyle={mapStyle}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.map}
          >
            {/* Own Marker */}
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title={"Your location"}
            ></Marker>
            {/* Other people station markers */}
            {allmarkers.map((marker, idx) => {
              return (
                <Marker
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  key={idx}
                  title={"Charging Station"}
                  onPress={() => {
                    openPanel(marker);
                  }}
                >
                  <Image
                    source={require("./yellowmarker.png")}
                    style={{ height: 35, width: 35 }}
                  />
                </Marker>
              );
            })}
            {/* Swap station markers */}
            <Marker
              coordinate={{
                latitude: location.coords.latitude - 0.001,
                longitude: location.coords.longitude - 0.001,
              }}
              title={"Swap Station"}
            >
              <Image
                source={require("./greenmarker.png")}
                style={{ height: 35, width: 35 }}
              />
            </Marker>
          </MapView>
        </>
      ) : (
        <ActivityIndicator size="large" color="#FFE040" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191A1A",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 50,
  },
});

export default Map;
