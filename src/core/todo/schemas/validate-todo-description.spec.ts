import { validateTodoDescription } from "./validate-todo-description";

describe("validateTodoDescription (unit)", () => {
  it("return a error when description length is less than 4 characters", () => {
    const result = validateTodoDescription("hi");

    expect(result.success).toStrictEqual(false);
    expect(result.errors).toStrictEqual([
      "Descrição deve ter mais de 3 caracteres",
    ]);
  });

  it("return sucess when description length is more than 3 characters", () => {
    const result = validateTodoDescription("abcd");

    expect(result.success).toStrictEqual(true);
    expect(result.errors).toStrictEqual([]);
  });
});
