"use client"; // Marks this as a client component so we can use buttons/state
import { useState } from "react";
import { deleteProject, updateProject } from "../actions/project-actions";

export default function ProjectItem({ project }: { project: any }) {
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [title, setTitle] = useState(project.title);

  return (
    <div className="p-4 bg-slate-800 rounded mb-2">
      {isEditing ? (
        // EDIT MODE: Shows input fields
        <div className="flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-1 text-black"
          />
          <button
            onClick={async () => {
              await updateProject(project.id, title, project.description);
              setIsEditing(false);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        // VIEW MODE: Shows project data
        <div className="flex justify-between">
          <span>{project.title}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-400"
            >
              Edit
            </button>
            <button
              onClick={() => deleteProject(project.id)}
              className="text-red-400"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
