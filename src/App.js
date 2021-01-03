import Amplify from "aws-amplify";

import React, { useEffect, useState } from "react";
import * as service from "./service";
import awsExports from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";

import { AppWrapper, AddBtnTxt } from "./App.styles";
import { Item } from "./components";
import { Button, buttonColors } from "./components/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

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
    inputName: "",
    inputDescription: "",
    inputQuantity: 1,
    items: [],
  });

  const setItemName = (e) =>
    setState((p) => ({ ...p, inputName: e.target.value }));
  const setItemDescription = (e) =>
    setState((p) => ({ ...p, inputDescription: e.target.value }));
  const setItemQuantity = (e) =>
    setState((p) => ({ ...p, inputQuantity: e.target.value }));

  async function addItem() {
    const item = {
      name: state.inputName,
      description: state.inputDescription,
      quantity: state.inputQuantity,
    };

    try {
      service.addItem(item);
      await fetchAndSetItems();
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
      <div>
        <span>Item: </span>
        <input onChange={setItemName} value={state.inputName} />
      </div>
      <div>
        <span>Description: </span>
        <input onChange={setItemDescription} value={state.inputDescription} />
      </div>
      <div>
        <span>Quantity: {state.inputQuantity}</span>
        <Button>
          <FontAwesomeIcon color={"green"} icon={faArrowUp} />
        </Button>
      </div>
      <div>
        <Button onClick={addItem} type={buttonColors.blue}>
          <AddBtnTxt>Add</AddBtnTxt>
        </Button>
      </div>

      <div>
        {state.items.map((item) => {
          return <Item item={item} deleteItem={deleteItem} />;
        })}
      </div>
    </AppWrapper>
  );
}

export default withAuthenticator(App);
