import { useEffect, useState } from "react";
import { getProcessAnalytics } from "../api/analyticsApi";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const data = await getProcessAnalytics(1);
      setAnalytics(data);
    } catch (error) {
      console.error("Failed to load analytics:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="analytics-page">
        <h1>Analytics</h1>
        <p>Loading process analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-page">
        <h1>Analytics</h1>

        <div>
          <h2>Analytics unavailable</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const completionRate =
    analytics.totalEvents > 0
      ? Math.round(
          (analytics.completedEvents / analytics.totalEvents) * 100
        )
      : 0;

  const delayRate =
    analytics.totalEvents > 0
      ? Math.round(
          (analytics.delayedEvents / analytics.totalEvents) * 100
        )
      : 0;

  return (
    <div className="analytics-page">

      {/* HEADER */}

      <div className="analytics-header">
        <div>
          <h1>Analytics</h1>
          <p>Business Process Performance Overview</p>
        </div>

        <div>
          ● Live process data
        </div>
      </div>

      {/* KPI */}

      <div className="analytics-kpi-grid">

        <div className="analytics-kpi-card">
          <div>Total Events</div>
          <h2>{analytics.totalEvents}</h2>
          <p>Recorded process events</p>
        </div>

        <div className="analytics-kpi-card">
          <div>Completed Events</div>
          <h2>{analytics.completedEvents}</h2>
          <p>Successfully completed</p>
        </div>

        <div className="analytics-kpi-card">
          <div>Delayed Events</div>
          <h2>{analytics.delayedEvents}</h2>
          <p>Events requiring attention</p>
        </div>

        <div className="analytics-kpi-card">
          <div>Average Duration</div>
          <h2>
            {analytics.averageDurationMinutes.toFixed(1)} min
          </h2>
          <p>Average event duration</p>
        </div>

      </div>

      {/* PROCESS PERFORMANCE */}

      <section className="analytics-section">

        <div className="analytics-section-header">
          <h2>Process Performance</h2>
          <p>
            Overview of the current process execution data
          </p>
        </div>

        <div className="analytics-performance-grid">

          <div className="analytics-panel">
            <h3>Completion Rate</h3>

            <div>
              <strong>{completionRate}%</strong>
            </div>

            <p>
              {analytics.completedEvents} of{" "}
              {analytics.totalEvents} events completed
            </p>
          </div>

          <div className="analytics-panel">
            <h3>Delay Rate</h3>

            <div>
              <strong>{delayRate}%</strong>
            </div>

            <p>
              {analytics.delayedEvents} events require attention
            </p>
          </div>

        </div>

      </section>

      {/* PROCESS METRICS */}

      <section className="analytics-section">

        <div className="analytics-section-header">
          <h2>Process Metrics</h2>
          <p>
            Key indicators identified from process event data
          </p>
        </div>

        <div className="analytics-metrics-grid">

          <div className="analytics-metric-card">
            <span>Total Process Time</span>

            <strong>
              {analytics.totalDurationMinutes} min
            </strong>

            <p>
              Combined duration of all recorded events
            </p>
          </div>
          <div className="analytics-metric-card">
            <span>Average Event Duration</span>

            <strong>
              {analytics.averageDurationMinutes.toFixed(1)} min
            </strong>

            <p>
              Average time spent per process event
            </p>
          </div>

          <div className="analytics-metric-card">
            <span>Bottleneck Step</span>

            <strong>
              {analytics.bottleneckStep || "Unknown"}
            </strong>

            <p>
              Average duration:{" "}
              {analytics.bottleneckAverageDurationMinutes
                ? analytics.bottleneckAverageDurationMinutes.toFixed(1)
                : "0.0"}{" "}
              min
            </p>
          </div>

          <div className="analytics-metric-card">
            <span>Employee Dependency</span>

            <strong>
              {analytics.employeeDependencyRate
                ? analytics.employeeDependencyRate.toFixed(1)
                : "0.0"}%
            </strong>

            <p>
              Share of events concentrated around the most active employee
            </p>
          </div>

        </div>

      </section>

      {/* ACTIVITY SUMMARY */}

      <section className="analytics-section">

        <div className="analytics-section-header">
          <h2>Activity Summary</h2>
          <p>
            Overall process activity based on recorded events
          </p>
        </div>

        <div className="analytics-summary">

          <div className="analytics-summary-item">
            <span>Recorded Events</span>
            <strong>{analytics.totalEvents}</strong>
          </div>

          <div className="analytics-summary-item">
            <span>Completed</span>
            <strong>{analytics.completedEvents}</strong>
          </div>

          <div className="analytics-summary-item">
            <span>Delayed</span>
            <strong>{analytics.delayedEvents}</strong>
          </div>

          <div className="analytics-summary-item">
            <span>Total Duration</span>
            <strong>
              {analytics.totalDurationMinutes} min
            </strong>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Analytics;