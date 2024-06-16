import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const GridContainer = styled.div`
  display: flex;
  background-color: #2d384d;
  width: 100%;
  height: 100vh;
`;

export const StyledFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  height: 430px;
  width: 450px;
  background-color: #e5e6e9;
  border-radius: 0.5rem;
  box-shadow: rgba(244, 245, 245, 0.12) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.32) 0px 2px 16px 0px;
`;

export const GridForm = styled.form`
  width: 400px;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  @media (max-width: 400px) {
    width: 300px;
  }
`;

export const EyeIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  color: #888888;
  :active {
    color: #1a202c;
  }
`;
