import HandleStorage from './HandleStorage';
import ProjectHandler from './ProjectHandler';
import Project from './projects';
import Todo from './todo';
import { format } from 'date-fns';

export default function TodoHandler(modal, storage) {
  let todoActiveProject;
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
          });
        });
      }
    },
    handleTodoSubmit: (project, todo) => {
      todoHandler.setTodoActiveProject(project);
      storage.setTodo(project.id, todo);
      // TODO UPDATE THE UI
      todoHandler.displayTodos(project);
      modal.closeModal();
    },
    setTodoActiveProject: (activeProject) => {
      if (activeProject === undefined) {
        if (HandleStorage().getAllProjects().length <= 0) {
          HandleStorage();
        }
        alert(`Create or select a project first`);
      } else {
        todoActiveProject = activeProject;
      }
    },
    storeTodoInputs: () => {
      /* gathering all the user input and makes them a todo obj */
      const inputsContainer = document.getElementById('todoInputsContainer');
      const inputs = inputsContainer.querySelectorAll('input');
      const select = inputsContainer.querySelector('select');
      let date;
      if (inputs[3].value === '') {
        date = 'No due date ';
      } else {
        date = format(new Date(inputs[3].value), 'dd/MM/yyyy');
      }
      // const date = new Date(inputs[3].value);
      // const formattedDate = format(date, 'dd/MM/yyyy');
      const userInputObj = Todo(
        inputs[0].value,
        inputs[1].value,
        inputs[2].value,
        date,
        select.value
      );
      inputs[0].value = '';
      inputs[1].value = '';
      inputs[2].value = '';
      inputs[3].value = '';
      select.value = 1;
      return userInputObj;
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
        todo.priority == 1 ? 'Low' : todo.priority == 2 ? 'Medium' : 'High'
      }
`;
      todoTitle.className = 'hidden';
      todoDesc.className = 'hidden';
      todoNotes.className = 'hidden';
      todoDueDate.className = 'hidden';
      todoPriority.className = 'hidden';
      div.className =
        'relative border-2 text-white p-2 flex cursor-pointer gap-2 justify-between flex-col';
      if (todo.priority == 1) {
        div.classList.add('bg-green-500');
      } else if (todo.priority == 2) {
        div.classList.add('bg-amber-500');
      } else {
        div.classList.add('bg-red-500');
      }
      deleteTodoBtn.addEventListener('click', () => {
        HandleStorage().deleteTodo(todoActiveProject.id, todo.id);
        todoHandler.displayTodos(todoActiveProject);
      });
      div.textContent = `${todo.todoTitle}`;
      div.appendChild(deleteTodoBtn);
      div.append(todoTitle, todoDesc, todoNotes, todoDueDate, todoPriority);
      return div;
    },
  };
  return todoHandler;
}
