import HandleStorage from './HandleStorage';
import ProjectHandler from './ProjectHandler';
import Project from './projects';
import Todo from './todo';

export default function TodoHandler(modal, storage) {
  const todoHandler = {
    displayTodos: (project) => {
      const todosArr = storage.getTodos(project.id);
      const tasksContainer = document.getElementById('tasksContainer');
      tasksContainer.replaceChildren();

      if (typeof todosArr === 'string') {
        const span = document.createElement('span');
        span.className = 'text-white text-md text-center opacity-80';
        span.textContent = todosArr;
        tasksContainer.appendChild(span);
      } else {
        todosArr.forEach((todo) => {
          const div = todoHandler.todoDecor(todo);
          tasksContainer.appendChild(div);
          div.addEventListener('click', () => {
            div.querySelectorAll('span').forEach((span) => {
              span.className === 'hidden'
                ? (span.className = '')
                : (span.className = 'hidden');
            });
            todoHandler.handleTodoSubmit(project);
          });
        });
      }
    },
    handleTodoSubmit: (project) => {
      // storage.setTodo(project.id, todo);
    },
    getActiveProject: (activeProject) => {
      if (activeProject === undefined) {
        if (HandleStorage().getAllProjects().length <= 0) {
          HandleStorage();
        }
        alert(`Create or select a project first`);
      } else {
        null;
      }
    },
    createTodoInputs: () => {
      /* TODO: layout the todo requirements 'user inputs' */
      const inputsModal = document.getElementById('todoInputsModal');

      return inputsModal;
    },
    todoDecor: (todo) => {
      /* creates/displays the todo details in the main section */
      const div = document.createElement('div');
      const deleteTodoBtn = document.createElement('button');
      const todoTitle = document.createElement('span');
      const todoDesc = document.createElement('span');
      const todoNotes = document.createElement('span');
      const todoDueDate = document.createElement('span');
      const todoPriority = document.createElement('span');
      deleteTodoBtn.className = 'absolute top-0 right-2 text-red-800 font-bold';
      deleteTodoBtn.textContent = 'x';
      todoTitle.textContent = `Title: ${todo.todoTitle}`;
      todoDesc.textContent = `Description: ${todo.desc}`;
      todoNotes.textContent = `Notes: ${todo.notes}`;
      todoDueDate.textContent = `Due Date: ${todo.dueDate}`;
      todoPriority.textContent = `Priority: ${
        todo.priority === 1 ? 'Low' : todo.priority === 2 ? 'Medium' : 'High'
      }
`;
      todoTitle.className = 'hidden';
      todoDesc.className = 'hidden';
      todoNotes.className = 'hidden';
      todoDueDate.className = 'hidden';
      todoPriority.className = 'hidden';
      div.className =
        'relative border-2 text-white p-2 flex cursor-pointer gap-2 justify-between flex-col';
      if (todo.priority === 1) {
        div.classList.add('bg-green-500');
      } else if (todo.priority === 2) {
        div.classList.add('bg-amber-500');
      } else {
        div.classList.add('bg-red-500');
      }
      div.textContent = `${todo.todoTitle}`;
      div.appendChild(deleteTodoBtn);
      div.append(todoTitle, todoDesc, todoNotes, todoDueDate, todoPriority);
      return div;
    },
  };
  return todoHandler;
}
