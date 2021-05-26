export const getActiveList = (state) =>
  state.lists.find(({ id }) => id === state.listId);
