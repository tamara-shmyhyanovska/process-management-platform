package com.processflow.repository;

import com.processflow.entity.ProcessTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProcessTemplateRepository
        extends JpaRepository<ProcessTemplate, Long> {

    List<ProcessTemplate> findByIndustryId(Long industryId);
}