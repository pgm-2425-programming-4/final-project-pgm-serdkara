import { Outlet } from "@tanstack/react-router";
import { Navbar } from "../components/NavBar";

export default function Layout() {
  const params = /\/projects\/([^/]+)/.exec(location.pathname);
  const activeProject = params ? params[1].toUpperCase() : null;

  return (
    <>
      <aside className="navbar">
        <Navbar projects={["PGM-3", "PGM-4"]} activeProject={activeProject} />
      </aside>

      <main className="statusboard">
        <Outlet />
      </main>
    </>
  );
}
