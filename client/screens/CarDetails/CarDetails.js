import {
  ArrowBackIcon,
  Box,
  FormControl,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useEffect } from "react";
import { Container } from "../initPage/init.styles";
import { getGarageDetails } from "../../services/auth.service";
import { DashboardButton, InputField } from "../LoginPage/login.styles";

const CardDetails = ({ navigation }) => {
  const [formDetails, setFormDetails] = React.useState({
    batteryType: "",
    voltage: 0,
    model: "",
    health: "",
    etc: 0,
    color: "",
    brand: "",
  });

  const onSubmit = () => {
    console.log(formDetails);
  };

  useEffect(() => {
    (async () => {
      let data = await getGarageDetails();
      console.log("in details:", data.garageDetails);
      setFormDetails({
        batteryType: data.garageDetails.batteryType,
        voltage: data.garageDetails.voltage,
        model: data.garageDetails.model,
        health: data.garageDetails.health,
        etc: data.garageDetails.etc,
        color: data.garageDetails.color,
        brand: data.garageDetails.brand,
      });
    })();
  }, []);

  return (
    <Container flex="1" backgroundColor="#0d0d0d">
      <ScrollView
        style={{
          paddingHorizontal: 32,
        }}
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
          Your Car Details
        </Text>
        <VStack space={3} mt="10" alignItems={"center"}>
          <Image
            source={{
              uri: "https://www.pngmart.com/files/22/Tesla-PNG-Transparent.png",
            }}
            resizeMode={"contain"}
            style={{ width: 200, height: 100, borderRadius: 8 }}
            alt={"logo"}
          />
          <FormControl isRequired>
            <InputField
              variant="unstyled"
              placeholder="Battery Type"
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, batteryType: text })
              }
              defaultValue={formDetails.batteryType}
            />
          </FormControl>
          <FormControl isRequired>
            <InputField
              variant="unstyled"
              placeholder="Car Manufacturing Company"
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, brand: text })
              }
              defaultValue={formDetails.brand}
            />
          </FormControl>
          <FormControl isRequired>
            <InputField
              variant="unstyled"
              placeholder="Car Model"
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, model: text })
              }
              defaultValue={formDetails.model}
            />
          </FormControl>
          <FormControl isRequired>
            <InputField
              variant="unstyled"
              placeholder="Health Status"
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, health: text })
              }
              defaultValue={formDetails.health}
            />
          </FormControl>
          <FormControl isRequired>
            <InputField
              variant="unstyled"
              placeholder="Car Color"
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, color: text })
              }
              defaultValue={formDetails.color}
            />
          </FormControl>
          <FormControl isRequired>
            <InputField
              variant="unstyled"
              placeholder="Estimated time of charging"
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, etc: text })
              }
              keyboardType="numeric"
              defaultValue={`${formDetails.etc}`}
            />
          </FormControl>
          <FormControl isRequired>
            <InputField
              variant="unstyled"
              placeholder="Voltage"
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, voltage: text })
              }
              keyboardType="numeric"
              defaultValue={`${formDetails.voltage}`}
            />
          </FormControl>
          <DashboardButton mt="2" style={{ width: "100%" }}>
            <Text style={{ color: "#000", fontFamily: "MontserratMedium" }}>
              SAVE
            </Text>
          </DashboardButton>
        </VStack>
      </ScrollView>
    </Container>
  );
};

export default CardDetails;
