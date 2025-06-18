import { Link, useLocation } from "@tanstack/react-router";

export function ProjectNavbar({ projects, onProjectSelect }) {
  const location = useLocation();

  return (
    <nav>
      <Link
        className={
          location.pathname === "/"
            ? "ProjectNavbar__item active"
            : "ProjectNavbar__item"
        }
        to="/"
      >
        Home
      </Link>

      <h2 className="ProjectNavbar__title">PROJECTS</h2>
      <ul className="ProjectNavbar__list">
        {projects.map((project) => {
          const isActive = location.pathname === `/projects/${project}`;
          return (
            <li key={project}>
              <Link
                className={"ProjectNavbar__item" + (isActive ? " active" : "")}
                to={`/projects/${project}`}
                onClick={() => onProjectSelect(project)}
              >
                {project}
              </Link>
            </li>
          );
        })}
      </ul>

      <h2 className="ProjectNavbar__title">INFO</h2>
      <Link
        className={
          location.pathname === "/about"
            ? "ProjectNavbar__item active"
            : "ProjectNavbar__item"
        }
        to="/about"
      >
        About
      </Link>
    </nav>
  );
}
