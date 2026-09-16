package com.processflow.repository;

import com.processflow.entity.ProcessEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProcessEventRepository extends JpaRepository<ProcessEvent, Long> {

    List<ProcessEvent> findByProcessId(Long processId);

    List<ProcessEvent> findByProcessStepId(Long processStepId);
}
