import { useEffect, useState } from "react";
import { createProcessFromTemplate } from "../api/processApi.js";


function Processes() {
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    async function loadProcesses() {
      try {
        const data = await getProcesses();
        setProcesses(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load processes");
      } finally {
        setLoading(false);
      }
    }

    loadProcesses();
  }, []);

  return (
    <div className="processes-page">

      <div className="page-header">
        <div>
          <h1>Processes</h1>
          <p>Manage and monitor all business processes</p>
        </div>

        <button className="new-process-button">
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

        {loading && (
          <p>Loading processes...</p>
        )}

        {error && (
          <p>{error}</p>
        )}
    
      
        {!loading && !error && (
          <table className="process-table">

            <thead>
              <tr>
                <th>Process Name</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Progress</th>
              </tr>
            </thead>

            <tbody>

              {processes.map((process) => (
                <tr key={process.id}>

                  <td>{process.name}</td>

                  <td>{process.owner}</td>

                  <td>
                    <span
                      className={`status ${process.status.toLowerCase()}`}
                    >
                      {process.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`priority ${process.priority.toLowerCase()}`}
                    >
                      {process.priority}
                    </span>
                  </td>

                  <td>
                    <div className="progress">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${process.progress}%`,
                        }}
                      ></div>
                    </div>
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