const handleStorage = () => {
  const handleStorage = {
    getProject: function (id) {
      return JSON.parse(localStorage.getItem(id));
    },
    getAllProjects: function () {
      const projects = [];
      for (const key in localStorage) {
        if (typeof localStorage[key] === 'string') {
          projects.push(JSON.parse(localStorage[key]));
        }
      }
      return projects;
    },
    setProject: function (id, project) {
      return localStorage.setItem(id, JSON.stringify(project));
    },
    deleteProject: function (projectId) {
      return localStorage.removeItem(projectId);
    },
    getTodos: function (projectId) {
      const project = this.getProject(projectId);
      const todos = project.todos;
      if (todos.length <= 0) {
        return `You haven't got anything to do`;
      } else {
        return todos;
      }
    },
    getTodo: function (projectId, todoId) {
      const project = this.getProject(projectId);
      if (project && Array.isArray(project.todos)) {
        return project.todos.find((todo) => todo.id === todoId);
      } else {
        return null;
      }
    },
    setTodo: function (projectId, todo) {
      const project = this.getProject(projectId);
      if (project && Array.isArray(project.todos)) {
        project.todos.push(todo);
        localStorage.setItem(projectId, JSON.stringify(project));
      } else {
        return null;
      }
    },
    deleteTodo: function (projectId, todoId) {
      const project = this.getProject(projectId);
      if (project && Array.isArray(project.todos)) {
        const todoIndex = project.todos.findIndex((todo) => todo.id === todoId);
        if (todoIndex !== -1) {
          project.todos.splice(todoIndex, 1);
          localStorage.setItem(projectId, JSON.stringify(project));
        }
      }
    },
  };

  return handleStorage;
};
export default handleStorage;
