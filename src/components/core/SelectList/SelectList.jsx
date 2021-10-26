import styled from "@emotion/styled";
import { useApp } from "../../../App/useApp";
import { CreateListForm } from "../CreateListForm";
import { ListOption } from "./components/ListOption";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 32px 64px;
`;

const ListsList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectList = () => {
  const { api, state } = useApp();
  return (
    <Container>
      <h2>My Lists</h2>
      <ListsList>
        {state.lists.map((list) => (
          <ListOption
            deleteList={api.deleteList}
            fetchList={api.fetchList}
            list={list}
          />
        ))}
      </ListsList>
      <CreateListForm />
    </Container>
  );
};
