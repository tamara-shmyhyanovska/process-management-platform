package com.processflow.controller;

import com.processflow.entity.ProcessTemplate;
import com.processflow.repository.ProcessTemplateRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/process-templates")
@CrossOrigin(origins = "http://localhost:5175")
public class ProcessTemplateController {

    private final ProcessTemplateRepository processTemplateRepository;

    public ProcessTemplateController(
            ProcessTemplateRepository processTemplateRepository) {
        this.processTemplateRepository = processTemplateRepository;
    }

    @GetMapping
    public List<ProcessTemplate> getAllTemplates() {
        return processTemplateRepository.findAll();
    }

    @GetMapping("/industry/{industryId}")
    public List<ProcessTemplate> getTemplatesByIndustry(
            @PathVariable Long industryId) {

        return processTemplateRepository.findByIndustryId(industryId);
    }
}