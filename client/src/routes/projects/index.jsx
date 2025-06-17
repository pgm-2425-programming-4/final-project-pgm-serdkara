import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects")({
  component: Projects,
});

function Projects() {
  return (
    <div className="p-2">
      <h3>Projects Overview</h3>
    </div>
  );
}
