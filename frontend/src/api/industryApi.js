const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const API_URL = `${BASE_URL}/api/industries`;

export async function getIndustries() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch industries");
  }

  return response.json();
}