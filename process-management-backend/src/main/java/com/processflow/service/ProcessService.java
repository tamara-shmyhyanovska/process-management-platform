package com.processflow.service;

import com.processflow.entity.Process;
import com.processflow.entity.ProcessStep;
import com.processflow.entity.ProcessTemplateStep;
import com.processflow.repository.ProcessRepository;
import com.processflow.repository.ProcessStepRepository;
import com.processflow.repository.ProcessTemplateStepRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcessService {

    private final ProcessRepository processRepository;
    private final ProcessStepRepository processStepRepository;
    private final ProcessTemplateStepRepository templateStepRepository;

    public ProcessService(
            ProcessRepository processRepository,
            ProcessStepRepository processStepRepository,
            ProcessTemplateStepRepository templateStepRepository) {

        this.processRepository = processRepository;
        this.processStepRepository = processStepRepository;
        this.templateStepRepository = templateStepRepository;
    }

    public List<Process> getAllProcesses() {
        return processRepository.findAll();
    }

    public Process getProcessById(Long id) {
        return processRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Process not found: " + id));
    }

    public Process createProcess(Process process) {
        return processRepository.save(process);
    }

    public Process createProcessFromTemplate(Long templateId) {

        Process process = new Process();

        process.setName("New Process");
        process.setOwner("Business Owner");
        process.setStatus("ACTIVE");
        process.setPriority("MEDIUM");
        process.setProgress(0);

        Process savedProcess = processRepository.save(process);

        List<ProcessTemplateStep> templateSteps =
                templateStepRepository
                        .findByTemplateIdOrderByStepOrderAsc(templateId);

        for (ProcessTemplateStep templateStep : templateSteps) {

            ProcessStep step = new ProcessStep();

            step.setName(templateStep.getName());
            step.setStepOrder(templateStep.getStepOrder());
            step.setExpectedDurationHours(
                    templateStep.getExpectedDurationHours()
            );
            step.setStatus("PENDING");
            step.setProcess(savedProcess);

            processStepRepository.save(step);
        }

        return savedProcess;
    }

    public Process updateProcess(Long id, Process process) {

        Process existingProcess = getProcessById(id);

        existingProcess.setName(process.getName());
        existingProcess.setOwner(process.getOwner());
        existingProcess.setStatus(process.getStatus());
        existingProcess.setPriority(process.getPriority());
        existingProcess.setProgress(process.getProgress());

        return processRepository.save(existingProcess);
    }

    public void deleteProcess(Long id) {
        processRepository.deleteById(id);
    }
}