import './styles.css';
import { format } from 'date-fns';

import handleStorage from './handleStorage';
import popModal from './handleModal';
import ProjectHandler from './ProjectHandler';
import TodoHandler from './TodoHandler';

const storage = handleStorage();
const modal = popModal();
const projectHandler = ProjectHandler(modal, storage);
const todoHandler = TodoHandler(modal, storage);
const addProjectBtn = document.getElementById('addProject');
const addTodoBtn = document.getElementById('addTodo');

window.addEventListener('load', () => {
  projectHandler.displayProjects();
});
const addProject = () => {
  const projectInput = document.querySelector('.projectInput');
  projectInput.classList.remove('hidden');
  projectInput.setAttribute('selected', '');
  modal.openModal();
  modal.submitInputs.removeEventListener(
    'click',
    projectHandler.handleProjectSubmit
  );
  modal.submitInputs.addEventListener(
    'click',
    projectHandler.handleProjectSubmit
  );
  modal.submitInputs.textContent = 'Create Project';
};
const addTodo = () => {
  modal.openModal();
  modal.submitInputs.removeEventListener('click', todoHandler.handleTodoSubmit);
  modal.submitInputs.addEventListener('click', todoHandler.handleTodoSubmit);
  modal.submitInputs.textContent = 'Add Todo';
};
addProjectBtn.addEventListener('click', addProject);
addTodoBtn.addEventListener('click', addTodo);
