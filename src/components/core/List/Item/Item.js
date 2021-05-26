import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { Button, buttonColors } from "../../../common";
import { colors } from "../../../../styles/colors";

const Container = styled.div`
  background: ${({ crossed }) => (crossed ? "#A0A0A0" : "#fff")};
  border: 1px solid ${colors.charcoal};
  border-radius: 4px;
  box-shadow: grey 0px 2px;
  color: ${colors.charcoal};
  padding: 16px;
  margin-bottom: 8px;
  width: 90%;

  :hover {
    border: 2px grey solid;
    box-shadow: grey 2px 2px;
    cursor: pointer;
  }
`;

const MainLine = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Name = styled.h4`
  text-decoration: ${({ crossed }) => (crossed ? "line-through" : "none")};
`;

const Description = styled.div`
  padding-left: 20vw;
`;

export const Item = ({ deleteItem, setCrossed, item }) => {
  return (
    <Container crossed={item.crossed} onClick={() => setCrossed(!item.crossed)}>
      <MainLine>
        <Name key={item.id} crossed={item.crossed}>
          {item.name}
        </Name>
        <p>{item.quantity}</p>
        <ButtonContainer>
          <Button onClick={() => deleteItem(item)} type={buttonColors.red}>
            <FontAwesomeIcon color={"white"} icon={faTrashAlt} />
          </Button>
        </ButtonContainer>
      </MainLine>
      <Description>{item.description}</Description>
    </Container>
  );
};
