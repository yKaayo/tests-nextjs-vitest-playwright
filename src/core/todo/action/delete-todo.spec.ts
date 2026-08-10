import { createTodoAction } from "./create-todo";
import { deleteTodoAction } from "./delete-todo";
import { makeMocks } from "@/core/__tests__/make-test-action-mocks";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("deleteTodoUseCase (unit)", async () => {
  test("should call deleteTodoUseCase with right values", async () => {
    const { id, deleteTodoUseCaseSpy } = makeMocks();

    await deleteTodoAction(id);

    expect(deleteTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(id);
  });

  test("should call revalidatePath if deleteTodoUseCase return success", async () => {
    const { id, revalidatePathMock } = makeMocks();

    await deleteTodoAction(id);

    expect(revalidatePathMock).toHaveBeenCalledExactlyOnceWith("/");
  });

  test("should return the same value of deleteTodoUseCase if have error", async () => {
    const { id, errorResult, deleteTodoUseCaseSpy } = makeMocks();

    deleteTodoUseCaseSpy.mockResolvedValue(errorResult);

    const result = await deleteTodoAction(id);

    expect(result).toStrictEqual(errorResult);
  });

  test("should return the same value of deleteTodoUseCase in success", async () => {
    const { id, successResult } = makeMocks();

    const result = await deleteTodoAction(id);
    expect(result).toStrictEqual(successResult);
  });
});
