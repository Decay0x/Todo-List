export default class handleStorage {
  getProject(id) {
    return JSON.parse(localStorage.getItem(id));
  }

  getAllProjects() {
    const projects = [];
    for (const key in localStorage) {
      if (typeof localStorage[key] === 'string') {
        projects.push(JSON.parse(localStorage[key]));
      }
    }
    return projects;
  }

  setProject(id, project) {
    return localStorage.setItem(id, JSON.stringify(project));
  }

  deleteProject(projectId) {
    return localStorage.removeItem(projectId);
  }

  getTodos(projectId) {
    const project = this.getProject(projectId);
    const todos = project.todos;
    return todos;
  }
  getTodo(projectId, todoId) {
    const project = this.getProject(projectId);
    if (project && Array.isArray(project.todos)) {
      return project.todos.find((todo) => todo.id === todoId);
    }
    return null;
  }

  setTodo(projectId, todo) {
    const project = this.getProject(projectId);
    if (project && Array.isArray(project.todos)) {
      project.todos.push(todo);
      localStorage.setItem(projectId, JSON.stringify(project));
    } else {
      console.error('Project not found or does not have a todos array');
    }
  }
  deleteTodo(projectId, todoId) {
    const project = this.getProject(projectId);
    if (project && Array.isArray(project.todos)) {
      const todoIndex = project.todos.findIndex((todo) => todo.id === todoId);
      if (todoIndex !== -1) {
        project.todos.splice(todoIndex, 1);
        localStorage.setItem(projectId, JSON.stringify(project));
      }
    }
  }
}
