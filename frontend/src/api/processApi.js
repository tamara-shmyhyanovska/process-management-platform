const API_URL = "http://localhost:8080/api/processes";

export async function createProcessFromTemplate(templateId) {
  const response = await fetch(
    `${API_URL}/from-template/${templateId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create process from template");
  }

  return response.json();
}