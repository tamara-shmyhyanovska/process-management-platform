function Header() {
  return (
    <header className="header">

      <div className="header-title">
        <h1>Process Management Platform</h1>
        <p>Business Process Intelligence</p>
      </div>

      <div className="header-user">
        <div className="header-status">
          <span className="status-dot"></span>
          System operational
        </div>

        <div className="header-avatar">
          TS
        </div>
      </div>

    </header>
  );
}

export default Header;