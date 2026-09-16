package com.processflow.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "process_template_steps")
public class ProcessTemplateStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long templateId;

    private String name;

    private Integer stepOrder;

    private Integer expectedDurationHours;

    public ProcessTemplateStep() {
    }

    public Long getId() {
        return id;
    }

    public Long getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Long templateId) {
        this.templateId = templateId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStepOrder() {
        return stepOrder;
    }

    public void setStepOrder(Integer stepOrder) {
        this.stepOrder = stepOrder;
    }

    public Integer getExpectedDurationHours() {
        return expectedDurationHours;
    }

    public void setExpectedDurationHours(Integer expectedDurationHours) {
        this.expectedDurationHours = expectedDurationHours;
    }
}