import Amplify from "aws-amplify";

import React from "react";
import awsExports from "../aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { List } from "../components";

import { AppWrapper } from "./App.styles";

Amplify.configure(awsExports);

function App() {
  return (
    <AppWrapper>
      <List />
    </AppWrapper>
  );
}

export default withAuthenticator(App);
