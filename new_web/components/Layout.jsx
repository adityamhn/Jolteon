import React from "react";
import Styles from "../styles/Layout.module.scss";
export default function Layout({ children }) {
  return <div className={Styles.LayoutContainer}>{children}</div>;
}
