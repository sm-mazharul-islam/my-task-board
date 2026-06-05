// Example of how you would link the delete button in your component

import { deleteProject } from "../actions/project-actions";

export default function ProjectItem({ project }: { project: any }) {
  return (
    <div className="border p-4 my-2">
      <h3>{project.title}</h3>
      <button
        onClick={async () => {
          await deleteProject(project.id);
          alert("Project Deleted!");
        }}
        className="text-red-500"
      >
        Delete
      </button>
    </div>
  );
}
