import styled from "@emotion/styled";
import { faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useApp } from "../../../App/useApp";
import { colors } from "../../../styles/colors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 64px;
`;

const ListsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListOption = styled.div`
  border-radius: 4px;
  padding: 8px;
  box-shadow: 1px 1px ${colors.charcoal};
  margin-top: 4px;
`;

const ListNameContainer = styled.div`
  padding: 4px;
  display: flex;
  flex-direction: row;
`;

const ListName = styled.div`
  padding-left: 4px;
`;

const Member = styled.div`
  padding: 4px;
  padding-left: 8px;
  font-size: 12px;
`;

export const SelectList = () => {
  const { api, state } = useApp();
  return (
    <Container>
      <h2>My Lists</h2>
      <ListsList>
        {state.lists.map((l) => (
          <ListOption
            key={l.id}
            onClick={() => {
              api.fetchList(l.id);
            }}
          >
            <ListNameContainer>
              <FontAwesomeIcon icon={faList} /> <ListName>{l.name}</ListName>
            </ListNameContainer>
            <Member>
              {l.members.map((email) => (
                <div key={email}>
                  <FontAwesomeIcon icon={faUser} /> <span>{email}</span>
                </div>
              ))}
            </Member>
          </ListOption>
        ))}
      </ListsList>
    </Container>
  );
};
