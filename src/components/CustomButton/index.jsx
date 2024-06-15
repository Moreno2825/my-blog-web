import React from "react";
import { ButtonStyled } from "./index.style";

const CustomButton = ({ text, fullWidth, onClick, type, customDesign }) => {
  return (
    <>
      <ButtonStyled
        fullWidth={fullWidth}
        onClick={onClick}
        type={type}
        customDesign={customDesign}
      >
        {text}
      </ButtonStyled>
    </>
  );
};

export default CustomButton;
