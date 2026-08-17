function Dashboard() {
  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Business Process Monitoring</p>
        </div>
      </div>

      <div className="kpi-grid">

        <div className="kpi-card">
          <h3>Total Processes</h3>
          <h2>102</h2>
          <p className="kpi-positive">
           ▲ +12% this month
           </p>
        </div>

        <div className="kpi-card">
          <h3>Active Processes</h3>
          <h2>87</h2>
          <p className="kpi-neutral">
          ● Running normally
          </p>
        </div>

        <div className="kpi-card">
          <h3>Completed</h3>
          <h2>34</h2>
          <p className="kpi-positive">
          ▲ Excellent performance
          </p>
        </div>

        <div className="kpi-card">
          <h3>Average Duration</h3>
          <h2>4.2 Days</h2>
          <p className="kpi-warning">
           ▼ Needs improvement
          </p>
        </div>

      </div>

      <div className="dashboard-section">
        <h2>Process Performance</h2>

        <p>
          Chart will be connected after Backend integration.
        </p>
      </div>

      <div className="dashboard-section">
        <h2>Recent Process Activity</h2>

        <p>
          Recent business processes will appear here.
        </p>
      </div>

    </div>
  );
}

export default Dashboard;