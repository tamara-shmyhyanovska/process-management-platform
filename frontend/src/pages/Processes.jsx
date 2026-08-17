function Processes() {
  return (
    <div className="processes-page">

      <div className="page-header">
        <div>
          <h1>Processes</h1>
          <p>Manage and monitor all business processes</p>
        </div>

        <button className="new-process-button">
          + New Process
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Process..."
          className="search-input"
        />
      </div>

      <div className="table-container">

        <table className="process-table">

          <thead>
            <tr>
              <th>Process Name</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Progress</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Order Fulfillment</td>
              <td>Anna Becker</td>

              <td>
                <span className="status active">Active</span>
              </td>

              <td>
                <span className="priority high">High</span>
              </td>

              <td>
                <div className="progress">
                  <div className="progress-fill fill-90"></div>
                </div>
              </td>
            </tr>

            <tr>
              <td>Employee Onboarding</td>
              <td>Michael Weber</td>

              <td>
                <span className="status completed">Completed</span>
              </td>

              <td>
                <span className="priority medium">Medium</span>
              </td>

              <td>
                <div className="progress">
                  <div className="progress-fill fill-70"></div>
                </div>
              </td>
            </tr>

            <tr>
              <td>Invoice Approval</td>
              <td>Lisa Hoffmann</td>

              <td>
                <span className="status pending">Pending</span>
              </td>

              <td>
                <span className="priority high">High</span>
              </td>

              <td>
                <div className="progress">
                  <div className="progress-fill fill-55"></div>
                </div>
              </td>
            </tr>

            <tr>
              <td>Customer Complaint</td>
              <td>Thomas Klein</td>

              <td>
                <span className="status review">Review</span>
              </td>

              <td>
                <span className="priority low">Low</span>
              </td>

              <td>
                <div className="progress">
                  <div className="progress-fill fill-30"></div>
                </div>
              </td>
            </tr>

            <tr>
              <td>IT Access Request</td>
              <td>Emma Fischer</td>

              <td>
                <span className="status active">Active</span>
              </td>

              <td>
                <span className="priority medium">Medium</span>
              </td>

              <td>
                <div className="progress">
                  <div className="progress-fill fill-80"></div>
                </div>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Processes;