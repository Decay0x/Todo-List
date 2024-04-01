import './styles.css';
import { format } from 'date-fns';
import Project from './projects';
import Todo from './todo';
import handleStorage from './handleStorage';
import popModal from './handleModal';

const storage = handleStorage;

const addProjectBtn = document.getElementById('addProject');
const addTodoBtn = document.getElementById('addTodo');

addProjectBtn.addEventListener('click', () => {
  popModal().openModal();
});

addTodoBtn.addEventListener('click', () => {
  console.log('clicked');
});
