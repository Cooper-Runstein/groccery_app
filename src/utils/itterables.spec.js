import { removeById } from "./itterables";

describe("removeById", () => {
  it("filters out entities by id", () => {
    const targetId = 123;
    const arr = [{ id: targetId }, { id: 345 }, { id: 678 }];
    const res = removeById(targetId)(arr);
    expect(res).toHaveLength(2);
    expect(res).not.toContainEqual({ id: targetId });
  });
});
