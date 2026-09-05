import {
  LayoutDashboard,
  Workflow,
  BarChart3,
  Users,
  Settings,
  PlusCircle
} from 'lucide-react'

import { NavLink } from "react-router-dom";

function Sidebar() {

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">P</div>

        <div>
          <h2>ProcessFlow</h2>
          <span>Process Management</span>
        </div>
      </div>

      <nav className="sidebar-navigation">
        <p className="navigation-label">MAIN MENU</p>

        <NavLink to="/dashboard" className="navigation-item">
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>
    
        <NavLink to="/processes" className="navigation-item">
         <Workflow size={19} />
         <span>Processes</span>
        </NavLink>

        <NavLink to="/analytics" className="navigation-item">
          <BarChart3 size={19} />
          <span>Analytics</span>
        </NavLink>
        
        <NavLink to="/employees" className="navigation-item">
          <Users size={19} />
          <span>Employees</span>
        </NavLink>

        <NavLink to="/settings" className="navigation-item">
          <Users size={19} />
          <span>Settings</span>
        </NavLink>

        <NavLink to="/build-process" className="navigation-item">
          <PlusCircle size={19} />
          <span>Build Process</span>
        </NavLink>

      </nav>

      <div className="sidebar-bottom">
       
        <div className="user-profile">
          <div className="user-avatar">TS</div>

          <div>
            <strong>Process Analyst</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar;