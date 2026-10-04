import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProcesses } from "../api/processApi.js";

function Processes() {
  const navigate = useNavigate();

  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProcesses() {
    try {
      setLoading(true);
      setError("");

      const data = await getProcesses();
      setProcesses(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load processes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProcesses();
  }, []);

  async function handleDeleteProcess(processId, processName) {
    const confirmed = window.confirm(
      `Delete process "${processName}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/processes/${processId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete process");
      }

      setProcesses((currentProcesses) =>
        currentProcesses.filter((process) => process.id !== processId)
      );
    } catch (error) {
      console.error(error);
      setError("Failed to delete process");
    }
  }

  return (
    <div className="processes-page">
      <div className="page-header">
        <div>
          <h1>Processes</h1>
          <p>Manage and monitor all business processes</p>
        </div>

        <button 
          className="new-process-button"
          onClick={() => navigate("/processes/new")}
        >
          + New Process
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Process..."
          className="search-input"
        />
      </div>

      <div className="table-container">
        {loading && <p>Loading processes...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <table className="process-table">
            <thead>
              <tr>
                <th>Process Name</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Progress</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {processes.map((process) => (
                <tr key={process.id}>
                  <td
                    onClick={() => {
                      window.location.href = `/processes/${process.id}`;
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {process.name}
                  </td>

                  <td>{process.owner}</td>

                  <td>
                    <span
                      className={`status ${process.status?.toLowerCase()}`}
                    >
                      {process.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`priority ${process.priority?.toLowerCase()}`}
                    >
                      {process.priority}
                    </span>
                  </td>

                  <td>
                    <div className="progress">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${process.progress || 0}%`,
                        }}
                      ></div>
                    </div>
                  </td>

                  <td>
                    <button
                      className="delete-process-button"
                      onClick={() =>
                        handleDeleteProcess(
                          process.id,
                          process.name
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Processes;