import { Auth } from "aws-amplify";
import React, { useEffect } from "react";
import * as service from "../service/service";
import { removeById } from "../utils/itterables";
import { useAppContext } from "./App";

export const Views = {
  list: "list_view",
  selectList: "select_list",
};

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
      console.log("ON UPDATE ITEM");
      const newItem = newItemData.value.data.onUpdateItem;
      console.log({ newItem });
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
        items: removeById(removedItem.id)(p.items),
      }));
    },
    [setState]
  );

  /*HANDLE DELETE ITEM SUBSCRIPTION*/
  React.useEffect(() => {
    const subscription = service.getDeleteItemSubscription(onDeleteItem);
    return () => subscription.unsubscribe();
  }, [onDeleteItem]);

  const onDeleteList = React.useCallback(
    (removedListData) => {
      const removedList = removedListData.value.data.onDeleteList;

      setState((p) => ({
        ...p,
        lists: removeById(removedList.id)(p.lists),
      }));
    },
    [setState]
  );

  /*HANDLE DELETE LIST SUBSCRIPTION*/
  React.useEffect(() => {
    const subscription = service.getDeleteListSubscription(onDeleteList);
    return () => subscription.unsubscribe();
  }, [onDeleteList]);

  const onCreateList = React.useCallback(
    (newListData) => {
      const newList = newListData.value.data.onCreateList;

      if (!!state.lists.find(({ id }) => id === newList.id)) return;
      setState((p) => ({
        ...p,
        lists: [...p.lists, newList],
      }));
    },
    [setState, state]
  );

  /*HANDLE CREATE LIST SUBSCRIPTION*/
  React.useEffect(() => {
    const subscription = service.getCreateListSubscription(onCreateList);
    return () => subscription.unsubscribe();
  }, [onCreateList]);

  /************************************
   ********* AUTH ************
   ************************************/

  const getCurrentUserInfo = async () => {
    return await Auth.currentUserInfo();
  };

  /************************************
   ********* FETCH  ************
   ************************************/

  const fetchHouseholdsForUser = React.useCallback(async () => {
    const user = await getCurrentUserInfo();
    const email = user.attributes.email;
    const households = await service.fetchHouseholdsForUser(email);
    setState((prev) => ({ ...prev, households }));
  }, [setState]);

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

  async function addList(list) {
    try {
      service.addList(list);
    } catch (err) {
      console.log("error creating list:", err);
    }
  }

  async function deleteItem(deleteItem) {
    try {
      await service.deleteItem(deleteItem.id);
      setState((p) => ({
        ...p,
        items: removeById(deleteItem)(p.items),
      }));
    } catch (err) {
      console.log("error deleting item:", err);
    }
  }

  async function deleteList(deleteList) {
    try {
      await service.deleteList(deleteList.id);
      setState((p) => {
        console.log({ p });
        return {
          ...p,
          lists: removeById(deleteList)(p.lists),
        };
      });
    } catch (err) {
      console.log("error deleting list:", err);
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

  useEffect(() => {
    fetchHouseholdsForUser();
  }, [fetchHouseholdsForUser]);

  return {
    api: {
      addItem,
      addList,
      deleteItem,
      deleteList,
      fetchList,
      setCrossItem,
    },
    state,
  };
}
