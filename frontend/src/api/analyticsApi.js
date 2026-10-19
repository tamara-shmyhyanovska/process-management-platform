const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const API_URL = `${BASE_URL}/api/analytics`;

export async function getProcessAnalytics(processId) {
  const response = await fetch(
    `${API_URL}/processes/${processId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch process analytics");
  }

  return response.json();
}