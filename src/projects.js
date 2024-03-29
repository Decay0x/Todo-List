export default class Project {
  #id;
  constructor(projectTitle, todos = []) {
    this.projectTitle = projectTitle;
    this.#id = crypto.randomUUID();
    this.todos = todos;
  }
  getProjectId() {
    return this.#id;
  }
}
