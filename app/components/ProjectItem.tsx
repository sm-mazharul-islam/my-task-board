// app/components/ProjectItem.tsx
"use client";
import { deleteProject } from "../actions/project-actions";

// This is a Client Component because it handles clicks

export default function ProjectItem({ project }: { project: any }) {
  return (
    <div className="flex gap-2 p-4 border">
      <span>{project.title}</span>
      <button onClick={() => console.log("Edit logic here")}>Edit</button>
      <button
        onClick={() => deleteProject(project.id)}
        className="text-red-500"
      >
        Delete
      </button>
    </div>
  );
}
