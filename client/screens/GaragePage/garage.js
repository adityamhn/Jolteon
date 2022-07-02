import React, { useEffect, useState } from "react";
import { Box, Text, Button, Image, Flex, View } from "native-base";
import { ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { getGarageDetails } from "../../services/auth.service";

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
  const [garageData, setGarageData] = useState(null);

  useEffect(() => {
    (async () => {
      let data = await getGarageDetails();
      setGarageData(data.garageDetails);
    })();
  }, []);

  if (garageData) {
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
          {garageData.brand} {garageData.model}
        </Text>
        <Flex
          mt={12}
          alignItems="center"
          flexDirection={"row"}
          justifyContent={"center"}
        >
          <InfoBox
            image={require("../../assets/garage/battery.png")}
            data={garageData.charge * 100 + "%"}
            dataName={"CHARGE"}
          />
          <InfoBox
            image={require("../../assets/garage/health.png")}
            data={garageData.health}
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
            data={garageData.etc + " Hours"}
            dataName={"TIME EST"}
          />
          <InfoBox
            image={require("../../assets/garage/voltage.png")}
            data={garageData.voltage}
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
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFE040" />
      </View>
    );
  }
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

export default Garage;
