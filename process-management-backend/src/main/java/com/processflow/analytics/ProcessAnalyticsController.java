package com.processflow.analytics;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:5175")
public class ProcessAnalyticsController {

    private final ProcessAnalyticsService processAnalyticsService;

    public ProcessAnalyticsController(
            ProcessAnalyticsService processAnalyticsService) {
        this.processAnalyticsService = processAnalyticsService;
    }

    @GetMapping("/processes/{processId}")
    public ProcessAnalyticsResponse getProcessAnalytics(
            @PathVariable Long processId) {

        return processAnalyticsService.getProcessAnalytics(processId);
    }
}