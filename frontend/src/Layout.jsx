import "./App.css";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Processes from "./pages/Processes";
import ProcessDetails from "./pages/ProcessDetails";
import Analytics from "./pages/Analytics";
import Employees from "./pages/Employees";
import Settings from "./pages/Settings";
import ProcessSetup from "./pages/ProcessSetup";
import BuildProcess from "./pages/BuildProcess";
import CreateProcess from "./pages/CreateProcess";

function Layout() {
  return (
    <div className="layout">

      <Sidebar />

      <div className="content">

        <Header />

        <Routes>
         <Route path="/" element={<Dashboard />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/processes" element={<Processes />} />
         <Route path="/processes/new" element={<CreateProcess />} />
         <Route path="/processes/:id" element={<ProcessDetails />} />
         <Route path="/analytics" element={<Analytics />} />
         <Route path="/employees" element={<Employees />} />
         <Route path="/settings" element={<Settings />} />
         <Route path="/process-setup" element={<ProcessSetup />} />
         <Route path="/build-process" element={<BuildProcess />} />
        </Routes>

      </div>

    </div>
  );
}

export default Layout;