import React from "react";
import "../styles/Button.css";

const Button = ({ text, type = "" }) => {
  return (
    <button className={"Button"} type={type}>
      {text}
    </button>
  );
};

export default Button;
