import Project from './projects';
import Todo from './todo';

export default function TodoHandler(modal, storage) {
  const todoHandler = {
    displayTodos: (projectId) => {
      const todosArr = storage.getTodos(projectId);
      const tasksContainer = document.getElementById('tasksContainer');
      tasksContainer.replaceChildren();

      if (typeof todosArr === 'string') {
        const span = document.createElement('span');
        span.className = 'text-white text-md text-center opacity-80';
        span.textContent = todosArr;
        tasksContainer.appendChild(span);
      } else {
        todosArr.forEach((todo) => {
          const div = document.createElement('div');
          const deleteTodoBtn = document.createElement('button');
          deleteTodoBtn.className = 'text-red-800 font-bold';
          deleteTodoBtn.textContent = 'x';
          div.className = 'border-2 text-white p-2 flex justify-between';
          if (todo.priority === 3) {
            div.classList.add('bg-red-500');
          } else if (todo.priority === 2) {
            div.classList.add('bg-amber-500');
          } else {
            div.classList.add('bg-green-500');
          }
          div.textContent = `${todo.todoTitle} ${todo.desc}`;
          div.appendChild(deleteTodoBtn);
          tasksContainer.appendChild(div);
          div.addEventListener('click', () => {
            todoHandler.handleTodoSubmit(todo);
          });
        });
      }
    },
    handleTodoSubmit: (project) => {
      console.log(project);
    },
  };
  return todoHandler;
}
