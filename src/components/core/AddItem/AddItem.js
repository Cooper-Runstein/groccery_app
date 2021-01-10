import React from "react";

import { Button, buttonColors } from "../../common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";

const Container = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AddBtnTxt = styled.span`
  color: white;
`;

const InputSection = styled.div`
  padding: 8px;
`;

const InputSectionTitle = styled.span`
  padding-right: 4px;
`;

const useAddItems = (api) => {
  const [state, setState] = React.useState({
    inputDescription: "",
    inputName: "",
    inputQuantity: 1,
  });

  const getInputValue = (e) => e.target.value;

  const setValueAtKey = (k) => (e) =>
    setState((p) => ({ ...p, [k]: getInputValue(e) }));

  const setItemName = setValueAtKey("inputName");
  const setItemDescription = setValueAtKey("inputDescription");

  const incItemQuantity = () =>
    setState((p) => ({ ...p, inputQuantity: p.inputQuantity + 1 }));
  const decItemQuantity = () =>
    setState((p) => ({ ...p, inputQuantity: p.inputQuantity - 1 }));

  const item = {
    description: state.inputDescription,
    name: state.inputName,
    quantity: state.inputQuantity,
  };

  return {
    api: {
      addItem: () => api.addItem(item),
    },
    alterState: {
      decItemQuantity,
      incItemQuantity,
      setItemDescription,
      setItemName,
    },
    state,
  };
};

export const AddItem = ({ api: globalApi }) => {
  const { api, alterState, state } = useAddItems(globalApi);

  return (
    <Container>
      <h3>Add Item</h3>
      <InputSection>
        <InputSectionTitle>Item*:</InputSectionTitle>
        <input onChange={alterState.setItemName} value={state.inputName} />
      </InputSection>

      <InputSection>
        <InputSectionTitle>Quantity*: {state.inputQuantity}</InputSectionTitle>
        <Button border onClick={alterState.incItemQuantity}>
          <FontAwesomeIcon color={"green"} icon={faArrowUp} />
        </Button>
        {state.inputQuantity > 1 && (
          <Button border onClick={alterState.decItemQuantity}>
            <FontAwesomeIcon color={"red"} icon={faArrowDown} />
          </Button>
        )}
      </InputSection>

      <InputSection>
        <InputSectionTitle>Description:</InputSectionTitle>
        <input
          onChange={alterState.setItemDescription}
          value={state.inputDescription}
        />
      </InputSection>

      <InputSection>
        <Button onClick={api.addItem} type={buttonColors.blue}>
          <AddBtnTxt>Add</AddBtnTxt>
        </Button>
      </InputSection>
    </Container>
  );
};
