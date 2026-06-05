"use client";
import { deleteProject } from "../actions/project-actions";

export default function ProjectItem({ project }: { project: any }) {
  return (
    <div className="flex justify-between items-center p-4 bg-slate-800 border border-slate-700 rounded-lg">
      <h3 className="text-white">{project.title}</h3>
      <button
        onClick={() => deleteProject(project.id)}
        className="text-red-400 hover:text-red-300"
      >
        Delete
      </button>
    </div>
  );
}
