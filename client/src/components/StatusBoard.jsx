import { TaskStatus } from "./TaskStatus";

export default function StatusBoard({
  project,
  selectedLabel,
  searchTerm,
  onEditTask,
}) {
  const statuses = ["To do", "In progress", "Ready for review", "Done"];

  return (
    <div className="statusboard__columns">
      {statuses.map((status) => (
        <TaskStatus
          key={status}
          status={status}
          project={project}
          selectedLabel={selectedLabel}
          searchTerm={searchTerm}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
}
