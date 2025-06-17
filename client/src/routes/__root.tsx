import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

// Voeg hier je projectlijst toe
const projects = [
  { id: "PGM3", name: "PGM3" },
  { id: "PGM4", name: "PGM4" },
];

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>

        {" | "}

        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="[&.active]:font-bold"
          >
            {project.name}{" "}
          </Link>
        ))}

        {" | "}

        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>

      <hr />

      <Outlet />

      <TanStackRouterDevtools />
    </>
  ),
});
