import { sanitizeStr } from "@/utils/sanitize";
import { prismaRepository } from "../repositories/default.repository";

export const deleteTodoUseCase = async (id: string) => {
  const cleanId = sanitizeStr(id);

  if (!cleanId) {
    return {
      success: false,
      errors: ["ID inválido"],
    };
  }
  return await prismaRepository.delete(cleanId);
};
