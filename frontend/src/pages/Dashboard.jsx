import { useEffect, useState } from "react";

import {
  getProcesses,
  getProcessIntelligence,
  getProcessEvents
} from "../api/processApi";

function Dashboard() {
  const [processes, setProcesses] = useState([]);
  const [intelligence, setIntelligence] = useState([]);
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [intelligenceLoading, setIntelligenceLoading] =
    useState(false);

  useEffect(() => {
    loadProcesses();
  }, []);

  async function loadProcesses() {
    try {
      const data = await getProcesses();

      setProcesses(data);

      if (data.length > 0) {
        await loadIntelligence(data);
      }
    } catch (error) {
      console.error(
        "Failed to load processes:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadIntelligence(processList) {
    setIntelligenceLoading(true);

    try {
      const results = await Promise.all(
        processList.map((process) =>
          getProcessIntelligence(process.id)
        )
      );

      setIntelligence(results);

      const eventLists = await Promise.all(
        processList.map((process) => 
          getProcessEvents(process.id)
        )
      );

      const allEvents = eventLists.flat();

      allEvents.sort(
        (a, b) =>
          new Date(b.timestamp) - new Date(a.timestamp)
      );

      setEvents(allEvents.slice(0, 8));
      
    } catch (error) {
      console.error(
        "Failed to load process intelligence:",
        error
      );
    } finally {
      setIntelligenceLoading(false);
    }
  }
  

  const totalProcesses = processes.length;

  const activeProcesses = processes.filter(
    (process) => process.status === "ACTIVE"
  ).length;

  const completedProcesses = processes.filter(
    (process) => process.status === "COMPLETED"
  ).length;

  const averageProgress =
    totalProcesses > 0
      ? Math.round(
          processes.reduce(
            (sum, process) =>
              sum + (process.progress || 0),
            0
          ) / totalProcesses
        )
      : 0;

  const totalEvents = intelligence.reduce(
    (sum, item) =>
      sum + (item.totalEvents || 0),
    0
  );

  const delayedEvents = intelligence.reduce(
    (sum, item) =>
      sum + (item.delayedEvents || 0),
    0
  );

  const analyzedProcesses = intelligence.filter(
    (item) => (item.totalEvents || 0) > 0
  );

  const averageCompletionRate =
    analyzedProcesses.length > 0
      ? Math.round(
          analyzedProcesses.reduce(
            (sum, item) =>
              sum + (item.completionRate || 0),
            0
          ) / analyzedProcesses.length
        )
      : 0;

  const bottlenecks = intelligence.filter(
    (item) =>
       item.bottleneckStep &&
       item.bottleneckStep !== "Unknow" &&
       (item.totalEvents || 0) > 0
  );

  

  return (
    <div className="dashboard">

      {/* ========================= */}
      {/* DASHBOARD HEADER */}
      {/* ========================= */}

      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Business Process Monitoring</p>
        </div>
      </div>

      {/* ========================= */}
      {/* KPI CARDS */}
      {/* ========================= */}

      <div className="kpi-grid">

        <div className="kpi-card">
          <h3>Total Processes</h3>

          <h2>
            {loading ? "—" : totalProcesses}
          </h2>

          <p className="kpi-neutral">
            ● Processes in system
          </p>
        </div>

        <div className="kpi-card">
          <h3>Active Processes</h3>

          <h2>
            {loading ? "—" : activeProcesses}
          </h2>

          <p className="kpi-neutral">
            ● Currently running
          </p>
        </div>

        <div className="kpi-card">
          <h3>Completed</h3>

          <h2>
            {loading ? "—" : completedProcesses}
          </h2>

          <p className="kpi-positive">
            ▲ Completed processes
          </p>
        </div>

        <div className="kpi-card">
          <h3>Average Progress</h3>

          <h2>
            {loading
              ? "—"
              : `${averageProgress}%`}
          </h2>

          <p className="kpi-neutral">
            ● Overall process progress
          </p>
        </div>

      </div>

      {/* ========================= */}
      {/* PROCESS PERFORMANCE */}
      {/* ========================= */}

      <div className="dashboard-section">

        <h2>Process Performance</h2>

        <div className="process-performance-list">
          {loading ? (
            <p>Loading processes...</p>
          ) : processes.length === 0 ? (
            <p>No processes available.</p>
          ) : (
            processes
              .slice(0, 5)
              .map((process) => (
                <div
                  className="dashboard-process-row"
                  key={process.id}
                >

                  <div className="dashboard-process-info">

                    <strong>
                      {process.name}
                    </strong>

                    <span>
                      {process.owner ||
                        "No owner"}
                    </span>

                  </div>

                  <div className="dashboard-process-progress">

                    <div className="progress">

                      <div
                        className="progress-fill"
                        style={{
                          width: `${
                            process.progress || 0
                          }%`,
                        }}
                      ></div>

                    </div>

                    <span>
                      {process.progress || 0}%
                    </span>

                  </div>

                  <span
                    className={`status ${
                      process.status
                        ? process.status.toLowerCase()
                        : "pending"
                    }`}
                  >
                    {process.status ||
                      "PENDING"}
                  </span>

                </div>
              ))
          )}

        </div>

      </div>

      {/* ========================= */}
      {/* PROCESS INTELLIGENCE */}
      {/* ========================= */}

      <div className="dashboard-section">

        <div className="section-heading">

          <div>
            <h2>Process Intelligence</h2>

            <p>
              Detected bottlenecks and process
              performance indicators
            </p>
          </div>

        </div>

        {intelligenceLoading ? (

          <p>
            Analyzing processes...
          </p>

        ) : bottlenecks.length === 0 ? (

          <div className="intelligence-empty">

            <strong>
              No bottlenecks detected
            </strong>

            <span>
              Process intelligence results
              will appear here.
            </span>

          </div>

        ) : (

          <div className="intelligence-grid">

            {bottlenecks
              .slice(0, 4)
              .map((item) => (

                <div
                  className="intelligence-card"
                  key={item.processId}
                >

                  <div className="intelligence-card-header">

                    <span>
                      Bottleneck detected
                    </span>

                    <span className="intelligence-warning">
                      {item.delayRate || 0}%
                      delayed
                    </span>

                  </div>

                  <h3>
                    {item.bottleneckStep}
                  </h3>

                  <div className="intelligence-details">

                    <div>
                      <span>
                        Avg. duration
                      </span>

                      <strong>
                        {
                          item.bottleneckAverageDurationMinutes ||
                          0
                        }{" "}
                        min
                      </strong>
                    </div>

                    <div>
                      <span>
                        Completion rate
                      </span>

                      <strong>
                        {item.completionRate || 0}%
                      </strong>
                    </div>

                    <div>
                      <span>
                        Employee dependency
                      </span>

                      <strong>
                        {
                          item.employeeDependencyRate ||
                          0
                        }%
                      </strong>
                    </div>

                  </div>

                </div>

              ))}

          </div>

        )}

      </div>

      {/* ========================= */}
      {/* INTELLIGENCE SUMMARY */}
      {/* ========================= */}

      <div className="dashboard-section">

        <h2>Analysis Summary</h2>

        <div className="intelligence-summary">

          <div>
            <span>Total events analyzed</span>

            <strong>
              {intelligenceLoading
                ? "—"
                : totalEvents}
            </strong>
          </div>

          <div>
            <span>Delayed events</span>

            <strong>
              {intelligenceLoading
                ? "—"
                : delayedEvents}
            </strong>
          </div>

          <div>
            <span>Average completion</span>

            <strong>
              {intelligenceLoading
                ? "—"
                : `${averageCompletionRate}%`}
            </strong>
          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* RECENT ACTIVITY */}
      {/* ========================= */}

      <div className="dashboard-section">

        <h2>Recent Process Activity</h2>

        

        <div className="activity-list">
          {events.length === 0 ? (
            <div className="activity-empty">
              <strong>No recent activity</strong>
              <span>Process events will appear here.</span>
            </div>
          ) : (
            events.map((event) => {
              const process = processes.find(
                (item) => item.id === event.processId
              );

              const step = process?.steps?.find(
                (item) => item.id === event.processStepId
              );

              return (
                <div className="activity-item" key={event.id}>
                  <div
                    className={`activity-dot ${
                      event.eventType?.toLowerCase() || ""
                    }`}
                  />

                  <div className="activity-main">
                    <div className="activity-title">
                      <strong>{event.eventType}</strong>

                      <span>
                        {process?.name ||
                          `Process #${event.processId}`}
                      </span>
                    </div>

                    <div className="activity-meta">
                      <span>
                        {step?.name || "Unknown step"}
                      </span>

                      <span>{event.employee}</span>

                      <span>
                        {event.durationMinutes} min
                      </span>
                    </div>
                  </div>

                  <div className="activity-time">
                    {new Date(event.timestamp).toLocaleString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit"
                      }
                    )}
                  </div>
                </div>
              );
            })
          )}
       </div>

      </div>

    </div>
  );
}

export default Dashboard;