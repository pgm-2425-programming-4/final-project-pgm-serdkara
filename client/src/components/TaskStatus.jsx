import { useQuery } from "@tanstack/react-query";
import { API_URL, API_TOKEN } from "../constants/constants";

export function TaskStatus({
  status,
  project,
  selectedLabel,
  searchTerm,
  onEditTask,
}) {
  const fetchTasks = async () => {
    const url = `${API_URL}/tasks?filters[project][name][$eq]=${encodeURIComponent(project)}&populate[labels][fields][0]=name&populate[project][fields][0]=name&populate[task_status][fields][0]=name`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.log("Fetching tasks from:", url);
      console.error("Fetch failed:", res.status, errorText);
      throw new Error(`Failed to fetch tasks: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tasks", project, status],
    queryFn: fetchTasks,
  });

  const tasks = data?.data || [];

  const filteredTasks = tasks
    .filter((task) => {
      const statusName = task?.task_status?.name;
      const matchesStatus = statusName?.toLowerCase() === status.toLowerCase();
      return matchesStatus;
    })
    .filter((task) => {
      const title = task.title?.toLowerCase() || "";
      const description = task.description?.toLowerCase() || "";
      const taskStatuses = task.labels || [];

      const matchesSearch =
        !searchTerm ||
        title.includes(searchTerm.toLowerCase()) ||
        description.includes(searchTerm.toLowerCase());

      const matchesLabel =
        selectedLabel === "All" ||
        taskStatuses.some(
          (type) => type?.name?.toLowerCase?.() === selectedLabel.toLowerCase()
        );

      return matchesSearch && matchesLabel;
    });

  return (
    <section className="taskboard__column">
      <h3 className="taskboard__title">{status}</h3>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading tasks: {error.message}</p>}
      {!isLoading && !isError && filteredTasks.length === 0 && <p>No tasks</p>}

      {filteredTasks.map((task) => {
        const taskStatuses = task.labels || [];

        return (
          <div
            key={task.id}
            className="taskcard"
            onClick={() => onEditTask(task)}
          >
            <p className="taskcard__title">{task.title}</p>
            <div className="taskcard__status">
              {taskStatuses.map((type, index) => {
                const name = type.name;
                const icons = {
                  "Front-end": "🎨",
                  "Back-end": "🧠",
                  Infra: "🛠️",
                  Documentation: "📄",
                };

                return (
                  <span key={type.id || index} className="taskcard__label ">
                    {icons[name] || "🏷️"} {name}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
