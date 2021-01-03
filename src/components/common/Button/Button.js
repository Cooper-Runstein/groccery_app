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
  border: none;
  padding: 4px 8px;

  &:hover{
    box-shadow: grey 1px 1px;
  }
}
`;

export const Button = ({ children, type, ...btnProps }) => {
  return (
    <StyledButton btnType={type} {...btnProps}>
      {children}
    </StyledButton>
  );
};
