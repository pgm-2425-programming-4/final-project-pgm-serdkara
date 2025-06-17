export async function getBacklogTasks() {
  const response = await fetch("http://localhost:1337/api/tasks");
  return response.json();
}
