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
      todoHandler.displayTodos(project);
      activeProject = project;
    },
    setActiveProject: () => {
      todoHandler.getActiveProject(activeProject);
    },
    deleteProject: (id) => {
      storage.deleteProject(id);
      projectHandler.displayProjects();
    },
    displayProjects: () => {
      const projectContainer = document.getElementById('projectsContainer');
      projectContainer.replaceChildren();
      const projects = storage.getAllProjects();

      projects.forEach((project) => {
        const div = document.createElement('div');
        div.className = 'flex items-center gap-2';
        const x = document.createElement('span');
        x.className = 'text-red-600 text-sm cursor-pointer';
        x.textContent = 'x';
        const span = document.createElement('span');
        span.className = 'text-white cursor-pointer';
        span.textContent = project.projectTitle;
        div.append(span);
        div.append(x);

        span.addEventListener('click', () => {
          projectHandler.handleProject(project);
          projectHandler.setActiveProject(project);
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
