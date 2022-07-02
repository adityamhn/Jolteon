import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import mapStyle from "./mapStyle";
import * as Location from "expo-location";
import { Fab, Icon } from "native-base";
import { IconFill, IconOutline } from "@ant-design/icons-react-native";

export function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
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
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<IconOutline name="plus" />}
      />
      {location && location.coords != null ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          region={{
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
          <Marker
            coordinate={{
              latitude: location.coords.latitude + 0.001,
              longitude: location.coords.longitude + 0.001,
            }}
            title={"Charging Station"}
          >
            <Image
              source={require("./yellowmarker.png")}
              style={{ height: 35, width: 35 }}
            />
          </Marker>
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
    height: Dimensions.get("window").height,
  },
});

export default Map;
