import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { Button, buttonColors } from "../../../common";
import { colors } from "../../../../styles/colors";
import React from "react";

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
    border-left: 4px grey solid;
    //box-shadow: grey 2px 2px;
    cursor: pointer;
    margin-right: -3px;
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
  z-index: 2;
`;

const DeleteButton = styled(Button)`
  cursor: pointer;
`;

const Name = styled.h4`
  text-decoration: ${({ crossed }) => (crossed ? "line-through" : "none")};
`;

const Description = styled.div`
  padding-left: 20vw;
`;

export const Item = React.forwardRef(
  ({ deleteItem, setCrossed, item }, ref) => {
    const handleDeleteItem = (e) => {
      e.stopPropagation();
      deleteItem(item);
    };
    return (
      // We can't use ReactFlipMove with styled components
      <div
        ref={ref}
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          margin: 0,
          padding: 0,
          paddingBottom: "10px",
          width: "100%",
        }}
      >
        <Container
          crossed={item.crossed}
          onClick={() => setCrossed(!item.crossed)}
        >
          <MainLine>
            <Name key={item.id} crossed={item.crossed}>
              {item.name}
            </Name>
            <p>{item.quantity}</p>
            <ButtonContainer>
              <DeleteButton onClick={handleDeleteItem} type={buttonColors.red}>
                <FontAwesomeIcon color={"white"} icon={faTrashAlt} />
              </DeleteButton>
            </ButtonContainer>
          </MainLine>
          <Description>{item.description}</Description>
        </Container>
      </div>
    );
  }
);
