package com.processflow.controller;

import com.processflow.entity.Process;
import com.processflow.entity.ProcessStep;
import com.processflow.repository.ProcessRepository;
import com.processflow.repository.ProcessStepRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/process-steps")
@CrossOrigin(origins = "http://localhost:5175")
public class ProcessStepController {

    private final ProcessStepRepository processStepRepository;
    private final ProcessRepository processRepository;

    public ProcessStepController(
    		ProcessStepRepository processStepRepository,
    		ProcessRepository processRepository) {
    	
    	this.processStepRepository = processStepRepository;
    	this.processRepository = processRepository;
    }

    @GetMapping
    public List<ProcessStep> getAllSteps() {
        return processStepRepository.findAll();
    }

    @GetMapping("/process/{processId}")
    public List<ProcessStep> getStepsByProcessId(
            @PathVariable Long processId) {

        return processStepRepository.findByProcessId(processId);
    }
    
    @PostMapping("/process/{processId}")
    public ProcessStep createStep(
            @PathVariable Long processId,
            @RequestBody ProcessStep processStep) {

        Process process = processRepository.findById(processId)
                .orElseThrow(() -> new RuntimeException(
                        "Process not found: " + processId));

        processStep.setProcess(process);

        return processStepRepository.save(processStep);
    }  
}