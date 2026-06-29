import {
  InValidatedTodo,
  NewTodo,
  Todo,
  ValidatedTodo,
} from "../schemas/todo.contract";

export interface TodoRepository {
  findFirstById(id: string): Promise<Todo | null>;
  findFirstByDescription(description: string): Promise<Todo | null>;
  create(todo: NewTodo): Promise<ValidatedTodo | InValidatedTodo>;
  findAll(): Promise<Todo[]>;
  delete(id: string): Promise<ValidatedTodo | InValidatedTodo>;
}
