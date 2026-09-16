import { useEffect, useState } from "react";
import { getIndustries } from "../api/industryApi";
import { getTemplatesByIndustry } from "../api/processTemplateApi";
import { createProcessFromTemplate } from "../api/processApi";


function BuildProcess() {
  const [industries, setIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [templates, setTemplates] = useState([]);



  useEffect(() => {
    getIndustries()
      .then((data) => {
        setIndustries(data);
      })
      .catch((error) => {
        console.error("Failed to load industries:", error);
      });
  }, []);

  useEffect(() => {
    if (!selectedIndustry) {
      setTemplates([]);
      return;
    }

    getTemplatesByIndustry(selectedIndustry)
      .then((data) => {
        setTemplates(data);
      })
      .catch((error) => {
        console.error("Failed to load templates:", error);
      });
  }, [selectedIndustry]);

  return (
    <div className="process-setup">

      <div className="process-setup-header">
        <h1>Build Process</h1>

        <p>
          Choose your business type and start with a process template.
        </p>
      </div>

      <div className="create-process-section">
        <button
          className="create-process-button"
          onClick={() => {
            window.location.href = "/processes/new";
          }}
        >
          + Create New Process
        </button>
      </div>

      <section>
        <h2>What type of business do you run?</h2>

        <div className="industry-grid">
          {industries.map((industry) => (
            <button
              key={industry.id}
              className={
                selectedIndustry === industry.id
                  ? "industry-card selected"
                  : "industry-card"
              }
              onClick={() => setSelectedIndustry(industry.id)}
            >
              <h3>{industry.name}</h3>
              <p>{industry.description}</p>
            </button>
          ))}
        </div>
      </section>

      {selectedIndustry && (
        <section className="template-section">

          <h2>Available process models</h2>

          {templates.length === 0 ? (
            <p>No process templates found.</p>
          ) : (
            <div className="template-list">

              {templates.map((template) => (
                <div
                  key={template.id}
                  className="template-card"
                >
                  <h3>{template.name}</h3>

                  <p>{template.description}</p>

                  <button
                    onClick={async() => {
                     try{
                      const process = await
                      createProcessFromTemplate(template.id);

                      alert("Process created successfully!");

                      console.log("Created process:", process);
                     } catch (error) {
                      console.error("Failed to create process:", error);
                      
                      alert("Failed to create process.")
                     }
                   }}
                  > 
                    Use this template
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