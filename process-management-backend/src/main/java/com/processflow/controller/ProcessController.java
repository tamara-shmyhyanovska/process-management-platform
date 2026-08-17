package com.processflow.controller;

import com.processflow.entity.Process;
import com.processflow.service.ProcessService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/processes")
@CrossOrigin(origins = "http://localhost:5173")
public class ProcessController {

    private final ProcessService processService;

    public ProcessController(ProcessService processService) {
        this.processService = processService;
    }

    @GetMapping
    public List<Process> getAllProcesses() {
        return processService.getAllProcesses();
    }

    @GetMapping("/{id}")
    public Process getProcessById(@PathVariable Long id) {
        return processService.getProcessById(id);
    }

    @PostMapping
    public Process createProcess(@RequestBody Process process) {
        return processService.createProcess(process);
    }

    @PutMapping("/{id}")
    public Process updateProcess(
            @PathVariable Long id,
            @RequestBody Process process) {

        return processService.updateProcess(id, process);
    }

    @DeleteMapping("/{id}")
    public void deleteProcess(@PathVariable Long id) {
        processService.deleteProcess(id);
    }
}