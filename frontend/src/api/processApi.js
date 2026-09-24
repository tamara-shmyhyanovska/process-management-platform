const API_URL = "http://localhost:8080/api/processes";

export async function getProcesses() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load processes");
  }

  return response.json();
}

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

export async function getProcessById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load process");
  }

  return response.json();
}

export async function createProcessStep(processId, step) {
  const response = await fetch(
    `http://localhost:8080/api/process-steps/process/${processId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(step),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create process step");
  }

  return response.json();
}

export async function createProcess(process) {
  const response = await fetch(
    "http://localhost:8080/api/processes",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(process),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create process");
  }

  return response.json();
}

export async function getProcessIntelligence(processId) {
  const response = await fetch(
    `${API_URL}/${processId}/intelligence`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load process intelligence"
    );
  }

  return response.json();
}

export async function getProcessEvents(processId) {
  const response = await fetch(
    `http://localhost:8080/api/process-events/process/${processId}`
  );

  if (!response.ok) {
    throw new Error("Failed to load process events");
  }

  return response.json();
}