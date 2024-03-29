export default class Todo {
  constructor(todoTitle, desc, notes, dueDate, priority = 0) {
    this.todoTitle = todoTitle;
    this.desc = desc;
    this.dueDate = dueDate;
    this.notes = notes;
    this.priority = priority;
    this.id = crypto.randomUUID();
  }

  getTodoId() {
    return this.id;
  }
}
