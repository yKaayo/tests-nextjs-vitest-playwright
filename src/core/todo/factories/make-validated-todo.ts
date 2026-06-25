// Util
import { sanitizeStr } from "@/utils/sanitize";

// Schemas
import { validateTodoDescription } from "@/core/todo/schemas/validate-todo-description";
import { InValidatedTodo, ValidatedTodo } from "@/core/todo/schemas/todo.contract";

// Factory
import { makeNewTodo } from "./make-new-todo";

type TodoValidation = ValidatedTodo | InValidatedTodo;

export const makeValidatedTodo = (description: string): TodoValidation => {
  const sanitizeDescription = sanitizeStr(description);
  const validatedDescription = validateTodoDescription(sanitizeDescription);

  if (!validatedDescription.success)
    return {
      success: validatedDescription.success,
      errors: validatedDescription.errors,
    };

  return {
    success: validatedDescription.success,
    todo: makeNewTodo(sanitizeDescription),
  };
};
