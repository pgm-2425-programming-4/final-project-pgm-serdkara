import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/tasks";

function Backlog() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"], 
    queryFn: getTasks,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Backlog Tasks</h1>
      <ul>
        {tasks.data.map((task) => (
          <li key={task.id}>{task.attributes.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Backlog;
