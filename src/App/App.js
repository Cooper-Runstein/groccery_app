import Amplify from "aws-amplify";

import React from "react";
import awsExports from "../aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";

import { AppWrapper, List } from "./App.styles";
import { AddItem, Drawer, Item } from "../components";

import { useApp } from "./useApp";

Amplify.configure(awsExports);

function App() {
  const { api, state } = useApp();

  return (
    <AppWrapper>
      <Drawer>
        <AddItem api={api} />
      </Drawer>

      <List>
        <h2>ITEMS</h2>
        {state.items.map((item) => {
          return (
            <Item
              key={item.id}
              item={item}
              deleteItem={api.deleteItem}
              setCrossed={api.setCrossItem(item.id)}
            />
          );
        })}
      </List>
    </AppWrapper>
  );
}

export default withAuthenticator(App);
