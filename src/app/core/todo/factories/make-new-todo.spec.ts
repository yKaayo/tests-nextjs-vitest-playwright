import { makeNewTodo } from "./make-new-todo";

describe("makeNewTodo (unit)", () => {
  it("return a new todo", () => {
    const expectedTodo = {
      id: expect.any(String),
      description: "homework",
      createdAt: expect.any(String),
    };

    const newTodo = makeNewTodo("homework")

    expect(newTodo).toStrictEqual(expectedTodo)
    expect(newTodo.description).toBe(expectedTodo.description)
  });
});
