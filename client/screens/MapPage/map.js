import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import mapStyle from "./mapStyle";
import * as Location from "expo-location";
import { Fab, Icon } from "native-base";
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import { getAllSeller } from "../../services/auth.service";
import { SwipeablePanel } from "rn-swipeable-panel";

export function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [allmarkers, setAllmarkers] = useState(null);
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openSmall: true,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
  });
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
        <Text>Hi</Text>
      </SwipeablePanel>
      {location && location.coords && allmarkers != null ? (
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
      ) : (
        <Text>{text}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 50,
  },
});

export default Map;
