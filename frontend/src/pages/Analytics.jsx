import { useEffect, useState } from "react";
import { getProcessAnalytics } from "../api/analyticsApi";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProcessAnalytics(1)
      .then((data) => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="analytics-page">
        <div className="analytics-header">
          <h1>Analytics</h1>
          <p>Business Process Performance Overview</p>
        </div>

        <div className="chart-placeholder">
          <p>Loading process analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-page">
        <div className="analytics-header">
          <h1>Analytics</h1>
          <p>Business Process Performance Overview</p>
        </div>

        <div className="chart-placeholder">
          <h2>Analytics unavailable</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-page">

      <div className="analytics-header">
        <h1>Analytics</h1>
        <p>Business Process Performance Overview</p>
      </div>

      <div className="analytics-grid">

        <div className="analytics-card">
          <h3>Total Events</h3>
          <h2>{analytics.totalEvents}</h2>
          <p>Recorded process events</p>
        </div>

        <div className="analytics-card">
          <h3>Completed Events</h3>
          <h2>{analytics.completedEvents}</h2>
          <p>Successfully completed</p>
        </div>

        <div className="analytics-card">
          <h3>Delayed Events</h3>
          <h2>{analytics.delayedEvents}</h2>
          <p>Events requiring attention</p>
        </div>

        <div className="analytics-card">
          <h3>Average Duration</h3>
          <h2>{analytics.averageDurationMinutes.toFixed(1)} min</h2>
          <p>Average event duration</p>
        </div>

      </div>

      <div className="chart-placeholder">
        <h2>Process Performance</h2>
        <p>
          Total process activity: {analytics.totalDurationMinutes} minutes
        </p>
      </div>

    </div>
  );
}

export default Analytics;