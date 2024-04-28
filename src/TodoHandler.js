import HandleStorage from './HandleStorage';
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
      const textArea = inputsContainer.querySelector('textarea');
      let date;
      if (inputs[2].value === '') {
        date = 'No due date ';
      } else {
        date = format(new Date(inputs[2].value), 'dd/MM/yyyy');
      }
      const userInputObj = Todo(
        inputs[0].value,
        inputs[1].value,
        textArea.value,
        date,
        select.value
      );
      inputs[0].value = '';
      inputs[1].value = '';
      textArea.value = '';
      inputs[2].value = '';
      select.value = 1;
      return userInputObj;
    },
    todoDecor: (todo) => {
      /* creates/displays the todo details in the main section */
      const div = document.createElement('div');
      const btnDiv = document.createElement('div');
      const deleteTodoBtn = document.createElement('button');
      const todoTitle = document.createElement('span');
      const todoDesc = document.createElement('span');
      const todoNotes = document.createElement('span');
      const todoDueDate = document.createElement('span');
      const todoPriority = document.createElement('span');
      const editTodoBtn = document.createElement('button');
      btnDiv.className = 'flex items-baseline gap-2 absolute top-0 right-2';
      deleteTodoBtn.className = 'text-red-800 font-bold';
      editTodoBtn.className = 'text-sm';
      deleteTodoBtn.textContent = 'x';
      editTodoBtn.textContent = 'edit';
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
        'relative break-words border-2 text-white p-2 flex cursor-pointer gap-2 justify-between flex-col';
      if (todo.priority == 1) {
        div.classList.add('bg-green-500');
      } else if (todo.priority == 2) {
        div.classList.add('bg-amber-500');
      } else {
        div.classList.add('bg-red-500');
      }
      deleteTodoBtn.addEventListener('click', (e) => {
        // prevent the click to bubble
        e.stopPropagation();
        HandleStorage().deleteTodo(todoActiveProject.id, todo.id);
        todoHandler.displayTodos(todoActiveProject);
      });
      editTodoBtn.addEventListener('click', (e) => {
        // prevent the click to bubble
        e.stopPropagation();
        modal.openModal();
        // pre fill the previous user inputs to the modal
        // Set the value of the date input field
        // structure the date to a valid date input
        let [day, month, year] = todo.dueDate.split('/');
        // Reformat the date string to 'yyyy-MM-dd'
        let formattedDateStr = `${year}-${month}-${day}`;
        const inputsContainer = document.getElementById('todoInputsContainer');
        const inputs = inputsContainer.querySelectorAll('input');
        const select = inputsContainer.querySelector('select');
        const textArea = inputsContainer.querySelector('textarea');
        inputs[0].value = todo.todoTitle;
        inputs[1].value = todo.desc;
        textArea.value = todo.notes;
        inputs[2].value = formattedDateStr;
        select.value = todo.priority;

        const updateTodo = () => {
          const updatedTodo = todoHandler.storeTodoInputs();
          storage.editTodo(todoActiveProject.id, todo.id, updatedTodo);
          modal.closeModal();
          // update the UI
          todoHandler.displayTodos(todoActiveProject);
          // reset the text of the todo button
          clonedBtn.textContent = 'Add Todo';
          clonedBtn.removeEventListener('click', updateTodo);
        };
        // Clone the button and modify the clone
        const addTodoBtn = document.getElementById('todoSubmitInputs');
        const clonedBtn = addTodoBtn.cloneNode(true);
        clonedBtn.textContent = 'Update Todo';
        clonedBtn.id = 'updateTodoBtn'; // Optionally change the ID to reflect the new purpose

        // Replace the original button with the clone
        addTodoBtn.replaceWith(clonedBtn);

        // Now, add the event listener to the cloned button
        clonedBtn.addEventListener('click', () => {
          const updatedTodo = todoHandler.storeTodoInputs();
          storage.editTodo(todoActiveProject.id, todo.id, updatedTodo);
          modal.closeModal();
          // update the UI
          todoHandler.displayTodos(todoActiveProject);
          // reset the text of the todo button
          clonedBtn.textContent = 'Add Todo';
          clonedBtn.id = 'todoSubmitInputs'; // Reset the ID if necessary
          // Remove the event listener from the cloned button
          clonedBtn.removeEventListener('click', updateTodo);
        });
      });
      div.textContent = `${todo.todoTitle}`;
      btnDiv.append(editTodoBtn, deleteTodoBtn);
      div.appendChild(btnDiv);
      div.append(todoTitle, todoDesc, todoNotes, todoDueDate, todoPriority);
      return div;
    },
  };
  return todoHandler;
}
