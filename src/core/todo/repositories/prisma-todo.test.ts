import { makeTestTodoRepository } from "@/core/__tests__/make-test-todo-respository";
import { InvalidatedTodo, ValidatedTodo } from "../schemas/todo.contract";

const { repository, deleteAllTodos, exampleTodos } = makeTestTodoRepository();

describe("prismaTodoRepository (integration)", () => {
  beforeEach(() => {
    deleteAllTodos();
  });

  describe("findFirstById", () => {
    test("should return null when no exist to-do items", async () => {
      const result = await repository.findFirstById("1");

      expect(result).toStrictEqual(null);
    });

    test("should return the first to-do item when exist with the same properties", async () => {
      const descriptionTodo = exampleTodos(1)[0];
      const newTodo = (await repository.create(
        descriptionTodo,
      )) as ValidatedTodo;

      const { id, description, createdAt } = newTodo.todo;

      const result = await repository.findFirstById(newTodo.todo.id);

      expect(result).toStrictEqual({
        id,
        description,
        createdAt,
      });
    });
  });

  describe("findFirstByDescription", () => {
    test("should return null when no exist to-do items", async () => {
      const result = await repository.findFirstByDescription("any description");

      expect(result).toStrictEqual(null);
    });

    test("should return the first to-do item when exist with the same properties", async () => {
      const descriptionTodo = exampleTodos(1)[0];
      const newTodo = (await repository.create(
        descriptionTodo,
      )) as ValidatedTodo;

      const { id, description, createdAt } = newTodo.todo;

      const result = await repository.findFirstByDescription(description);

      expect(result).toStrictEqual({
        id,
        description,
        createdAt,
      });
    });
  });

  describe("findAll", () => {
    test("should return a empty array when no exist to-do items", async () => {
      const result = await repository.findAll();

      expect(result).toStrictEqual([]);
    });

    test("should return all to-do items in descending order", async () => {
      const descriptionsTodo = exampleTodos(3);
      const todos = [];

      for (const descriptionTodo of descriptionsTodo) {
        const todoData = (await repository.create(
          descriptionTodo,
        )) as ValidatedTodo;

        const { todo } = todoData;
        todos.push(todo);
      }

      const result = await repository.findAll();
      expect(result).toStrictEqual([...todos].reverse());
    });
  });

  describe("create", async () => {
    test("should create a new to-do item", async () => {
      const description = exampleTodos(1)[0];
      const newTodo = (await repository.create(description)) as ValidatedTodo;

      expect(newTodo).toStrictEqual({
        success: true,
        todo: {
          createdAt: expect.any(String),
          description: description.description,
          id: expect.any(String),
        },
      });

      // Verify that the repository was created with the new todo
      const allTodos = await repository.findAll();
      expect(allTodos).toStrictEqual([newTodo.todo]);
    });

    test("should fail to create a new to-do item if the description already exists", async () => {
      const description = exampleTodos(1)[0];
      const newTodo = (await repository.create(description)) as ValidatedTodo;

      const sameTodo = (await repository.create(
        description,
      )) as InvalidatedTodo;

      expect(sameTodo.success).toStrictEqual(false);
      expect(sameTodo.errors).toStrictEqual(["Já existe esse todo!"]);

      // Verify that the repository still contains only the first created todo
      const allTodos = await repository.findAll();
      expect(allTodos).toStrictEqual([newTodo.todo]);
    });
  });

  describe("delete", () => {
    test("should delete a to-do item if it exists", async () => {
      const description = exampleTodos(1)[0];
      const newTodo = (await repository.create(description)) as ValidatedTodo;

      const result = await repository.delete(newTodo.todo.id);
      expect(result).toStrictEqual({
        success: true,
        todo: newTodo.todo,
      });

      // Verify that the repository is empty after deletion
      const allTodos = await repository.findAll();
      expect(allTodos).toStrictEqual([]);
    });

    test("should fail if do not find the todo id", async () => {
      const description = exampleTodos(1)[0];
      const newTodo = (await repository.create(description)) as ValidatedTodo;

      const result = (await repository.delete("any id")) as InvalidatedTodo;
      expect(result.success).toStrictEqual(false);
      expect(result.errors).toStrictEqual(["Todo não encontrado!"]);

      // Verify that the repository still contains only the first created todo
      const allTodos = await repository.findAll();
      expect(allTodos).toStrictEqual([newTodo.todo]);
    });
  });
});
