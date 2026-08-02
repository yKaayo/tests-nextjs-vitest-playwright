import { revalidatePath } from "next/cache";
import { InvalidatedTodo, ValidatedTodo } from "../schemas/todo.contract";
import * as createTodoUseCaseMod from "../useCases/create-todo";
import { createTodoAction } from "./create-todo";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("createTodoUseCase (unit)", async () => {
  test("should call createTodoUseCase with right values", async () => {
    const { description, createTodoUseCaseSpy } = makeMocks();

    await createTodoAction(description);

    expect(createTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(description);
  });

  test("should call revalidatePath if createTodoUseCase return success", async () => {
    const { description, revalidatePathMock } = makeMocks();

    await createTodoAction(description);

    expect(revalidatePathMock).toHaveBeenCalledExactlyOnceWith("/");
  });

  test("should return the same value of createTodoUseCase if have error", async () => {
    const { description, errorResult, createTodoUseCaseSpy } = makeMocks();

    createTodoUseCaseSpy.mockResolvedValue(errorResult);

    const result = await createTodoAction(description);
    expect(result).toStrictEqual(errorResult);
  });

  test("should return the same value of createTodoUseCase in success", async () => {
    const { description, successResult, createTodoUseCaseSpy } = makeMocks();

    const result = await createTodoAction(description);
    expect(result).toStrictEqual(successResult);
  });
});

const makeMocks = () => {
  const description = "description";

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

  const revalidatePathMock = vi.mocked(revalidatePath);

  return {
    description,
    successResult,
    errorResult,
    createTodoUseCaseSpy,
    revalidatePathMock,
  };
};
