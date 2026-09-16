package com.processflow.controller;

import com.processflow.service.ProcessIntelligenceService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/processes")
@CrossOrigin(origins = "http://localhost:5175")
public class ProcessIntelligenceController {

    private final ProcessIntelligenceService intelligenceService;

    public ProcessIntelligenceController(
            ProcessIntelligenceService intelligenceService) {
        this.intelligenceService = intelligenceService;
    }

    @GetMapping("/{processId}/intelligence")
    public Map<String, Object> getProcessIntelligence(
            @PathVariable Long processId) {

        return intelligenceService.analyzeProcess(processId);
    }
}