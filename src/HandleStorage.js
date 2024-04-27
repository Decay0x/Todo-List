export default function HandleStorage() {
  // establish Projects within localStorage
  if (!localStorage.getItem('Projects')) {
    localStorage.setItem('Projects', JSON.stringify([]));
  }

  const handleStorage = {
    getProject: function (id) {
      const projects = JSON.parse(localStorage.getItem('Projects'));
      return projects.find((project) => project.id === id);
    },
    getAllProjects: function () {
      return JSON.parse(localStorage.getItem('Projects'));
    },
    setProject: function (project) {
      const projects = JSON.parse(localStorage.getItem('Projects'));
      projects.push(project);
      localStorage.setItem('Projects', JSON.stringify(projects));
    },
    deleteProject: function (projectId) {
      const projects = JSON.parse(localStorage.getItem('Projects'));
      const updatedProjects = projects.filter(
        (project) => project.id !== projectId
      );
      localStorage.setItem('Projects', JSON.stringify(updatedProjects));
    },
    getTodos: function (projectId) {
      if (projectId === undefined) {
        return 'Create or select a project';
      }
      const project = this.getProject(projectId);
      return project && project.todos && project.todos.length > 0
        ? project.todos
        : `You haven't got anything to do`;
    },
    getTodo: function (projectId, todoId) {
      const project = this.getProject(projectId);
      return project && Array.isArray(project.todos)
        ? project.todos.find((todo) => todo.id === todoId)
        : null;
    },
    setTodo: function (projectId, todo) {
      const project = this.getProject(projectId);
      if (project && Array.isArray(project.todos)) {
        project.todos.push(todo);
        this.updateProjectInLocalStorage(project);
      }
    },
    deleteTodo: function (projectId, todoId) {
      const project = this.getProject(projectId);
      if (project && Array.isArray(project.todos)) {
        project.todos = project.todos.filter((todo) => todo.id !== todoId);
        this.updateProjectInLocalStorage(project);
      }
    },
    updateProjectInLocalStorage: function (project) {
      const projects = JSON.parse(localStorage.getItem('Projects'));
      const index = projects.findIndex((p) => p.id === project.id);
      if (index !== -1) {
        projects[index] = project;
        localStorage.setItem('Projects', JSON.stringify(projects));
      }
    },
  };

  return handleStorage;
}
