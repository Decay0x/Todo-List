const Todo = (todoTitle, desc, notes, dueDate, priority = 0) => {
  const todo = {
    todoTitle,
    desc,
    dueDate,
    notes,
    type: 'todo',
    priority,
    id: crypto.randomUUID(),
  };

  return todo;
};
export default Todo;
