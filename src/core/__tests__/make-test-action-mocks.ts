import { InvalidatedTodo, ValidatedTodo } from "../todo/schemas/todo.contract";
import { revalidatePath } from "next/cache";
import * as createTodoUseCaseMod from "@/core/todo/useCases/create-todo";
import * as deleteTodoUseCaseMod from "@/core/todo/useCases/delete-todo";

export const makeMocks = () => {
  const description = "description";
  const id = "id";

  const successResult: ValidatedTodo = {
    success: true,
    todo: {
      createdAt: "any date",
      description: "any description",
      id: "any id",
    },
  };

  const errorResult: InvalidatedTodo = {
    success: false,
    errors: ["any error"],
  };

  const createTodoUseCaseSpy = vi
    .spyOn(createTodoUseCaseMod, "createTodoUseCase")
    .mockResolvedValue(successResult);

  const deleteTodoUseCaseSpy = vi
    .spyOn(deleteTodoUseCaseMod, "deleteTodoUseCase")
    .mockResolvedValue(successResult);

  const revalidatePathMock = vi.mocked(revalidatePath);

  return {
    description,
    id,
    successResult,
    errorResult,
    createTodoUseCaseSpy,
    deleteTodoUseCaseSpy,
    revalidatePathMock,
  };
};
