import { useState } from "react";
import { createProcess } from "../api/processApi.js";

function CreateProcess() {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [status, setStatus] = useState("ACTIVE");
  const [error, setError] = useState("");

  async function handleCreateProcess(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter a process name.");
      return;
    }

    try {
      const process = await createProcess({
        name: name.trim(),
        owner: owner.trim(),
        priority: priority,
        status: status,
        progress: 0,
      });

      console.log("Created process:", process);

      window.location.href =`/processes/${process.id}`;
    } catch (error) {
      console.error(error);
      setError("Failed to create process.");
    }
  }

  return (
    <div className="create-process-page">

      <div className="create-process-header">
        <h1>Create New Process</h1>
        <p>Create a process from scratch and define its steps.</p>
      </div>

      <form
        className="create-process-form"
        onSubmit={handleCreateProcess}
      >

        <div className="form-group">
          <label>Process Name</label>
          <input
            type="text"
            placeholder="e.g. Customer Onboarding"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Owner</label>
          <input
            type="text"
            placeholder="e.g. Anna Becker"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        <div className="create-process-actions">

          <button
            type="button"
            onClick={() => {
              window.location.href = "/process-setup";
            }}
          >
            Cancel
          </button>

          <button type="submit">
            Create Process
          </button>

        </div>

      </form>

    </div>
  );
}

export default CreateProcess;