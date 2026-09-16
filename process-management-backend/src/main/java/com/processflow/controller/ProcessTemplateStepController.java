package com.processflow.controller;

import com.processflow.entity.ProcessTemplateStep;
import com.processflow.repository.ProcessTemplateStepRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/process-template-steps")
@CrossOrigin(origins = "http://localhost:5175")
public class ProcessTemplateStepController {

    private final ProcessTemplateStepRepository repository;

    public ProcessTemplateStepController(
            ProcessTemplateStepRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/template/{templateId}")
    public List<ProcessTemplateStep> getStepsByTemplate(
            @PathVariable Long templateId) {

        return repository.findByTemplateIdOrderByStepOrderAsc(templateId);
    }
}