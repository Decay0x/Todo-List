const Project = (projectTitle, todos = []) => {
  const id = crypto.randomUUID();
  const project = {
    projectTitle,
    todos,
    type: 'project',
    id: crypto.randomUUID(),
  };

  return project;
};

export default Project;
