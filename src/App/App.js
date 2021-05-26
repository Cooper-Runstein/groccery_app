import Amplify from "aws-amplify";

import React from "react";
import awsExports from "../aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";

import { SelectList } from "../components/core/SelectList";
import { List } from "../components/core";
import { Views } from "./useApp";

Amplify.configure(awsExports);

const AppContextWrapper = ({ children }) => {
  const [state, setState] = React.useState({
    items: [],
    lists: [],
    listId: undefined,
    view: Views.selectList,
  });

  const goToListView = () =>
    setState((p) => ({ ...p, view: Views.selectList }));

  return (
    <AppContext.Provider value={{ state, actions: { setState, goToListView } }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return React.useContext(AppContext);
};

const AppContext = React.createContext({
  state: undefined,
  actions: {},
});

function App() {
  const { state } = useAppContext();

  return (
    <div style={{ minHeight: "100vh" }}>
      {state?.view === Views.selectList && <SelectList />}
      {state?.view === Views.list && <List />}
    </div>
  );
}

const WrapperApp = () => {
  return (
    <AppContextWrapper>
      <App />
    </AppContextWrapper>
  );
};

export default withAuthenticator(WrapperApp);
