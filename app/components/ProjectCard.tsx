export function ProjectCard({ project }) {
  return (
    <div className="group relative bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300">
      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
      <div className="mt-4 flex gap-2">
        {/* Action Buttons */}
        <button className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg">
          Edit
        </button>
        <button className="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg">
          Delete
        </button>
      </div>
    </div>
  );
}
