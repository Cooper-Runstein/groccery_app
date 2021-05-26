function sortItems(a, b) {
  if (!a.crossed && b.crossed) {
    return -1;
  }
  if (a.crossed && !b.crossed) {
    return 1;
  }
  return 0;
}

export const getSortedItems = (state) => state.items.sort(sortItems);
