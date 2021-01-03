import Amplify from "aws-amplify";

import React from "react";
import awsExports from "../aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";

import {
  AppWrapper,
  AddBtnTxt,
  InputSection,
  InputSectionTitle,
} from "./App.styles";
import { Item } from "../components";
import { Button, buttonColors } from "../components/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useApp } from "./useApp";

Amplify.configure(awsExports);

function App() {
  const { api, alterState, state } = useApp();

  return (
    <AppWrapper>
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

      <div>
        {state.items.map((item) => {
          return <Item item={item} deleteItem={api.deleteItem} />;
        })}
      </div>
    </AppWrapper>
  );
}

export default withAuthenticator(App);
