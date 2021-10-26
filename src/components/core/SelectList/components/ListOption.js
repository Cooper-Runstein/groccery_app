import styled from "@emotion/styled";
import { faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../../../../styles/colors";
import { Button } from "../../../common";

const ListOptionContainer = styled.div`
  border-radius: 4px;
  box-shadow: 1px 1px ${colors.charcoal};
  cursor: pointer;
  margin-top: 4px;
  padding: 8px;
`;

const ListNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 4px;
`;

const ListName = styled.div`
  padding-left: 4px;
`;

const Member = styled.div`
  font-size: 12px;
  padding-left: 8px;
  padding: 4px;
`;

export const ListOption = ({ list, fetchList, deleteList }) => {
  return (
    <ListOptionContainer
      key={list.id}
      onClick={() => {
        fetchList(list.id);
      }}
    >
      <ListNameContainer>
        <FontAwesomeIcon icon={faList} /> <ListName>{list.name}</ListName>
      </ListNameContainer>
      <Member>
        {list.members.map((email) => (
          <div key={email}>
            <FontAwesomeIcon icon={faUser} /> <span>{email}</span>
          </div>
        ))}
      </Member>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          deleteList(list);
        }}
        type={"red"}
      >
        Delete List
      </Button>
    </ListOptionContainer>
  );
};
