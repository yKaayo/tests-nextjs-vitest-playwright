import { makeValidatedTodo } from "../factories/make-validated-todo";
import { prismaRepository } from "../repositories/default.repository";

export const createTodoUseCase = (description: string) => {
  const validatedTodo = makeValidatedTodo(description);

  if (!validatedTodo.success) return validatedTodo;

  return prismaRepository.create(validatedTodo.todo);
};
