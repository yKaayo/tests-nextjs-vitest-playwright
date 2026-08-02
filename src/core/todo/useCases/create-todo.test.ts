import { makeTestTodoRepository } from "@/core/__tests__/make-test-todo-respository";
import { InvalidatedTodo, ValidatedTodo } from "../schemas/todo.contract";
import { createTodoUseCase } from "./create-todo";

const { deleteAllTodos } = makeTestTodoRepository();

describe("createTodoUseCase (integration)", () => {
  beforeEach(() => {
    deleteAllTodos();
  });

  test("should fail when description is empty", async () => {
    const invalidTodo = (await createTodoUseCase("")) as InvalidatedTodo;

    expect(invalidTodo.success).toBe(false);
    expect(invalidTodo.errors).toStrictEqual([
      "Descrição deve ter mais de 3 caracteres",
    ]);
  });

  test("should fail when description has less than 3 characters", async () => {
    const invalidTodo = (await createTodoUseCase("12")) as InvalidatedTodo;

    expect(invalidTodo.success).toBe(false);
    expect(invalidTodo.errors).toStrictEqual([
      "Descrição deve ter mais de 3 caracteres",
    ]);
  });

  test("should return the Todo if valid", async () => {
    const validTodo = (await createTodoUseCase(
      "any description",
    )) as ValidatedTodo;

    expect(validTodo.success).toBe(true);
    expect(validTodo.todo).toStrictEqual({
      createdAt: expect.any(String),
      description: "any description",
      id: expect.any(String),
    });
  });

  test("should fail when try to create two todo with a same description", async () => {
    await createTodoUseCase("any description");
    const invalidTodo = (await createTodoUseCase(
      "any description",
    )) as InvalidatedTodo;

    expect(invalidTodo.success).toBe(false);
    expect(invalidTodo.errors).toStrictEqual(["Já existe esse todo!"]);
  });
});
