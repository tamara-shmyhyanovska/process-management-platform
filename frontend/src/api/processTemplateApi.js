const API_URL = "http://localhost:8080/api/process-templates";

export async function getTemplatesByIndustry(industryId) {
  const response = await fetch(
    `${API_URL}/industry/${industryId}`
  );

  if (!response.ok) {
    throw new Error("Failed to load process templates");
  }

  return response.json();
}