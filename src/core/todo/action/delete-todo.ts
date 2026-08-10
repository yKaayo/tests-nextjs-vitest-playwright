import { revalidatePath } from "next/cache";
import { deleteTodoUseCase } from "../useCases/delete-todo";

export const deleteTodoAction = async (id: string) => {
  "use server";

  const deleteResult = await deleteTodoUseCase(id);

  if (deleteResult.success) {
    revalidatePath("/");
  }

  return deleteResult;
};
