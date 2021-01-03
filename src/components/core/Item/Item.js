import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { Button, buttonColors } from "../../common";

const MainLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const Description = styled.div`
  padding-left: 20vw;
`;

export const Item = ({ deleteItem, item }) => {
  return (
    <div>
      <MainLine>
        <h4 key={item.id}>{item.name}</h4>
        <p>{item.quantity}</p>
        <Button onClick={() => deleteItem(item)} type={buttonColors.red}>
          <FontAwesomeIcon color={"white"} icon={faTrashAlt} />
        </Button>
      </MainLine>
      <Description>{item.description}</Description>
    </div>
  );
};
