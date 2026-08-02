import { revalidatePath } from "next/cache";
import { createTodoUseCase } from "../useCases/create-todo";

export const createTodoAction = async (description: string) => {
  "use server";

  const createResult = await createTodoUseCase(description);

  if (createResult.success) {
    revalidatePath("/");
  }

  return createResult;
};
