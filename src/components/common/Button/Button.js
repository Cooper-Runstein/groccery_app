import styled from "@emotion/styled";

export const buttonColors = Object.freeze({
  blue: "blue",
  red: "red",
});

const buttonColorsMap = {
  [buttonColors.blue]: "#16E1E6",
  [buttonColors.red]: "#E63A16",
};

const StyledButton = styled.button`
  background: ${({ btnType }) => buttonColorsMap[btnType] ?? "white"};
  border-radius: 4px;
  border: ${({ border }) => (border ? "1px solid black" : "none")};
  color: white;
  cursor: pointer;
  padding: 6px 12px;

  &:hover {
    box-shadow: grey 1px 1px;
  }
`;

export const Button = ({ className, children, border, type, ...btnProps }) => {
  return (
    <StyledButton
      border={border}
      btnType={type}
      className={className}
      {...btnProps}
    >
      {children}
    </StyledButton>
  );
};
