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
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import mapStyle from "./mapStyle.json";
import * as Location from "expo-location";
import { Box, Button, Fab, Flex, Icon } from "native-base";
import { getAllSeller } from "../../services/auth.service";
import { SwipeablePanel } from "rn-swipeable-panel";

export function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [allmarkers, setAllmarkers] = useState(null);
  const panelProps = {
    fullWidth: true,
    openSmall: true,
    showCloseButton: true,
    smallPanelHeight: 500,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    style: {
      backgroundColor: "#323232",
    },
  };
  const [isPanelActive, setIsPanelActive] = useState(false);

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
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
      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
        <Flex
          my={8}
          alignItems="center"
          justifyContent={"center"}
          flexDirection={"row"}
          mx={16}
        >
          <Image
            alt={"addres1"}
            source={{
              uri: "https://images.unsplash.com/photo-1605282003441-a966bb348137?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGV0cm9sJTIwc3RhdGlvbnxlbnwwfHwwfHw%3D&w=1000&q=80",
            }}
            style={{ width: 80, height: 80 }}
            resizeMode={"cover"}
            borderRadius={10}
          />
          <View marginLeft={12}>
            <Text
              style={{
                fontSize: 14,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Jolt Station - Koramangala
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

        <Button
          my={4}
          mx={"auto"}
          rounded="sm"
          bgColor={"#FFE040"}
          _text={{
            color: "#2B2B2B",
            fontWeight: "bold",
            fontSize: 12,
          }}
          w="80%"
        >
          BOOK CHARGER
        </Button>

        <Button
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
        </Button>

        <Flex
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-around"}
          py={2}
        >
          <Box p="2">
            <Text
              style={{
                fontSize: 12,
                color: "#ffe040",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Level 3
            </Text>
            <Text
              style={{
                fontSize: 8,
                color: "#fff",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              PORT TYPE
            </Text>
          </Box>
          <Box p="2">
            <Text
              style={{
                fontSize: 12,
                color: "#ffe040",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              $0.4/KWH
            </Text>
            <Text
              style={{
                fontSize: 8,
                color: "#fff",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              COST
            </Text>
          </Box>
          <Box p="2">
            <Text
              style={{
                fontSize: 12,
                color: "#ffe040",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              200 A, 96 kW
            </Text>
            <Text
              style={{
                fontSize: 8,
                color: "#fff",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              POWER
            </Text>
          </Box>
        </Flex>

        <Text
          style={{
            marginTop: 20,
            marginLeft: 32,
            fontSize: 10,
            color: "#fff",
            fontWeight: "bold",
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
          {["cafe", "wc", "rooms"].map((item, idx) => {
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
                p="2"
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
                    fontSize: 8,
                    color: "#fff",
                    fontWeight: "bold",
                    marginTop: 6,
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
      </SwipeablePanel>

      {location && location.coords && allmarkers != null ? (
        <>
          <View
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
          </View>
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
                    openPanel();
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
