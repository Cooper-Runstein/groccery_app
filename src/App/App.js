import Amplify from "aws-amplify";

import React from "react";
import awsExports from "../aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";

import { AppWrapper } from "./App.styles";
import { AddItem, Drawer, Item } from "../components";

import { useApp } from "./useApp";

Amplify.configure(awsExports);

function App() {
  const { api, alterState, state } = useApp();

  return (
    <AppWrapper>
      <Drawer>
        <AddItem api={api} alterState={alterState} state={state} />
      </Drawer>

      <div>
        {state.items.map((item) => {
          return (
            <Item
              item={item}
              deleteItem={api.deleteItem}
              setCrossed={api.setCrossItem(item.id)}
            />
          );
        })}
      </div>
    </AppWrapper>
  );
}

export default withAuthenticator(App);
