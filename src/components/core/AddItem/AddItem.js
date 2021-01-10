import React from "react";

import { Button, buttonColors } from "../../common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";

const AddBtnTxt = styled.span`
  color: white;
`;

const InputSection = styled.div`
  padding: 8px;
`;

const InputSectionTitle = styled.span`
  padding-right: 4px;
`;

export const AddItem = ({ alterState, api, state }) => {
  return (
    <>
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
    </>
  );
};
