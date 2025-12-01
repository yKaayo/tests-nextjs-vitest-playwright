// Schema
import { Todo } from "./todo.contract";

export type ValidatedTodo =
  | { success: true; data: Todo }
  | { success: false; errors: string[] };
