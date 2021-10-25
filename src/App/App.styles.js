import styled from "@emotion/styled";
import { colors } from "../styles/colors";

export const AppWrapper = styled.div`
  color: ${colors.charcoal};
  min-height: 100vh;
  margin: auto;
  max-width: 800px;
  width: 80vw;
`;

export const AppHeader = styled.div`
  align-items: center;
  display: flex;
  font-size: 24px;
  font-weight: 600;
  justify-content: center;
  height: 15%;
  padding: 16px;
  width: 100%;
`;
