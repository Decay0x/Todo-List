const Project = (projectTitle, todos = []) => {
  const id = crypto.randomUUID();
  const project = {
    projectTitle,
    todos,
    type: 'project',
    getProjectId: function () {
      return id;
    },
  };

  return project;
};

export default Project;
