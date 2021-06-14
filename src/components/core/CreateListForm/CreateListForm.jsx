import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useApp } from "../../../App/useApp";
import styled from "@emotion/styled";
import { Button } from "../../common";

const Container = styled.div`
  margin-top: 12px;
`;

const CloseButton = styled(Button)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 4px 6px;
`;

export const CreateListForm = () => {
  const emptyMember = { email: "" };
  const [state, setState] = React.useState({
    open: false,
    members: [emptyMember],
    name: "",
  });

  const {
    api: { addList },
  } = useApp();

  const toggleOpen = () => setState((p) => ({ ...p, open: !p.open }));

  const addNewMember = () =>
    setState((p) => ({
      ...p,
      members: [...p.members, emptyMember],
    }));

  const updateMember = (idx, newEmail) => {
    setState((p) => ({
      ...p,
      members: p.members.map((m, i) => (i === idx ? { email: newEmail } : m)),
    }));
  };

  const setName = (name) => {
    setState((p) => ({
      ...p,
      name,
    }));
  };

  const removeMember = (idx) => {
    setState((p) => ({
      ...p,
      members: p.members.filter((_, i) => !(i === idx)),
    }));
  };

  const submit = async () => {
    const list = {
      name: state.name,
      members: state.members.map((m) => m.email),
    };

    toggleOpen();
    await addList(list);

    console.log("LIST ADDED");
  };

  return (
    <Container>
      {state.open ? (
        <div>
          <div>
            <label>List Name: </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={state.name}
            ></input>
          </div>
          <div>
            <label>Members</label>
            {state.members.map(({ email }, idx) => (
              <div>
                <label>Email:</label>
                <input
                  onChange={(e) => updateMember(idx, e.target.value)}
                  value={email}
                />
                <CloseButton onClick={() => removeMember(idx)}>
                  <FontAwesomeIcon icon={faTimes} color={"red"} />
                </CloseButton>
              </div>
            ))}
            <Button onClick={addNewMember}>Add Another Member</Button>
          </div>
          <Button onClick={toggleOpen} type="red">
            Cancel
          </Button>
          <Button onClick={submit} type="blue">
            Create
          </Button>
        </div>
      ) : (
        <Button onClick={toggleOpen} type="blue">
          Add A List
        </Button>
      )}
    </Container>
  );
};
