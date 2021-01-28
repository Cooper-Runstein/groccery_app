import React, { useEffect, useState } from "react";
import * as service from "../service/service";

export function useApp() {
  const [state, setState] = useState({
    items: [],
  });

  /************************************
   ********* SUBSCRIPTIONS ************
   ************************************/
  const onCreateItem = React.useCallback((newItemData) => {
    const newItem = newItemData.value.data.onCreateItem;
    setState((p) => ({ ...p, items: [...p.items, newItem] }));
  }, []);

  /*HANDLE CREATE ITEM SUBSCRIPTION*/
  React.useEffect(() => {
    const subscription = service.getCreateItemSubscription(onCreateItem);
    return () => subscription.unsubscribe();
  }, [onCreateItem]);

  const onUpdateItem = React.useCallback((newItemData) => {
    const newItem = newItemData.value.data.onUpdateItem;
    setState((p) => ({
      ...p,
      items: p.items.map((i) => (i.id === newItem.id ? newItem : i)),
    }));
  }, []);

  /*HANDLE UPDATE ITEM SUBSCRIPTION*/
  React.useEffect(() => {
    const subscription = service.getUpdateItemSubscription(onUpdateItem);
    return () => subscription.unsubscribe();
  }, [onUpdateItem]);

  const onDeleteItem = React.useCallback((removedItemData) => {
    const removedItem = removedItemData.value.data.onDeleteItem;
    setState((p) => ({
      ...p,
      items: p.items.filter((i) => !i.id === removedItem.id),
    }));
  }, []);

  /*HANDLE DELETE ITEM SUBSCRIPTION*/
  React.useEffect(() => {
    const subscription = service.getDeleteItemSubscription(onDeleteItem);
    return () => subscription.unsubscribe();
  }, [onDeleteItem]);

  const fetchAndSetItems = async () => {
    const items = await service.fetchItems();
    setState((p) => ({ ...p, items }));
  };

  const fetchLists = async () => {
    await service.fetchLists();
  };

  useEffect(() => {
    fetchLists();
    fetchAndSetItems();
  }, []);

  async function addItem(item) {
    try {
      service.addItem(item);
      setState((p) => ({
        ...p,
        inputDescription: "",
        inputName: "",
        inputQuantity: 1,
      }));
    } catch (err) {
      console.log("error creating item:", err);
    }
  }

  async function deleteItem(item) {
    try {
      await service.deleteItem(item.id);
      await fetchAndSetItems();
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

  return {
    api: {
      deleteItem,
      addItem,
      setCrossItem,
    },
    state,
  };
}
