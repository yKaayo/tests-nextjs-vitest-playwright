// Util
import * as sanitizeStrMod from "@/app/utils/sanitize";

// Schema
import * as validateTodoDescriptionMod from "../schemas/validate-todo-description";
import { Todo } from "../schemas/todo.contract";

// Factories
import { makeValidatedTodo } from "./make-validated-todo";
import * as makeNewTodoMod from "./make-new-todo";

describe("makeValidatedTodo", () => {
  it("call sanitizeStr with right value", () => {
    const { description, sanitizeStrSpy } = makeMocks();

    makeValidatedTodo(description);

    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
  });

  it("call validateTodoDescription with the return of sanitizeDescription", () => {
    const { description, sanitizeStrSpy, validateTodoDescriptionSpy } =
      makeMocks();

    sanitizeStrSpy.mockReturnValue(description);
    makeValidatedTodo(description);

    expect(validateTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
      description
    );
  });

  it("return todo if makeValidatedTodo was success", () => {
    const { todo, description } = makeMocks();

    const res = makeValidatedTodo(description);

    // @ts-expect-error Testing if return the same value
    expect(res.data).toStrictEqual(todo);
  });

  it("return errors if makeValidatedTodo was failed", () => {
    const { description, validateTodoDescriptionSpy } = makeMocks();

    validateTodoDescriptionSpy.mockReturnValue({
      success: false,
      errors: [""],
    });

    const res = makeValidatedTodo(description);

    // @ts-expect-error Testing if return errors
    expect(res.errors).toStrictEqual([""]);
  });

  it("return validatedDescription.errors if validateTodoDescription was failed", () => {
    const { description, validateTodoDescriptionSpy } = makeMocks();

    validateTodoDescriptionSpy.mockReturnValue({
      success: false,
      errors: [""],
    });

    const res = makeValidatedTodo(description);

    expect(res).toStrictEqual({
      success: false,
      errors: [""],
    });
  });

  it("call makeNewTodo if makeValidatedTodo was success", () => {
    const { todo, description, makeNewTodoSpy } = makeMocks();

    makeValidatedTodo(description);

    expect(makeNewTodoSpy).toHaveBeenCalledExactlyOnceWith(description);
    expect(makeNewTodoSpy).toHaveReturnedWith(todo);
  });

  it("do not call makeNewTodo if makeValidatedTodo was failed", () => {
    const { description, makeNewTodoSpy, validateTodoDescriptionSpy } =
      makeMocks();

    validateTodoDescriptionSpy.mockReturnValue({
      success: false,
      errors: [""],
    });

    makeValidatedTodo(description);

    expect(makeNewTodoSpy).not.toHaveBeenCalled();
  });
});

const makeMocks = (description = "abcd") => {
  const todo: Todo = {
    id: "123",
    description,
    createdAt: new Date().toLocaleString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
  };

  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, "sanitizeStr")
    .mockReturnValue(description);

  const validateTodoDescriptionSpy = vi
    .spyOn(validateTodoDescriptionMod, "validateTodoDescription")
    .mockReturnValue({ success: true, errors: [] });

  const makeNewTodoSpy = vi
    .spyOn(makeNewTodoMod, "makeNewTodo")
    .mockReturnValue(todo);

  return {
    todo,
    description,
    sanitizeStrSpy,
    validateTodoDescriptionSpy,
    makeNewTodoSpy,
  };
};
