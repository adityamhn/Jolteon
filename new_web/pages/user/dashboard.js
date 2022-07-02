import React, { useEffect } from "react";
import { useStore } from "/store/store";
import { getAllSellers } from "../../services/auth.service";
import Button from "/components/Button";
import Layout from "/components/Layout";
import { logout } from "../../services/auth.service";
import Styles from "/styles/Dashboard.module.scss";
import { Image as AImage } from "antd";
import { Divider, Box, Heading } from "native-base";
import charging from "../../images/battery.svg";
import voltage from "../../images/voltage.svg";
import time from "../../images/time.svg";
import Image from "next/image";
export default function UserDashboard() {
  const { user } = useStore();
  useEffect(() => {
    getAllSellers();
  }, []);
  return (
    <Layout>
      <div className={Styles.Dashboard}>
        <h1
          style={{
            margin: "0rem",
          }}
        >
          WELCOME {user?.email}
        </h1>
        <div className={Styles.Car}>
          <AImage
            style={{
              width: "100%",
              height: "200px",
              objectFit: "contain",
              margin: "1rem auto",
            }}
            src={"https://www.pngmart.com/files/22/Tesla-PNG-Transparent.png"}
            preview={false}
          />
        </div>
        <h2 className="yellow-text">Tesla Model 3</h2>
        <div
          style={{
            display: "flex",
            margin: "1rem 0",
          }}
        >
          <Box w="200">
            <Heading
              mx="3"
              alignItems="center"
              flexDirection="row"
              color={"white"}
              textAlign="center"
            >
              <Image src={charging} />
              <div>50%</div>
            </Heading>
            <Heading
              fontSize={12}
              mx="3"
              alignItems="center"
              flexDirection="row"
              color={"grey"}
              textAlign="center"
            >
              Charge
            </Heading>
          </Box>
          <Box w="200">
            <Heading
              mx="3"
              alignItems="center"
              flexDirection="row"
              color={"white"}
              textAlign="center"
            >
              <Image src={voltage} />
              <div>214 V</div>
            </Heading>
            <Heading
              fontSize={12}
              mx="3"
              alignItems="center"
              flexDirection="row"
              color={"grey"}
              textAlign="center"
            >
              Voltage
            </Heading>
          </Box>
          <Box w="200">
            <Heading
              mx="3"
              alignItems="center"
              flexDirection="row"
              color={"white"}
              textAlign="center"
            >
              <Image src={time} />
              <div>4hrs 24mins</div>
            </Heading>
            <Heading
              fontSize={12}
              mx="3"
              alignItems="center"
              flexDirection="row"
              color={"grey"}
              textAlign="center"
            >
              Driven Time
            </Heading>
          </Box>
        </div>
        <Button
          style={{
            marginTop: "3rem",
          }}
          onClick={() => {
            logout()
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Logout
        </Button>
      </div>
    </Layout>
  );
}
