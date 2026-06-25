import { InValidatedTodo, Todo, ValidatedTodo } from "../schemas/todo.contract";

export interface FindFirstTodoParams {
  id: string;
  description?: string;
}

export interface TodoRepository {
  findFirst(params: FindFirstTodoParams): Promise<Todo | null>;
  create(todo: Todo): Promise<ValidatedTodo | InValidatedTodo>;
  findAll(): Promise<Todo[]>;
  delete(id: string): Promise<ValidatedTodo | InValidatedTodo>;
}
