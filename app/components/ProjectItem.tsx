// "use client"; // Marks this as a client component so we can use buttons/state
// import { useState } from "react";
// import { deleteProject, updateProject } from "../actions/project-actions";

// export default function ProjectItem({ project }: { project: any }) {
//   const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
//   const [title, setTitle] = useState(project.title);

//   return (
//     <div className="p-4 bg-slate-800 rounded mb-2">
//       {isEditing ? (
//         // EDIT MODE: Shows input fields
//         <div className="flex gap-2">
//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="p-1 text-black"
//           />
//           <button
//             onClick={async () => {
//               await updateProject(project.id, title, project.description);
//               setIsEditing(false);
//             }}
//           >
//             Save
//           </button>
//         </div>
//       ) : (
//         // VIEW MODE: Shows project data
//         <div className="flex justify-between">
//           <span>{project.title}</span>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setIsEditing(true)}
//               className="text-blue-400"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => deleteProject(project.id)}
//               className="text-red-400"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
//!
"use client";
import { useState } from "react";
import { deleteProject, updateProject } from "../actions/project-actions";
// Import the generated type
import { Project, Task } from "../generated/prisma";

// Create a type that includes the relation
type ProjectWithTasks = Project & { tasks: Task[] };

export default function ProjectItem({
  project,
}: {
  project: ProjectWithTasks;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(project.title);
  // Ensure we handle the possibility of null/undefined description
  const [description, setDescription] = useState(project.description || "");

  if (isEditing) {
    return (
      <div className="p-4 bg-slate-800 rounded border border-blue-500 mb-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 bg-slate-900 text-white rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2 bg-slate-900 text-white rounded h-20"
        />
        <div className="flex gap-2">
          <button
            onClick={async () => {
              await updateProject(project.id, title, description);
              setIsEditing(false);
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-3 py-1 bg-slate-700 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-slate-800 rounded border border-slate-700 mb-2 flex justify-between items-start">
      <div>
        <h3 className="text-lg font-bold text-white">{project.title}</h3>
        <p className="text-slate-400 text-sm">
          {project.description || "No description."}
        </p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setIsEditing(true)} className="text-blue-400">
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
  );
}
