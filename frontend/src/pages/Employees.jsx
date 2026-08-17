function Employees() {
  return (
    <div className="employees-page">

      <div className="page-header">
        <div>
          <h1>Employees</h1>
          <p>Manage company employees and responsibilities</p>
        </div>

        <button className="new-process-button">
          + Add Employee
        </button>
      </div>

      <div className="table-container">

        <table className="process-table">

          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Position</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Anna Becker</td>
              <td>Operations</td>
              <td>Process Manager</td>
              <td><span className="status active">Active</span></td>
            </tr>

            <tr>
              <td>Michael Weber</td>
              <td>HR</td>
              <td>HR Specialist</td>
              <td><span className="status active">Active</span></td>
            </tr>

            <tr>
              <td>Lisa Hoffmann</td>
              <td>Finance</td>
              <td>Accountant</td>
              <td><span className="status pending">Vacation</span></td>
            </tr>

            <tr>
              <td>Thomas Klein</td>
              <td>Customer Service</td>
              <td>Support Lead</td>
              <td><span className="status review">Training</span></td>
            </tr>

            <tr>
              <td>Emma Fischer</td>
              <td>IT</td>
              <td>System Administrator</td>
              <td><span className="status completed">Remote</span></td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Employees;