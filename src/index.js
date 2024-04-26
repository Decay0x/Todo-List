import './styles.css';
import { format } from 'date-fns';

import HandleStorage from './HandleStorage';
import popModal from './handleModal';
import ProjectHandler from './ProjectHandler';
import TodoHandler from './TodoHandler';

const storage = HandleStorage();
const projectModal = popModal().projectModal;
const todoModal = popModal().todoModal;
const projectHandler = ProjectHandler(projectModal, storage);
const todoHandler = TodoHandler(todoModal, storage);
const addProjectBtn = document.getElementById('addProject');
const addTodoBtn = document.getElementById('addTodo');

window.addEventListener('load', () => {
  projectHandler.displayProjects();
});
const addProject = () => {
  const projectInput = document.querySelector('.projectInput');
  projectInput.classList.remove('hidden');
  projectInput.setAttribute('selected', '');
  projectModal.openModal();
  projectModal.submitInputs.removeEventListener(
    'click',
    projectHandler.handleProjectSubmit
  );
  projectModal.submitInputs.addEventListener(
    'click',
    projectHandler.handleProjectSubmit
  );
};
const addTodo = () => {
  todoModal.openModal();
  todoModal.submitInputs.removeEventListener(
    'click',
    projectHandler.setActiveProject
  );
  todoModal.submitInputs.addEventListener(
    'click',
    projectHandler.setActiveProject
  );
};
addProjectBtn.addEventListener('click', addProject);
addTodoBtn.addEventListener('click', addTodo);
