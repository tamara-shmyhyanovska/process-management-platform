const API_URL = "http://localhost:8080/api/industries";

export async function getIndustries() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch industries");
  }

  return response.json();
}