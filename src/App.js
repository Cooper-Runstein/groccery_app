import Amplify from "aws-amplify";

import React, { useEffect, useState } from "react";
import * as service from "./service";
import awsExports from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";

import {
  AppWrapper,
  AddBtnTxt,
  InputSection,
  InputSectionTitle,
} from "./App.styles";
import { Item } from "./components";
import { Button, buttonColors } from "./components/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

Amplify.configure(awsExports);

function App() {
  const fetchAndSetItems = async () => {
    const items = await service.fetchItems();
    setState((p) => ({ ...p, items }));
  };

  useEffect(() => {
    fetchAndSetItems();
  }, []);

  const [state, setState] = useState({
    inputDescription: "",
    inputName: "",
    inputQuantity: 1,
    items: [],
  });

  const setItemName = (e) =>
    setState((p) => ({ ...p, inputName: e.target.value }));
  const setItemDescription = (e) =>
    setState((p) => ({ ...p, inputDescription: e.target.value }));
  const incItemQuantity = () =>
    setState((p) => ({ ...p, inputQuantity: p.inputQuantity + 1 }));
  const decItemQuantity = () =>
    setState((p) => ({ ...p, inputQuantity: p.inputQuantity - 1 }));

  async function addItem() {
    const item = {
      description: state.inputDescription,
      name: state.inputName,
      quantity: state.inputQuantity,
    };

    try {
      service.addItem(item);
      await fetchAndSetItems();
      setState((p) => ({
        ...p,
        inputDescription: "",
        inputName: "",
        inputQuantity: 1,
      }));
    } catch (err) {
      console.log("error creating item:", err);
    }
  }

  async function deleteItem(item) {
    try {
      await service.deleteItem(item.id);
      await fetchAndSetItems();
    } catch (err) {
      console.log("error deleting item:", err);
    }
  }

  return (
    <AppWrapper>
      <h3>Add Item</h3>
      <InputSection>
        <InputSectionTitle>Item*:</InputSectionTitle>
        <input onChange={setItemName} value={state.inputName} />
      </InputSection>

      <InputSection>
        <InputSectionTitle>Quantity*: {state.inputQuantity}</InputSectionTitle>
        <Button border onClick={incItemQuantity}>
          <FontAwesomeIcon color={"green"} icon={faArrowUp} />
        </Button>
        {state.inputQuantity > 1 && (
          <Button border onClick={decItemQuantity}>
            <FontAwesomeIcon color={"red"} icon={faArrowDown} />
          </Button>
        )}
      </InputSection>

      <InputSection>
        <InputSectionTitle>Description:</InputSectionTitle>
        <input onChange={setItemDescription} value={state.inputDescription} />
      </InputSection>

      <InputSection>
        <Button onClick={addItem} type={buttonColors.blue}>
          <AddBtnTxt>Add</AddBtnTxt>
        </Button>
      </InputSection>

      <div>
        {state.items.map((item) => {
          return <Item item={item} deleteItem={deleteItem} />;
        })}
      </div>
    </AppWrapper>
  );
}

export default withAuthenticator(App);
