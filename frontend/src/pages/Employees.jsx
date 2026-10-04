import { useEffect, useState } from "react";
import {
  getProcesses,
  getProcessEvents,
} from "../api/processApi";

const employeeDirectory = [
  {
    name: "Anna Becker",
    department: "Operations",
    position: "Process Manager",
    status: "Active",
  },
  {
    name: "Michael Weber",
    department: "HR",
    position: "HR Specialist",
    status: "Active",
  },
  {
    name: "Lisa Hoffmann",
    department: "Finance",
    position: "Accountant",
    status: "Vacation",
  },
  {
    name: "Thomas Klein",
    department: "Customer Service",
    position: "Support Lead",
    status: "Training",
  },
  {
    name: "Emma Fischer",
    department: "IT",
    position: "System Administrator",
    status: "Remote",
  },
];

function Employees() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployeeEvents();
  }, []);

  async function loadEmployeeEvents() {
    try {
      const processes = await getProcesses();

      const eventLists = await Promise.all(
        processes.map((process) =>
          getProcessEvents(process.id)
        )
      );

      const allEvents = eventLists.flat();

      setEvents(allEvents);
    } catch (error) {
      console.error("Failed to load employee events:", error);
    } finally {
      setLoading(false);
    }
  }

  function getEmployeeEvents(employeeName) {
    return events.filter(
      (event) => event.employee === employeeName
    );
  }

  function getDelayedEvents(employeeName) {
    return getEmployeeEvents(employeeName).filter(
      (event) => event.eventType === "DELAYED"
    );
  }

  function getAverageDuration(employeeName) {
    const employeeEvents = getEmployeeEvents(employeeName);

    if (employeeEvents.length === 0) {
      return 0;
    }

    const totalDuration = employeeEvents.reduce(
      (sum, event) =>
        sum + (event.durationMinutes || 0),
      0
    );

    return Math.round(
      totalDuration / employeeEvents.length
    );
  }

  const totalEmployees = employeeDirectory.length;

  const activeEmployees = employeeDirectory.filter(
    (employee) => employee.status === "Active"
  ).length;

  const totalEvents = events.length;

  const delayedEvents = events.filter(
    (event) => event.eventType === "DELAYED"
  ).length;

  const departments = employeeDirectory.reduce(
    (result, employee) => {
      if (!result[employee.department]) {
        result[employee.department] = {
          employees: 0,
          events: 0,
          delayed: 0,
        };
      }

      result[employee.department].employees += 1;

      const employeeEvents = getEmployeeEvents(
        employee.name
      );

      result[employee.department].events +=
        employeeEvents.length;

      result[employee.department].delayed +=
        employeeEvents.filter(
          (event) => event.eventType === "DELAYED"
        ).length;

      return result;
    },
    {}
  );

  return (
    <div className="employees-page">

      <div className="page-header">
        <div>
          <h1>Employees</h1>
          <p>
            Manage company employees and responsibilities
          </p>
        </div>

        <button className="new-process-button">
          + Add Employee
        </button>
      </div>

      <div className="intelligence-summary">

        <div>
          <span>Total Employees</span>
          <strong>{totalEmployees}</strong>
        </div>

        <div>
          <span>Active Employees</span>
          <strong>{activeEmployees}</strong>
        </div>

        <div>
          <span>Total Events</span>
          <strong>
            {loading ? "..." : totalEvents}
          </strong>
        </div>

        <div>
          <span>Delayed Events</span>
          <strong>
            {loading ? "..." : delayedEvents}
          </strong>
        </div>

      </div>

      <div className="table-container">

        <table className="process-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Position</th>
              <th>Status</th>
              <th>Events</th>
              <th>Delayed</th>
              <th>Avg. Duration</th>
            </tr>
          </thead>

          <tbody>

            {employeeDirectory.map((employee) => {

              const employeeEvents =
                getEmployeeEvents(employee.name);

              const delayed =
                getDelayedEvents(employee.name);

              const averageDuration =
                getAverageDuration(employee.name);

              return (
                <tr key={employee.name}>

                  <td>
                    {employee.name}
                  </td>

                  <td>
                    {employee.department}
                  </td>

                  <td>
                    {employee.position}
                  </td>

                  <td>
                    <span
                      className={
                        employee.status === "Active"
                          ? "status active"
                          : employee.status === "Vacation"
                          ? "status pending"
                          : employee.status === "Training"
                          ? "status review"
                          : "status completed"
                      }
                    >
                      {employee.status}
                    </span>
                  </td>

                  <td>
                    {loading
                      ? "..."
                      : employeeEvents.length}
                  </td>

                  <td>
                    {loading
                      ? "..."
                      : delayed.length}
                  </td>

                  <td>
                    {loading
                      ? "..."
                      : `${averageDuration} min`}
                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      <div className="table-container">

        <div className="section-heading">
          <div>
            <h2>Department Overview</h2>
            <p>
              Process activity grouped by department
            </p>
          </div>
        </div>

        <table className="process-table">

          <thead>
            <tr>
              <th>Department</th>
              <th>Employees</th>
              <th>Events</th>
              <th>Delayed Events</th>
            </tr>
          </thead>

          <tbody>

            {Object.entries(departments).map(
              ([department, data]) => (
                <tr key={department}>

                  <td>
                    {department}
                  </td>

                  <td>
                    {data.employees}
                  </td>

                  <td>
                    {loading ? "..." : data.events}
                  </td>

                  <td>
                    {loading ? "..." : data.delayed}
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Employees;
        