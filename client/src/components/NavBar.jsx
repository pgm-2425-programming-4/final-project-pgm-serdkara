import { Link, useLocation } from "@tanstack/react-router";

export function Navbar({ projects, onProjectSelect }) {
  const location = useLocation();

  return (
    <nav>
      <Link
        className={
          location.pathname === "/" ? "navbar__item active" : "navbar__item"
        }
        to="/"
      >
        Home
      </Link>

      <h2 className="navbar__title">PROJECTS</h2>
      <ul className="navbar__list">
        {projects.map((project) => {
          const isActive = location.pathname === `/projects/${project}`;
          return (
            <li key={project}>
              <Link
                className={"navbar__item" + (isActive ? " active" : "")}
                to={`/projects/${project}`}
                onClick={() => onProjectSelect(project)}
              >
                {project}
              </Link>
            </li>
          );
        })}
      </ul>

      <h2 className="navbar__title">INFO</h2>
      <Link
        className={
          location.pathname === "/about"
            ? "navbar__item active"
            : "navbar__item"
        }
        to="/about"
      >
        About
      </Link>
    </nav>
  );
}
