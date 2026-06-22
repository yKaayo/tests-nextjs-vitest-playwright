// Util
import { sanitizeStr } from "@/app/utils/sanitize";

// Schemas
import { validateTodoDescription } from "../schemas/validate-todo-description";
import { Todo } from "../schemas/todo.contract";

// Factory
import { makeNewTodo } from "./make-new-todo";

type ValidatedTodo =
  | { success: true; data: Todo }
  | { success: false; errors: string[] };

export const makeValidatedTodo = (description: string): ValidatedTodo => {
  const sanitizeDescription = sanitizeStr(description);
  const validatedDescription = validateTodoDescription(sanitizeDescription);

  if (!validatedDescription.success)
    return {
      success: validatedDescription.success,
      errors: validatedDescription.errors,
    };

  return {
    success: validatedDescription.success,
    data: makeNewTodo(sanitizeDescription),
  };
};
