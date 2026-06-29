import { prisma } from "@/lib/prisma";
import {
  InValidatedTodo,
  NewTodo,
  Todo,
  ValidatedTodo,
} from "../schemas/todo.contract";
import { TodoRepository } from "./todo.contract";

export class PrismaTodoRepository implements TodoRepository {
  constructor(private readonly db = prisma) {}

  async findFirstById(id: string): Promise<Todo | null> {
    const existingTodo = await this.db.todo.findFirst({
      where: {
        id,
      },
    });

    return existingTodo;
  }

  async findFirstByDescription(description: string): Promise<Todo | null> {
    const existingTodo = await this.db.todo.findFirst({
      where: {
        description,
      },
    });

    return existingTodo;
  }

  async findAll(): Promise<Todo[]> {
    return this.db.todo.findMany({
      orderBy: [{ createdAt: "desc" }, { description: "desc" }],
    });
  }

  async create(todo: NewTodo): Promise<ValidatedTodo | InValidatedTodo> {
    const existingTodo = await this.findFirstByDescription(todo.description);

    if (existingTodo) {
      return {
        success: false,
        errors: ["Já existe esse todo!"],
      };
    }

    const createdTodo = await this.db.todo.create({
      data: {
        id: crypto.randomUUID(),
        description: todo.description,
        createdAt: new Date().toISOString(),
      },
    });

    return {
      success: true,
      todo: createdTodo,
    };
  }

  async delete(id: string): Promise<ValidatedTodo | InValidatedTodo> {
    const existingTodo = await this.findFirstById(id);

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
