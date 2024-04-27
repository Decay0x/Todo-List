import HandleStorage from './HandleStorage';
import Project from './projects';
import TodoHandler from './TodoHandler';

export default function ProjectHandler(modal, storage) {
  let activeProject;
  // importing from the TodoHandler
  const todoHandler = TodoHandler(modal, storage);
  const projectHandler = {
    handleProjectSubmit: () => {
      const projectInput = document.querySelector('.projectInput');
      let project;
      if (projectInput.value !== '') {
        project = Project(projectInput.value);
      } else {
        projectInput.setAttribute('placeholder', `Project without a name!?`);
      }
      if (project) {
        HandleStorage();
        storage.setProject(project);

        projectInput.value = '';
        projectHandler.displayProjects();
        modal.closeModal();
        projectInput.setAttribute('placeholder', 'Project Name');
        activeProject = project;
      }
    },
    handleProject: (project) => {
      activeProject = project;
      projectHandler.setActiveProject();
      todoHandler.displayTodos(project);
    },
    setActiveProject: () => {
      todoHandler.setTodoActiveProject(activeProject);
    },
    getActiveProject: () => activeProject,
    deleteProject: (id) => {
      storage.deleteProject(id);
      activeProject = undefined;
      // when deleting a project in order to update the UI send an undefined value
      if (HandleStorage().getTodos()) {
        todoHandler.displayTodos(HandleStorage().getTodos());
      }
      projectHandler.displayProjects();
    },
    displayProjects: () => {
      const projectContainer = document.getElementById('projectsContainer');
      projectContainer.replaceChildren();
      const projects = storage.getAllProjects();

      projects.forEach((project) => {
        const div = document.createElement('div');
        div.className =
          'flex items-center justify-between w-full px-2 py-4 gap-2';
        const x = document.createElement('span');
        x.className = 'text-red-600 text-sm cursor-pointer';
        x.textContent = 'x';
        const currentProject = document.createElement('span');
        currentProject.className = 'text-white cursor-pointer';
        currentProject.textContent = project.projectTitle;
        div.append(currentProject);
        div.append(x);

        currentProject.addEventListener('click', () => {
          projectHandler.handleProject(project);
          projectHandler.setActiveProject(project);
          activeProject = project;
        });
        x.addEventListener('click', () => {
          projectHandler.deleteProject(project.id);
        });

        projectContainer.appendChild(div);
      });
    },
  };

  return projectHandler;
}
/*[{"projectTitle":"Decorate the House","todos":[{"todoTitle":"decorations","desc":"Place decorations all over","dueDate":"2024-04-06T16:56:02.794Z","notes":"I am in the middle of","type":"todo","priority":1,"id":"12ff6ab7-d073-4597-bd45-ee4334dcdbef"},{"todoTitle":"decorations","desc":"Place decorations all over","dueDate":"2024-04-06T16:56:02.794Z","notes":"I am in the middle of","type":"todo","priority":2,"id":"12ff6ab7-d073-4597-bd45-ee4334gaserty"},{"todoTitle":"decorations","desc":"Place decorations all over","dueDate":"2024-04-06T16:56:02.794Z","notes":"I am in the middle of","type":"todo","priority":3,"id":"12ff6ab7-d073-4597-bd45-ee4334yuhngf"}],"type":"project","id":"7cfccfb1-2108-4852-b74f-9082cd5b66a7"},{"projectTitle":"Chores","todos":[{"todoTitle":"Wash Dishes","desc":"Need to load dishwasher","dueDate":"2024-04-14T00:00:00.000Z","notes":"Check rinse aid and salt levels. Check the washing tablet stocks and place an order in case i need to","type":"todo","priority":"1","id":"297bc9df-52c5-47cf-9a4a-13a980c657c1"}],"type":"project","id":"ac9e2b26-6447-473f-a137-1ad86d92ad1f"}] */
