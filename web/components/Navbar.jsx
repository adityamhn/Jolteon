import Image from "next/image";
import { Router } from "next/router";
import React from "react";
import jolteon from "../images/jolteon.svg";
import Styles from "../styles/Navbar.module.scss";
import Button from "./Button";
import { useRouter } from "next/router";

export default function Navbar({ hide }) {
  const router = useRouter();
  return (
    <div className={Styles.NavContainer}>
      <Image
        className="pointer"
        onClick={() => {
          router.push("/");
        }}
        src={jolteon}
        alt="logo"
        height={80}
        width={200}
      />
      {!hide && (
        <>
          <div className={Styles.NavLinks}>
            <a href="#">Home</a>
            <a href="#">Swap Stations</a>
            <a href="#">Charge Stations</a>
            <a href="#">Support</a>
            <a href="#">About Us</a>
          </div>
          <Button
            outlined
            text="LOGIN"
            style={{
              marginRight: "1rem",
            }}
            onClick={() => {
              router.push("/login");
            }}
          />
        </>
      )}
    </div>
  );
}
