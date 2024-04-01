const Todo = (todoTitle, desc, notes, dueDate, priority = 0) => {
  const id = crypto.randomUUID();

  const todo = {
    todoTitle,
    desc,
    dueDate,
    notes,
    type: 'todo',
    priority,
    getTodoId: function () {
      return id;
    },
  };

  return todo;
};
export default Todo;
