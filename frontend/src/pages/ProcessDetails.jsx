import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getProcessById,
  createProcessStep,
} from "../api/processApi.js";

function ProcessDetails() {
  const { id } = useParams();

  const [process, setProcess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showAddStepForm, setShowAddStepForm] = useState(false);
  const [stepName, setStepName] = useState("");
  const [stepDuration, setStepDuration] = useState("");
  const [stepError, setStepError] = useState("");

  useEffect(() => {
    async function loadProcess() {
      try {
        const data = await getProcessById(id);
        setProcess(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load process");
      } finally {
        setLoading(false);
      }
    }

    loadProcess();
  }, [id]);

  async function handleAddStep() {
    setStepError("");

    if (!stepName.trim()) {
      setStepError("Please enter a step name.");
      return;
    }

    if (!stepDuration || Number(stepDuration) < 0) {
      setStepError("Please enter a valid duration.");
      return;
    }

    try {
      const newStep = await createProcessStep(process.id, {
        name: stepName.trim(),
        stepOrder: (process.steps?.length || 0) + 1,
        expectedDurationHours: Number(stepDuration),
        status: "PENDING",
      });

      console.log("Created step:", newStep);

      setProcess({
        ...process,
        steps: [...(process.steps || []), newStep],
      });

      setStepName("");
      setStepDuration("");
      setShowAddStepForm(false);
    } catch (error) {
      console.error("Failed to create step:", error);
      setStepError("Failed to create process step.");
    }
  }

  if (loading) {
    return (
      <div className="process-details">
        <p>Loading process...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="process-details">
        <p>{error}</p>
      </div>
    );
  }

  if (!process) {
    return (
      <div className="process-details">
        <p>Process not found.</p>
      </div>
    );
  }

  const steps = [...(process.steps || [])].sort(
    (a, b) => a.stepOrder - b.stepOrder
  );

  return (
    <div className="process-details">
      <Link to="/processes" className="back-link">
        ← Back to Processes
      </Link>

      <div className="process-details-header">
        <div>
          <h1>{process.name}</h1>
          <p>Process overview and performance</p>
        </div>

        <div className="process-status">
          {process.status}
        </div>
      </div>

      <div className="process-info-grid">
        <div className="info-card">
          <span>Owner</span>
          <strong>{process.owner}</strong>
        </div>

        <div className="info-card">
          <span>Priority</span>
          <strong>{process.priority}</strong>
        </div>

        <div className="info-card">
          <span>Progress</span>
          <strong>{process.progress}%</strong>
        </div>

        <div className="info-card">
          <span>Total steps</span>
          <strong>{steps.length}</strong>
        </div>
      </div>

      <section className="process-steps-section">
        <div className="section-header">
          <div>
            <h2>Process Steps</h2>
            <p>Steps included in this process</p>
          </div>

          <button
            className="add-step-button"
            onClick={() => {
              setShowAddStepForm(true);
              setStepError("");
            }}
          >
            + Add Step
          </button>
        </div>

        {showAddStepForm && (
          <div className="add-step-form">
            <h3>Add New Step</h3>

            <input
              type="text"
              placeholder="Step name"
              value={stepName}
              onChange={(e) => setStepName(e.target.value)}
            />
            
            <input
              type="number"
              min="0"
              step="0.5"
              placeholder="Expected duration (hours)"
              value={stepDuration}
              onChange={(e) => setStepDuration(e.target.value)}
            />

            {stepError && (
              <p className="form-error">
                {stepError}
              </p>
            )}

            <div className="add-step-form-actions">
              <button
                type="button"
                onClick={() => {
                  setShowAddStepForm(false);
                  setStepName("");
                  setStepDuration("");
                  setStepError("");
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAddStep}
              >
                Add Step
              </button>
            </div>
          </div>
        )}

        <div className="process-steps-list">
          {steps.length > 0 ? (
            steps.map((step) => (
              <div
                key={step.id}
                className="process-step-card"
              >
                <div className="step-number">
                  {step.stepOrder}
                </div>

                <div className="step-content">
                  <h3>{step.name}</h3>

                  <p>
                    Expected duration:{" "}
                    {step.expectedDurationHours ?? 0} hours
                  </p>
                </div>

                <div className="step-status">
                  {step.status}
                </div>
              </div>
            ))
          ) : (
            <p>No steps available.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProcessDetails;