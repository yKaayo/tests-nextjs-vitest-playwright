import { createTodoAction } from "./create-todo";
import { makeMocks } from "@/core/__tests__/make-test-action-mocks";

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


