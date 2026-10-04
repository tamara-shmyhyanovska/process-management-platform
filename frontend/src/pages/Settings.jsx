function Settings() {
  return (
    <div className="settings-page">

      <div className="settings-header">
        <h1>Settings</h1>
        <p>Configure and monitor your Process Management Platform</p>
      </div>

      <div className="settings-grid">

        <div className="settings-card">
          <h2>⚙️ General Settings</h2>
          <p>Application configuration and platform information.</p>

          <div className="settings-info">
            <div>
              <span>Application</span>
              <strong>ProcessFlow</strong>
            </div>

            <div>
              <span>Environment</span>
              <strong>Local Development</strong>
            </div>

            <div>
              <span>Process Intelligence</span>
              <strong>Enabled</strong>
            </div>
          </div>
        </div>


        <div className="settings-card">
          <h2>👤 User Management</h2>
          <p>User accounts, roles and permissions.</p>

          <div className="settings-info">
            <div>
              <span>Current User</span>
              <strong>Process Analyst</strong>
            </div>

            <div>
              <span>Role</span>
              <strong>Administrator</strong>
            </div>

            <div>
              <span>Multi-user Support</span>
              <strong>Planned</strong>
            </div>
          </div>
        </div>


        <div className="settings-card">
          <h2>🔒 Security</h2>
          <p>Authentication and access protection.</p>

          <div className="settings-info">
            <div>
              <span>Authentication</span>
              <strong>Not configured</strong>
            </div>

            <div>
              <span>Access Control</span>
              <strong>Planned</strong>
            </div>

            <div>
              <span>Security Status</span>
              <strong>MVP environment</strong>
            </div>
          </div>
        </div>


        <div className="settings-card">
          <h2>🗄 Database</h2>
          <p>Current data storage and persistence configuration.</p>

          <div className="settings-info">
            <div>
              <span>Database</span>
              <strong>PostgreSQL</strong>
            </div>

            <div>
              <span>Data Persistence</span>
              <strong>Enabled</strong>
            </div>

            <div>
              <span>Backend API</span>
              <strong>Spring Boot</strong>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Settings;