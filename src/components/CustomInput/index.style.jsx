import { css } from "@emotion/react";
import styled from "@emotion/styled";


export const LabelStyled = styled.label`

  color: ${(props) => (props.labelColor ? "white" : "#2a2a2a")};
  font-size: 16px;
  font-weight: 500;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const InputStyled = styled.input`
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  height: 45px;
  margin: 4px 0px 8px 0px;
  border-radius: 5px;
  border: ${(props) =>
    props.borderLight ? "1px solid #bbb" : "1px solid #414141"};
  font-size: 16px;
  font-weight: 400;
  caret-color: #1a202c;
  &:focus {
    padding: 12px;
    border: 1.5px solid #1a202c;
    outline: none;
  }
  &:not(:focus) {
    padding: 12px;
    outline: none;
  }
  ${(props) =>
    props.customFormDesign &&
    css`
      width: 500px;
    `}
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 47%;
  transform: translateY(-50%);
  font-size: 24px;
  cursor: pointer;
`;

export const ErrorMessage = styled.p`
  color: #8a8a8a;
  font-size: 14px;
  font-weight: 400;
  margin: 4px 0px 8px;
`;
