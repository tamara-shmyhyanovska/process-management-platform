import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getIndustries } from "../api/industryApi";
import { getTemplatesByIndustry } from "../api/processTemplateApi";
import { createProcessFromTemplate } from "../api/processApi";

function BuildProcess() {
  const navigate = useNavigate();

  const [industries, setIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [templates, setTemplates] = useState([]);

  const [loadingIndustries, setLoadingIndustries] = useState(true);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [creatingTemplateId, setCreatingTemplateId] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    loadIndustries();
  }, []);

  async function loadIndustries() {
    try {
      setLoadingIndustries(true);
      setError(null);

      const data = await getIndustries();
      setIndustries(data);
    } catch (error) {
      console.error("Failed to load industries:", error);
      setError("Failed to load business types.");
    } finally {
      setLoadingIndustries(false);
    }
  }

  useEffect(() => {
    if (!selectedIndustry) {
      setTemplates([]);
      return;
    }

    loadTemplates(selectedIndustry);
  }, [selectedIndustry]);

  async function loadTemplates(industryId) {
    try {
      setLoadingTemplates(true);
      setError(null);

      const data = await getTemplatesByIndustry(industryId);
      setTemplates(data);
    } catch (error) {
      console.error("Failed to load templates:", error);
      setError("Failed to load process templates.");
    } finally {
      setLoadingTemplates(false);
    }
  }

  async function handleCreateFromTemplate(templateId) {
    try {
      setCreatingTemplateId(templateId);
      setError(null);

      const process = await createProcessFromTemplate(templateId);

      console.log("Created process:", process);

      navigate(`/processes/${process.id}`);
    } catch (error) {
      console.error("Failed to create process:", error);
      setError("Failed to create process from this template.");
    } finally {
      setCreatingTemplateId(null);
    }
  }

  function handleCreateFromScratch() {
    navigate("/processes/new");
  }

  return (
    <div className="process-setup">

      {/* HEADER */}

      <div className="process-setup-header">
        <div>
          <h1>Build Process</h1>

          <p>
            Create a process from scratch or start with a ready-made
            business process template.
          </p>
        </div>
      </div>


      {/* CREATE FROM SCRATCH */}

      <div className="create-process-section">

        <div>
          <h2>Start from scratch</h2>

          <p>
            Define your own process structure and add the steps manually.
          </p>
        </div>

        <button
          className="create-process-button"
          onClick={handleCreateFromScratch}
        >
          + Create New Process
        </button>

      </div>


      {/* ERROR */}

      {error && (
        <div className="process-error">
          {error}
        </div>
      )}


      {/* INDUSTRIES */}

      <section>

        <div className="process-setup-section-header">
          <div>
            <h2>Choose a business type</h2>

            <p>
              Select an industry to explore available process models.
            </p>
          </div>
        </div>


        {loadingIndustries ? (
          <div className="process-loading">
            Loading business types...
          </div>
        ) : (
          <div className="industry-grid">

            {industries.map((industry) => (

              <button
                key={industry.id}
                className={
                  selectedIndustry === industry.id
                    ? "industry-card selected"
                    : "industry-card"
                }
                onClick={() =>
                  setSelectedIndustry(industry.id)
                }
              >
                <h3>{industry.name}</h3>

                <p>{industry.description}</p>

              </button>

            ))}

          </div>
        )}

      </section>


      {/* TEMPLATES */}

      {selectedIndustry && (

        <section className="template-section">

          <div className="process-setup-section-header">

            <div>
              <h2>Available process models</h2>

              <p>
                Start with a predefined process structure and customize it
                later.
              </p>
            </div>

          </div>


          {loadingTemplates ? (

            <div className="process-loading">
              Loading process templates...
            </div>

          ) : templates.length === 0 ? (

            <div className="process-empty">
              <h3>No process templates found</h3>

              <p>
                There are currently no templates available for this
                business type.
              </p>
            </div>

          ) : (

            <div className="template-list">

              {templates.map((template) => (

                <div
                  key={template.id}
                  className="template-card"
                >

                  <div className="template-card-content">

                    <h3>{template.name}</h3>

                    <p>{template.description}</p>

                  </div>


                  <button
                    className="template-button"
                    onClick={() =>
                      handleCreateFromTemplate(template.id)
                    }
                    disabled={
                      creatingTemplateId === template.id
                    }
                  >

                    {creatingTemplateId === template.id
                      ? "Creating..."
                      : "Use this template"}

                  </button>

                </div>

              ))}

            </div>

          )}

        </section>

      )}

    </div>
  );
}

export default BuildProcess;