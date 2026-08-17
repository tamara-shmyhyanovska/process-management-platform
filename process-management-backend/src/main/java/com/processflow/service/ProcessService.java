package com.processflow.service;

import com.processflow.entity.Process;
import com.processflow.repository.ProcessRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcessService {

    private final ProcessRepository processRepository;

    public ProcessService(ProcessRepository processRepository) {
        this.processRepository = processRepository;
    }

    public List<Process> getAllProcesses() {
        return processRepository.findAll();
    }

    public Process getProcessById(Long id) {
        return processRepository.findById(id).orElse(null);
    }

    public Process createProcess(Process process) {
        return processRepository.save(process);
    }

    public Process updateProcess(Long id, Process updatedProcess) {

        Process existingProcess = processRepository.findById(id).orElse(null);

        if (existingProcess == null) {
            return null;
        }

        existingProcess.setName(updatedProcess.getName());
        existingProcess.setOwner(updatedProcess.getOwner());
        existingProcess.setStatus(updatedProcess.getStatus());
        existingProcess.setPriority(updatedProcess.getPriority());
        existingProcess.setProgress(updatedProcess.getProgress());

        return processRepository.save(existingProcess);
    }

    public void deleteProcess(Long id) {
        processRepository.deleteById(id);
    }
}