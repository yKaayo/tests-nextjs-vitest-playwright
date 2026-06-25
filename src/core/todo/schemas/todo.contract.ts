export type Todo = {
  id: string;
  description: string;
  createdAt: string
};

export type ValidatedTodo = {
  success: true;
  todo: Todo;
};

export type InValidatedTodo = {
  success: false;
  errors: string[];
};