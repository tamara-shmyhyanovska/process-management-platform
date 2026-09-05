import { useEffect, useState } from "react";
import { getIndustries } from "../api/industryApi";
import { getTemplatesByIndustry } from "../api/processTemplateApi";

function ProcessSetup() {
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

  const handleUseTemplate = (template) => {
    console.log("Selected template:", template);
  };

  return (
    <div className="process-setup">

      <div className="process-setup-header">
        <h1>Create your process</h1>

        <p>
          Start with a process model that fits the way your business works.
        </p>
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

          <div className="template-list">

            {templates.length === 0 ? (
              <p>No process models available for this industry.</p>
            ) : (
              templates.map((template) => (
                <div
                  key={template.id}
                  className="template-card"
                >
                  <h3>{template.name}</h3>

                  <p>{template.description}</p>

                  <button
                    onClick={() => handleUseTemplate(template)}
                  >
                    Use this template
                  </button>
                </div>
              ))
            )}

          </div>

        </section>
      )}

    </div>
  );
}

export default ProcessSetup;