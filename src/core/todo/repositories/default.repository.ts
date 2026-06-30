import { PrismaTodoRepository } from "./prisma-todo";
import { TodoRepository } from "./todo.contract";

export const prismaRepository: TodoRepository = new PrismaTodoRepository();