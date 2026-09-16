package com.processflow.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "process_templates")
public class ProcessTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long industryId;

    private String name;

    private String description;

    public ProcessTemplate() {
    }

    public Long getId() {
        return id;
    }

    public Long getIndustryId() {
        return industryId;
    }

    public void setIndustryId(Long industryId) {
        this.industryId = industryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}