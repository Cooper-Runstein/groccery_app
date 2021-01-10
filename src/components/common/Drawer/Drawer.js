import styled from "@emotion/styled";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactDOM from "react-dom";

import { animated, useSpring } from "react-spring";

const Container = styled(animated.div)`
  background: #ebf7f6;
  border-radius: 16px 16px 0 0;
  position: sticky;
  bottom: 0;
  overflow: hidden;
  padding-left: 32px;
  width: 100%;
`;

const Control = styled.div`
  align-items: center;
  background: #ebf7f6;
  border-radius: 16px 16px 0 0;
  display: flex;
  flex-direction: row;
  height: 64px;
  justify-content: center;
`;

const Background = styled.div`
  background: rgba(247, 247, 247, 0.6);
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
`;

export const Drawer = ({ children }) => {
  const [state, setState] = React.useState({
    clicked: false,
    isOpen: false,
  });

  const props = useSpring({ height: state.clicked ? "332px" : "64px" });

  const iconProps = useSpring({
    transform: state.clicked ? "rotate(180deg)" : "rotate(0deg)",
  });

  const root = document.getElementById("root");

  const toggleClick = () => setState((p) => ({ ...p, clicked: !p.clicked }));

  const Comp = () => {
    return (
      <>
        {state.clicked && <Background onClick={toggleClick} />}
        <Container style={props}>
          <Control onClick={toggleClick}>
            <animated.span style={iconProps}>
              <FontAwesomeIcon color={"white"} icon={faChevronUp} size={"2x"} />
            </animated.span>
          </Control>
          {children}
        </Container>
      </>
    );
  };

  return ReactDOM.createPortal(<Comp />, root);
};
