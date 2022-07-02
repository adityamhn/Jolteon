import React from "react";
import Styles from "/styles/Button.module.scss";
import { Button as NButton } from "native-base";

export default function Button({
  text,
  className,
  outlined,
  onClick,
  ...props
}) {
  return (
    // // <button
    //   className={`${Styles.MainButton} ${
    //     outlined ? Styles.OutlinedButton : ""
    //   } ${className}`}
    //   id={id}
    //   name={name}
    //   value={value}
    //   style={style}
    // {...props}
    // >
    // {text || props.children}
    // </button>
    <NButton
      {...props}
      onPress={onClick}
      bgColor={"#FFE040"}
      _text={{ color: "#000", fontWeight: 600 }}
    >
      {text || props.children}
    </NButton>
  );
}
