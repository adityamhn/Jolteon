import {
    Box,
    FormControl,
    Heading,
    Image,
    ScrollView,
    Text,
    useToast,
    VStack,
} from "native-base";
import React, { useState } from "react";
import { addSeller } from "../../services/auth.service";
import { Container } from "../initPage/init.styles";
import {
    DashboardButton,
    InputField,
    WelcomeText,
} from "../LoginPage/login.styles";

const VendorInfoScreen = ({ navigation }) => {
    const [formData, setFormData] = useState(null);
  const toast = useToast();

    return (
        <Container
            flex="1"
            backgroundColor="#0d0d0d"
            style={{ paddingHorizontal: 32 }}
        >
            <ScrollView>
                <Heading style={{ color: "#e5e5e5" }}>Create your own Station</Heading>
                <VStack space={3} mt="10" alignItems={"center"}>
                    <Image
                        source={{
                            uri: "https://images.unsplash.com/photo-1582201872911-67877db5fb38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
                        }}
                        style={{ width: 120, height: 120, borderRadius: 8 }}
                        alt={"logo"}
                    />
                    <FormControl isRequired>
                        <InputField variant="unstyled" placeholder="Station Name" onChangeText={(value) => {
                            setFormData({ ...formData, stationName: value });
                        }} />
                    </FormControl>
                    <FormControl isRequired>
                        <InputField variant="unstyled" placeholder="Email" onChangeText={(value) => {
                            setFormData({ ...formData, stationName: value });
                        }} />
                    </FormControl>
                    <FormControl isRequired>
                        <InputField variant="unstyled" placeholder="Address" onChangeText={(value) => {
                            setFormData({ ...formData, address: value });
                        }} />
                    </FormControl>
                    <FormControl isRequired>
                        <InputField variant="unstyled" placeholder="Port Type" onChangeText={(value) => {
                            setFormData({ ...formData, portType: value });
                        }} />
                    </FormControl>
                    <FormControl isRequired>
                        <InputField variant="unstyled" placeholder="Select no of ports" onChangeText={(value) => {
                            setFormData({ ...formData, numberofports: value });
                        }} />
                    </FormControl>


                    <DashboardButton mt="2" style={{ width: "100%" }} onPress={async () => {
                        await addSeller({ ...formData, type: "station" });
                        toast.show({
                            description: "Vendor added successfully",
                        })
                    }}>
                        <Text style={{ color: "#000" }} bold>
                            SAVE
                        </Text>
                    </DashboardButton>
                </VStack>
            </ScrollView>
        </Container>
    );
};

export default VendorInfoScreen;
