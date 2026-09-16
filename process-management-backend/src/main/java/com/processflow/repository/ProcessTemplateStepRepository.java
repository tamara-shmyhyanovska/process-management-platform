package com.processflow.repository;

import com.processflow.entity.ProcessTemplateStep;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProcessTemplateStepRepository
        extends JpaRepository<ProcessTemplateStep, Long> {

    List<ProcessTemplateStep> findByTemplateIdOrderByStepOrderAsc(Long templateId);
}