import { Auth } from "aws-amplify";
import React, { useEffect } from "react";
import * as service from "../service/service";
import { useAppContext } from "./App";

export const Views = {
  list: "list_view",
  selectList: "select_list",
};

const filterOut = (remove) => (compare) => !compare === remove;

export function useApp() {
  const {
    state,
    actions: { setState },
  } = useAppContext();

  /************************************
   ********* SUBSCRIPTIONS ************
   ************************************/
  const onCreateItem = React.useCallback(
    (newItemData) => {
      const newItem = newItemData.value.data.onCreateItem;
      setState((p) => ({ ...p, items: [...p.items, newItem] }));
    },
    [setState]
  );

  /*HANDLE CREATE ITEM SUBSCRIPTION*/
  React.useEffect(() => {
    const subscription = service.getCreateItemSubscription(onCreateItem);
    return () => subscription.unsubscribe();
  }, [onCreateItem]);

  const onUpdateItem = React.useCallback(
    (newItemData) => {
      const newItem = newItemData.value.data.onUpdateItem;
      setState((p) => ({
        ...p,
        items: p.items.map((i) => (i.id === newItem.id ? newItem : i)),
      }));
    },
    [setState]
  );

  /*HANDLE UPDATE ITEM SUBSCRIPTION*/
  React.useEffect(() => {
    const subscription = service.getUpdateItemSubscription(onUpdateItem);
    return () => subscription.unsubscribe();
  }, [onUpdateItem]);

  const onDeleteItem = React.useCallback(
    (removedItemData) => {
      const removedItem = removedItemData.value.data.onDeleteItem;
      setState((p) => ({
        ...p,
        items: p.items.filter((item) => filterOut(removedItem.id)(item.id)),
      }));
    },
    [setState]
  );

  /*HANDLE DELETE ITEM SUBSCRIPTION*/
  React.useEffect(() => {
    const subscription = service.getDeleteItemSubscription(onDeleteItem);
    return () => subscription.unsubscribe();
  }, [onDeleteItem]);

  /************************************
   ********* AUTH ************
   ************************************/

  const getCurrentUserInfo = async () => {
    return await Auth.currentUserInfo();
  };

  /************************************
   ********* FETCH  ************
   ************************************/

  const fetchListsForUser = React.useCallback(async () => {
    const user = await getCurrentUserInfo();
    const email = user.attributes.email;
    const lists = await service.fetchListsForUser(email);
    setState((prev) => ({ ...prev, lists }));
  }, [setState]);

  const fetchList = React.useCallback(
    async (id) => {
      const list = await service.fetchList(id);
      const items = list.items.items;
      setState((p) => ({ ...p, items, listId: list.id, view: Views.list }));
    },
    [setState]
  );

  /************************************
   ********* MUTATIONS ************
   ************************************/

  async function addItem(item) {
    try {
      service.addItem({ ...item, itemListId: state.listId });
    } catch (err) {
      console.log("error creating item:", err);
    }
  }

  async function deleteItem(deleteItem) {
    try {
      await service.deleteItem(deleteItem.id);
      // setState((p) => ({
      //   ...p,
      //   items: p.items.filter((item) => filterOut(deleteItem.id)(item.id)),
      // }));
    } catch (err) {
      console.log("error deleting item:", err);
    }
  }

  const setCrossItem = (id) => (crossed) => {
    // Update local state immediately, so UI doesn't have to wait for event
    setState((p) => ({
      ...p,
      items: p.items.map((i) => (i.id === id ? { ...i, crossed } : i)),
    }));
    service.updateItem({ id, crossed });
  };

  /************************************
   ********* USE EFFECTS ************
   ************************************/

  useEffect(() => {
    fetchListsForUser();
  }, [fetchListsForUser]);

  return {
    api: {
      addItem,
      deleteItem,
      fetchList,
      setCrossItem,
    },
    state,
  };
}
