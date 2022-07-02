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
import React from "react";
import { Container } from "../initPage/init.styles";
import { DashboardButton, InputField } from "../LoginPage/login.styles";

const CardDetails = ({ navigation }) => {
  const [formDetails, setFormDetails] = React.useState({
    batteryType: "",
    voltage: "",
    model: "",
    health: "",
    etc: "",
    color: "",
    voltage: "",
  });

  const onSubmit = () => {
    console.log(formDetails);
  };

  return (
    <Container
      flex="1"
      backgroundColor="#0d0d0d"
      style={{ paddingHorizontal: 32 }}
    >
      <ScrollView>
        <Heading style={{ color: "#e5e5e5" }}>Update Car Details</Heading>
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
            />
          </FormControl>
          <FormControl isRequired>
            <InputField
              variant="unstyled"
              placeholder="Car Manufacturing Company"
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, brand: text })
              }
            />
          </FormControl>
          <FormControl isRequired>
            <InputField
              variant="unstyled"
              placeholder="Car Model"
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, model: text })
              }
            />
          </FormControl>
          <FormControl isRequired>
            <InputField
              variant="unstyled"
              placeholder="Health Status"
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, health: text })
              }
            />
          </FormControl>
          <FormControl isRequired>
            <InputField
              variant="unstyled"
              placeholder="Car Color"
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, color: text })
              }
            />
          </FormControl>
          <FormControl isRequired>
            <InputField
              variant="unstyled"
              placeholder="Estimated time of charging"
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, etc: text })
              }
            />
          </FormControl>
          <FormControl isRequired>
            <InputField
              variant="unstyled"
              placeholder="Voltage"
              onChangeText={(text) =>
                setFormDetails({ ...formDetails, voltage: text })
              }
            />
          </FormControl>
          <DashboardButton mt="2" style={{ width: "100%" }}>
            <Text style={{ color: "#000" }} bold>
              SAVE
            </Text>
          </DashboardButton>
        </VStack>
      </ScrollView>
    </Container>
  );
};

export default CardDetails;
