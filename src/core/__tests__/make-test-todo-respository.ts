import { PrismaTodoRepository } from "../todo/repositories/prisma-todo";
import { Todo } from "../todo/schemas/todo.contract";
import { prisma } from "@/lib/prisma";

export const makeTestTodoRepository = () => {
  const repository = new PrismaTodoRepository();

  const deleteAllTodos = async () => {
    await prisma.todo.deleteMany();
  };

  const exampleTodos = (n: number) => {
    const todos = [];

    for (let i = 1; i <= n; i++) {
      todos.push({
        description: `Todo ${i}`,
      });
    }
    return todos;
  };

  return {
    repository,
    deleteAllTodos,
    exampleTodos,
  };
};
