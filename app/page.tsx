// app/page.tsx

import { getProjects } from "./actions/project-actions";
import ProjectItem from "./components/ProjectForm";

export default async function Home() {
  const projects = await getProjects(); // 1. Fetch data

  return (
    <main>
      {projects.map((project) => (
        // 2. Pass 'project' as a prop here!
        <ProjectItem key={project.id} project={project} />
      ))}

      <h1>helklasdfkjasdjkfkl</h1>
    </main>
  );
}
