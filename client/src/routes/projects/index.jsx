import { createFileRoute, Link } from "@tanstack/react-router";

// Dummy project list for now
const projects = [
  { id: "PGM3", name: "PGM3" },
  { id: "PGM4", name: "PGM4" },
];

export const Route = createFileRoute("/projects/")({
  component: Projects,
});

function Projects() {
  return (
    <div className="p-2">
      <h3>Projects Overview</h3>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>{project.name} Board</Link>
            {" | "}
            <Link to={`/projects/${project.id}/backlog`}>Backlog</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
