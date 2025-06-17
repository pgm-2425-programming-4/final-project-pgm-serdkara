export async function getTasks() {
  const response = await fetch("http://localhost:1337/api/tasks");
  throw new Error("Failed to fetch tasks");
}
return response.json();
