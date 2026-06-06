// import { getProjects } from "./actions/project-actions";
// import ProjectForm from "./components/ProjectForm";
// import ProjectItem from "./components/ProjectItem";

// export default async function Home() {
//   // 1. Fetch data
//   const projects = await getProjects();

//   // 2. Debug: If you see this in your terminal, the server is working
//   console.log("DEBUG: Projects received:", projects);

//   return (
//     <main className="max-w-xl mx-auto p-8 space-y-6">
//       <h1 className="text-2xl font-bold text-white">My Projects</h1>

//       <ProjectForm />

//       <section className="space-y-2">
//         {/* If projects is empty, show a fallback message */}
//         {projects.length === 0 ? (
//           <p className="text-gray-400 italic">
//             No projects found. Add one above!
//           </p>
//         ) : (
//           projects.map((project) => (
//             <ProjectItem key={project.id} project={project} />
//           ))
//         )}
//       </section>
//     </main>
//   );
// }
//!
import { getProjects } from "./actions/project-actions";
import ProjectForm from "./components/ProjectForm";
import ProjectItem from "./components/ProjectItem";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="max-w-xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold text-white">My Projects</h1>

      <ProjectForm />

      <section className="space-y-4">
        {projects.length === 0 ? (
          <p className="text-gray-400 italic">
            No projects found. Add one above!
          </p>
        ) : (
          projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))
        )}
      </section>
    </main>
  );
}
