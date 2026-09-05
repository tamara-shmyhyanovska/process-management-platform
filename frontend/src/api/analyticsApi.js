const API_URL = "http://localhost:8080/api/analytics";

export async function getProcessAnalytics(processId) {
  const response = await fetch(`${API_URL}/processes/${processId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch process analytics");
  }

  return response.json();
}