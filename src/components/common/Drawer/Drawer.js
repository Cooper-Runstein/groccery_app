import styled from "@emotion/styled";
import React from "react";
import ReactDOM from "react-dom";

import { animated, useSpring } from "react-spring";

const Container = styled(animated.div)`
  background: #ebf7f6;
  border-radius: 16px 16px 0 0;
  position: sticky;
  bottom: 0;
  overflow: hidden;
  width: 100%;
`;

const Control = styled.div`
  background: #ebf7f6;
  border-radius: 16px 16px 0 0;
  border-bottom: 1px white solid;
  height: 32px;
`;

export const Drawer = ({ children }) => {
  const [state, setState] = React.useState({
    clicked: false,
    isOpen: false,
  });

  const props = useSpring({ height: state.clicked ? "332px" : "32px" });

  const root = document.getElementById("root");

  const Comp = () => {
    return (
      <Container style={props}>
        <Control
          onClick={() => setState((p) => ({ ...p, clicked: !p.clicked }))}
        />
        {children}
      </Container>
    );
  };

  return ReactDOM.createPortal(<Comp />, root);
};
