import { makeTestTodoRepository } from "@/core/__tests__/make-test-todo-respository";
import { InvalidatedTodo, ValidatedTodo } from "../schemas/todo.contract";
import { createTodoUseCase } from "./create-todo";
import { deleteTodoUseCase } from "./delete-todo";

const { deleteAllTodos, exampleTodos } = makeTestTodoRepository();

describe("deleteTodoUseCase (integration)", () => {
  // beforeEach(() => {
  //   deleteAllTodos();
  // });

  test("should fail when id is invalid", async () => {
    const todo = (await deleteTodoUseCase("")) as InvalidatedTodo;

    expect(todo.success).toBe(false);
    expect(todo.errors).toStrictEqual(["ID inválido"]);
  });

  test("should return error if todo does not exist", async () => {
    const todo = (await deleteTodoUseCase("false id")) as InvalidatedTodo;

    expect(todo.success).toBe(false);
    expect(todo.errors).toStrictEqual(["Todo não encontrado!"]);
  });

  test("should return success if todo is valid", async () => {
    const newTodo = exampleTodos(1);

    const { todo } = (await createTodoUseCase(
      newTodo[0].description,
    )) as ValidatedTodo;
    const deletedTodo = (await deleteTodoUseCase(todo.id)) as ValidatedTodo;

    expect(deletedTodo.success).toBe(true);
    expect(deletedTodo.todo).toStrictEqual(todo);
  });
});
