const API_URL = "http://localhost:8080/api/processes";

export async function getProcessIntelligence(processId) {
  const response = await fetch(
    `${API_URL}/${processId}/intelligence`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch process intelligence");
  }

  return response.json();
}