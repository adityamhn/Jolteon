import React from "react";
import Styles from "/styles/Button.module.scss";
export default function Button({
  text,
  className,
  disabled,
  type,
  id,
  name,
  value,
  style,
  outlined,
  ...props
}) {
  return (
    <button
      className={`${Styles.MainButton} ${
        outlined ? Styles.OutlinedButton : ""
      } ${className}`}
      disabled={disabled}
      type={type}
      id={id}
      name={name}
      value={value}
      style={style}
      {...props}
    >
      {text || props.children}
    </button>
  );
}
