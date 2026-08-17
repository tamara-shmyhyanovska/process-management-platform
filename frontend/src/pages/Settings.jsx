function Settings() {
  return (
    <div className="settings-page">

      <div className="settings-header">
        <h1>Settings</h1>
        <p>Configure your Process Management Platform</p>
      </div>

      <div className="settings-grid">

        <div className="settings-card">
          <h2>⚙️ General Settings</h2>
          <p>Manage application preferences and system configuration.</p>
          <button>Open</button>
        </div>

        <div className="settings-card">
          <h2>👤 User Management</h2>
          <p>Create users, assign roles and manage permissions.</p>
          <button>Open</button>
        </div>

        <div className="settings-card">
          <h2>🔒 Security</h2>
          <p>Configure authentication and access protection.</p>
          <button>Open</button>
        </div>

        <div className="settings-card">
          <h2>🗄 Database</h2>
          <p>Database connection and backup configuration.</p>
          <button>Open</button>
        </div>

      </div>

    </div>
  );
}

export default Settings;