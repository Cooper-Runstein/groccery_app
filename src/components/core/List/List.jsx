import styled from "@emotion/styled";
import { useApp } from "../../../App/useApp";
import { AddItem } from "./AddItem/AddItem";
import { Item } from "./Item";

import FlipMove from "react-flip-move";

import { Drawer } from ".././../common";
import { useAppContext } from "../../../App/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { getActiveList } from "../../../selectors/getActiveList/getActiveList";
import { getSortedItems } from "../../../selectors/getSortedItems";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const BackToLists = styled.div`
  padding: 16px;
  text-decoration: underline;
`;

export const Title = styled.h2`
  margin-bottom: 8px;
  margin-top: 8px;
`;

export const List = () => {
  const { api } = useApp();
  const {
    state,
    actions: { goToListView },
  } = useAppContext();

  const activeList = getActiveList(state);
  const sortedItems = getSortedItems(state);

  return (
    <>
      <Drawer>
        <AddItem api={api} />
      </Drawer>
      <ListContainer>
        <h1>{activeList.name}</h1>
        <Title>ITEMS</Title>
        <BackToLists onClick={goToListView}>
          <FontAwesomeIcon icon={faLongArrowAltLeft} /> Back to my lists
        </BackToLists>
        <FlipMove duration={500}>
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              deleteItem={api.deleteItem}
              setCrossed={api.setCrossItem(item.id)}
            />
          ))}
        </FlipMove>
      </ListContainer>
    </>
  );
};
