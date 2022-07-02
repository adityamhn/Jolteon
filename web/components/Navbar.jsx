import Image from "next/image";
import React from "react";
import jolteon from "../images/jolteon.svg";
import Styles from "../styles/Navbar.module.scss";
export default function Navbar() {
  return (
    <div className={Styles.NavContainer}>
      <Image src={jolteon} alt="logo" height={80} width={200} />
      <div className={Styles.NavLinks}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Home</a>
        <a href="#">Home</a>
        <a href="#">Home</a>
      </div>
      <button>Login</button>
    </div>
  );
}
