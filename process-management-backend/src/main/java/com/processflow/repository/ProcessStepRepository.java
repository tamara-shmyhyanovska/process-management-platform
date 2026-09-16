package com.processflow.repository;

import com.processflow.entity.ProcessStep;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProcessStepRepository extends JpaRepository<ProcessStep, Long> {

    List<ProcessStep> findByProcessId(Long processId);
}
