import HandleStorage from './HandleStorage';
import Project from './projects';

export default function ProjectHandler(modal, storage, todoHandler) {
  let activeProject;
  // importing from the TodoHandler
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
