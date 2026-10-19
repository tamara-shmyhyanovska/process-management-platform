const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const API_URL = `${BASE_URL}/api/process-templates`;

export async function getTemplatesByIndustry(industryId) {
  const response = await fetch(
    `${API_URL}/industry/${industryId}`
  );

  if (!response.ok) {
    throw new Error("Failed to load process templates");
  }

  return response.json();
}