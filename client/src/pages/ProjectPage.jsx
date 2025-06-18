import { useEffect, useState } from "react";
import Status from "../components/StatusBoard";
import { Form } from "../components/TaskDialog";
import { API_URL, API_TOKEN } from "../constants/constants";
import { useQueryClient } from "@tanstack/react-query";
import FilterBar from "../components/FilterBar";
import { Outlet } from "@tanstack/react-router";

export default function ProjectPage({ projectId }) {
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [notification, setNotification] = useState(null);
  const queryClient = useQueryClient();
  const params = /\/projects\/([^/]+)/.exec(location.pathname);
  const activeProject = params ? params[1].toUpperCase() : null;
  useEffect(() => {}, [projectId]);

  const handleCloseForm = () => setTaskToEdit(null);
  const handleAddTask = () => {
    setTaskToEdit({});
  };
  const handleSubmitTask = async (task) => {
    try {
      const taskId = task.documentId;
      const url = taskId ? `${API_URL}/tasks/${taskId}` : `${API_URL}/tasks`;
      const method = taskId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            Title: task.Title,
            description: task.description,
            labels: task.labels,
            task_status: task.task_statuses,
            project: task.project,
          },
        }),
      });

      console.log(res);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      setNotification({ type: "success", message: "Taak opgeslagen!" });
    } catch (err) {
      console.error(err);
      setNotification({
        type: "error",
        message: "Error bij opslaan",
      });
    } finally {
      handleCloseForm();
      queryClient.invalidateQueries(["tasks"]);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleDeleteTask = async (task) => {
    if (!task?.documentId) return;

    try {
      const res = await fetch(`${API_URL}/tasks/${task.documentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Fout bij het verwijderen van de taak: ${res.status} ${errorText}`
        );
      }

      setNotification({
        type: "success",
        message: "Taak succesvol verwijderd!",
      });
    } catch (err) {
      console.error("Error deleting task:", err);
      setNotification({
        type: "error",
        message: "Fout bij het verwijderen van de taak.",
      });
    } finally {
      handleCloseForm();
      queryClient.invalidateQueries(["tasks"]);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <>
      <header className="taskboard__header">
        <FilterBar
          selectedLabel={selectedLabel}
          onLabelChange={setSelectedLabel}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddTask={handleAddTask}
          activeProject={activeProject}
        />
      </header>
      <Status
        project={activeProject}
        selectedLabel={selectedLabel}
        searchTerm={searchTerm}
        onEditTask={setTaskToEdit}
      />
      {taskToEdit !== null && (
        <Form
          task={taskToEdit}
          onClose={handleCloseForm}
          onSubmit={handleSubmitTask}
          onDelete={handleDeleteTask}
        />
      )}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <Outlet />
    </>
  );
}
