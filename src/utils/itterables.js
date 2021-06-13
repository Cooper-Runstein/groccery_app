import { filter, pipe, prop } from "lodash/fp";

export const filterOut = (remove) => (compare) => !(compare === remove);
export const removeById = (removeId) =>
  filter(pipe(prop("id"), filterOut(removeId)));
