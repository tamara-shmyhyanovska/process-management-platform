package com.processflow.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "process_steps")
public class ProcessStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer stepOrder;

    private Integer expectedDurationHours;

    private String status;

    @ManyToOne
    @JoinColumn(name = "process_id")
    @JsonIgnore
    private Process process;

    public ProcessStep() {
    }

    public Long getId() {
        return id;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @JsonIgnore
    public Process getProcess() {
        return process;
    }

    public void setProcess(Process process) {
        this.process = process;
    }
}