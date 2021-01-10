import styled from "@emotion/styled";
import { colors } from "../styles/colors";

export const AppWrapper = styled.div`
  color: ${colors.charcoal};
  min-height: 100vh;
  margin: auto;
  max-width: 800px;
  width: 80vw;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  margin-bottom: 8px;
  margin-top: 8px;
`;
