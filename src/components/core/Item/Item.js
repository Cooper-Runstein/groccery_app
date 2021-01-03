import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { Button, buttonColors } from "../../common";

export const Item = ({ deleteItem, item }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <h4 key={item.id}>{item.name}</h4>
      <p>{item.description}</p>
      <p>{item.quantity}</p>
      <Button onClick={() => deleteItem(item)} type={buttonColors.red}>
        <FontAwesomeIcon color={"white"} icon={faTrashAlt} />
      </Button>
    </div>
  );
};
