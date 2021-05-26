import { useApp, Views } from "../useApp";

export const useViewSelectors = () => {
  const { getState } = useApp();

  const { view } = getState();
  return {
    isListView: view === Views.list,
    isSelectListView: view === Views.selectList,
  };
};
