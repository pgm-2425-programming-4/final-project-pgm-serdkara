import { useState, useEffect } from "react";
import { API_URL, API_TOKEN } from "../constants/constants";

export function TaskDialog({ onClose, onSubmit, onDelete, task }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState([]);
  const [task_statuses, setStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    async function fetchData(endpoint, setter) {
      const res = await fetch(`${API_URL}/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      const json = await res.json();
      console.log(res);

      setter(json.data);
    }

    fetchData("labels", setLabel);
    fetchData("task-statuses", setStatus);
    fetchData("projects", setProjects);
  }, []);

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setSelectedLabel(task.labels?.map((t) => t.id) || []);
      setSelectedStatus(task.task_status?.id?.toString() || "");
      setSelectedProject(task.project?.id?.toString() || "");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      id: task?.id,
      title,
      description,
      labels: selectedLabel.map((id) => ({ id })),
      task_status: { id: Number(selectedStatus) },
      project: { id: Number(selectedProject) },
      documentId: task?.documentId,
    };
    console.log("Submitting task data:", taskData);
    onSubmit(taskData);
  };

  const handleDelete = () => {
    onDelete(task);
  };

  return (
    <div className="popup">
      <div className="popup__inner">
        <h2>{task?.id ? `Bewerk taak ${task?.id}` : "Voeg een taak toe"}</h2>
        <form className="popup__container" onSubmit={handleSubmit}>
          <div className="popup__block">
            <div className="popup__content">
              <label className="popup__item">
                Titel:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>

              <label className="popup__item">
                Taak Types:
                <div className="popup__checkbox-group">
                  {label.map((type) => (
                    <label key={type.id} className="popup__checkbox-item">
                      <input
                        type="checkbox"
                        value={type.id}
                        checked={selectedLabel.includes(type.id)}
                        onChange={(e) => {
                          const id = Number(e.target.value);
                          if (e.target.checked) {
                            setSelectedLabel((prev) => [...prev, id]);
                          } else {
                            setSelectedLabel((prev) =>
                              prev.filter((tid) => tid !== id)
                            );
                          }
                        }}
                      />
                      {type.name || "Naamloos"}
                    </label>
                  ))}
                </div>
              </label>
            </div>
            <div className="popup__content">
              <label className="popup__item">
                Project:
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                >
                  <option value="">-- Selecteer een project --</option>
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.id}>
                      {proj.name || "Naamloos"}
                    </option>
                  ))}
                </select>
              </label>
              <label className="popup__item">
                Status:
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">-- Selecteer een status --</option>
                  {task_statuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name || "Geen titel"}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="popup__content popup__content--description">
              <label className="popup__item">
                Beschrijving:
                <textarea
                  value={description}
                  rows="4"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="popup__btn">
            <button type="submit" className="submit">
              {task?.id ? `Bewerken` : "Aanmaken"}
            </button>
            <button type="button" className="close" onClick={onClose}>
              Annuleren
            </button>
            {task?.id && (
              <button type="button" className="delete" onClick={handleDelete}>
                Verwijderen
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
