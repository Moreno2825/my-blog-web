import styled from "@emotion/styled";

export const ButtonStyled = styled.button`
  color: white;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  height: 45px;
  background-color: ${(props) =>
    props.customDesign?.backgroundColor || "#2d384d"};

  &:hover {
    background-color: ${(props) =>
      props.customDesign?.hoverBackgroundColor || "#1e2533"};
  }
`;
