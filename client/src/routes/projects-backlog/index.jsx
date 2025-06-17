import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects-backlog")({
  component: Backlog,
});

function Backlog() {
  return (
    <div className="p-2">
      <h3>Backlog Overview</h3>
    </div>
  );
}
