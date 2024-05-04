import { action, makeAutoObservable, makeObservable, observable } from 'mobx';

class Todo {
  id = Math.random();
  description = '';
  finished = false;

  constructor(description: string) {
    makeObservable(this, {
      description: observable,
      editDescription: action,
      finished: observable,
      id: true,
      toggle: action,
    });
    this.description = description;
  }

  editDescription(newDescription: string) {
    this.description = newDescription;
  }

  toggle() {
    this.finished = !this.finished;
  }
}

export default class TodoStore {
  todos: Todo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadTodos() {
    //Usually we'll load todos from server or smth here.
    const numTodos = Math.floor(Math.random() * (20 - 10 + 1)) + 10;

    for (let i = 0; i < numTodos; i++) {
      const description = `Mock Todo ${i + 1}`;
      const todo = new Todo(description);
      this.todos.push(todo);
    }
  }

  createTodo(description: string) {
    const todo = new Todo(description);
    this.todos.push(todo);
    return todo;
  }

  removeTodo(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }
}
