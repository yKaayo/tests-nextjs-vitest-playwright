import uniqid from "uniqid";

// Schema
import { Todo } from "../schemas/todo.contract";

export const makeNewTodo = (description: string): Todo => {
  return {
    id: uniqid(),
    description,
    createdAt: new Date().toLocaleString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
  };
};
