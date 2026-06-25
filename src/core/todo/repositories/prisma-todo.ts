import { prisma } from "@/lib/prisma";
import { InValidatedTodo, Todo, ValidatedTodo } from "../schemas/todo.contract";
import { FindFirstTodoParams, TodoRepository } from "./todo.contract";
import type { Prisma } from "../../../../prisma/generated/client";

export class PrismaTodoRepository implements TodoRepository {
  constructor(private readonly db = prisma) {}

  async findFirst({
    id,
    description,
  }: FindFirstTodoParams): Promise<Todo | null> {
    const conditions: Prisma.TodoWhereInput[] = [{ id }];

    if (description) {
      conditions.push({ description });
    }

    const existingTodo = await this.db.todo.findFirst({
      where: {
        OR: conditions,
      },
    });

    return existingTodo;
  }

  async findAll(): Promise<Todo[]> {
    return this.db.todo.findMany({
      orderBy: { createdAt: "desc", description: "desc" },
    });
  }

  async create(todo: Todo): Promise<ValidatedTodo | InValidatedTodo> {
    const existingTodo = await this.findFirst(todo.id, todo.description);

    if (existingTodo) {
      return {
        success: false,
        errors: ["Já existe esse todo!"],
      };
    }

    const createdTodo = await this.db.todo.create({ data: todo });
    return {
      success: true,
      todo: createdTodo,
    };
  }

  async delete(id: string): Promise<ValidatedTodo | InValidatedTodo> {
    const existingTodo = await this.findFirst({ id });

    if (!existingTodo) {
      return {
        success: false,
        errors: ["Todo não encontrado!"],
      };
    }

    await this.db.todo.delete({ where: { id } });
    
    return {
      success: true,
      todo: existingTodo,
    };
  }
}
