"use client";
import { createProject } from "../actions/project-actions";

export default function ProjectForm() {
  // We wrap the action in a function that returns 'void' to satisfy the HTML form type
  const clientAction = async (formData: FormData) => {
    await createProject(formData);
  };

  return (
    <form
      action={clientAction}
      className="flex gap-2 p-4 bg-slate-900 rounded-lg"
    >
      <input
        name="title"
        placeholder="New project title..."
        required
        className="flex-1 bg-slate-800 text-white p-2 rounded border border-slate-700"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Add
      </button>
    </form>
  );
}
