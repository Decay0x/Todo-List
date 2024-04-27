import './styles.css';
import { format } from 'date-fns';

import HandleStorage from './HandleStorage';
import popModal from './handleModal';
import ProjectHandler from './ProjectHandler';
import TodoHandler from './TodoHandler';
import Project from './projects';

const storage = HandleStorage();
const projectModal = popModal().projectModal;
const todoModal = popModal().todoModal;
const projectHandler = ProjectHandler(projectModal, storage);
const todoHandler = TodoHandler(todoModal, storage);
const addProjectBtn = document.getElementById('addProject');
const addTodoBtn = document.getElementById('addTodo');

window.addEventListener('load', () => {
  if (storage.getAllProjects().length == 0) {
    // first time visits create a general project and automatically assign it as active project to be able to add todos on it
    const general = Project('General');
    storage.setProject(general);
    projectHandler.displayProjects();
    projectHandler.handleProject(general);
    console.log(projectHandler.getActiveProject());
  } else if (storage.getAllProjects().length == 1) {
    // visited before but haven't added your one project automatically set the default one as your active
    projectHandler.displayProjects();
    projectHandler.handleProject(storage.getAllProjects()[0]);
  } else {
    // visited before and have set your own projects so you will have to pick which one you want to display add/delete todos
    projectHandler.displayProjects();
  }
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

const todoSubmit = () => {
  // create a todo & submit the todo under the correct project
  const todo = todoHandler.storeTodoInputs();

  todoHandler.handleTodoSubmit(projectHandler.getActiveProject(), todo);
};
const addTodo = () => {
  if (projectHandler.getActiveProject() === undefined) {
    alert('Create or select a project');
  } else {
    todoModal.openModal();
    todoModal.submitInputs.removeEventListener('click', todoSubmit);
    todoModal.submitInputs.addEventListener('click', todoSubmit);
  }
};
addProjectBtn.addEventListener('click', addProject);
addTodoBtn.addEventListener('click', addTodo);
/* TODOs: }
handle user inputs for adding todos. 
handle the delete of todos.
format dates.
*/
