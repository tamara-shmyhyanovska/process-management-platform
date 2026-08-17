const API_URL = "http://localhost:8080/api/processes";

export async function getProcesses() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch processes");
  }

  return response.json();
}

export async function getProcessById(id) {
  const response = await fetch('${API_URL}/${id}');

  if (!response.ok) {
    throw new Error("Failed to fetch process");
  }

  return response.json();
}

export async function createProcess(process) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(process),
  });

  if (!response.ok) {
    throw new Error("Failed to create process");
  }

  return response.json();
}

export async function updateProcess(id, process) {
  const response = await fetch('${API_URL}/${id}', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(process),
  });

  if (!response.ok) {
    throw new Error("Failed to update process");
  }

  return response.json();
}

export async function deleteProcess(id) {
  const response = await fetch('${API_URL}/${id}', {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete process");
  }
}