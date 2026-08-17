function Analytics() {
  return (
    <div className="analytics-page">

      <div className="analytics-header">
        <h1>Analytics</h1>
        <p>Business Process Performance Overview</p>
      </div>

      <div className="analytics-grid">

        <div className="analytics-card">
          <h3>Process Efficiency</h3>
          <h2>92%</h2>
          <p>Excellent Performance</p>
        </div>

        <div className="analytics-card">
          <h3>Avg Completion Time</h3>
          <h2>4.3 Days</h2>
          <p>Compared to last month</p>
        </div>

        <div className="analytics-card">
          <h3>Active Processes</h3>
          <h2>18</h2>
          <p>Currently Running</p>
        </div>

        <div className="analytics-card">
          <h3>Automation Rate</h3>
          <h2>74%</h2>
          <p>Digital Processes</p>
        </div>

      </div>

      <div className="chart-placeholder">
        <h2>Process Performance Chart</h2>
        <p>Charts will be connected to the database later.</p>
      </div>

    </div>
  );
}

export default Analytics;