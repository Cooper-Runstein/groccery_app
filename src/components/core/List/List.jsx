import styled from "@emotion/styled";
import { useApp } from "../../../App/useApp";
import { AddItem } from "./AddItem/AddItem";
import { Item } from "./Item";

import { Drawer } from ".././../common";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  margin-bottom: 8px;
  margin-top: 8px;
`;

function sortItems(a, b) {
  if (!a.crossed && b.crossed) {
    return -1;
  }
  if (a.crossed && !b.crossed) {
    return 1;
  }
  return 0;
}

export const List = () => {
  const { api, state } = useApp();
  return (
    <>
      <Drawer>
        <AddItem api={api} />
      </Drawer>
      <ListContainer>
        <Title>ITEMS</Title>
        {state.items.sort(sortItems).map((item) => {
          return (
            <Item
              key={item.id}
              item={item}
              deleteItem={api.deleteItem}
              setCrossed={api.setCrossItem(item.id)}
            />
          );
        })}
      </ListContainer>
    </>
  );
};
