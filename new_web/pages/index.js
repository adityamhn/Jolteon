import { ArrowRightOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";
import Button from "../components/Button";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { getTheState } from "../services/auth.service";
import Styles from "/styles/Landing.module.scss";
export default function Home() {
  return (
    <Layout>
      <Navbar />
      <div className={Styles.LandingContainer}>
        <div className={Styles.LandingContent}>
          <div>YOUR</div>
          <div>SMART</div>
          <span style={{ color: "#FFE040" }}>EV</span> SOLUTION
          <div className={Styles.Info}>
            <div className={Styles.infoText}>
              <div>150+</div>
              <div className={Styles.belowText}>Charging Stations</div>
            </div>

            <div className={Styles.infoText}>
              <div>100+</div>
              <div className={Styles.belowText}>Swapping Stations</div>
            </div>

            <div className={Styles.infoText}>
              <div>600+</div>
              <div className={Styles.belowText}>Active Users</div>
            </div>
          </div>
        </div>
        <div className={Styles.RightContainer}>
          <div className={Styles.InputField}>
            <Input
              placeholder="Find your nearest Charging, Swapping Stations"
              className="input-box"
              style={{
                width: "100%",
                height: "3rem",
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",
                padding: "0 1rem",
              }}
            />
            <Button
              style={{
                height: 48,
                width: 60,
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
              }}
            >
              <ArrowRightOutlined />
            </Button>
          </div>
          <div
            className={Styles.BottomContent}
            style={{
              color: "#E5E5E5CC",
              fontSize: "0.8rem",
              fontWeight: "500",
              width: "90%",
              lineHeight: "1.1rem",
              marginTop: "1rem",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            iaculis ex ut ultricies venenatis. Suspendisse tempus sapien at
            pulvinar mattis. Quisque orci urna, tristique nec nibh ac, tristique
            vehicula diam. Suspendisse potenti.
          </div>{" "}
        </div>
      </div>
    </Layout>
  );
}
