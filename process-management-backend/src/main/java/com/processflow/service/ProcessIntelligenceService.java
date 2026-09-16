package com.processflow.service;

import com.processflow.entity.ProcessEvent;
import com.processflow.entity.ProcessStep;
import com.processflow.repository.ProcessEventRepository;
import com.processflow.repository.ProcessStepRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProcessIntelligenceService {

    private final ProcessEventRepository processEventRepository;
    private final ProcessStepRepository processStepRepository;

    public ProcessIntelligenceService(
            ProcessEventRepository processEventRepository,
            ProcessStepRepository processStepRepository) {

        this.processEventRepository = processEventRepository;
        this.processStepRepository = processStepRepository;
    }

    public Map<String, Object> analyzeProcess(Long processId) {

        List<ProcessEvent> events =
                processEventRepository.findByProcessId(processId);

        List<ProcessStep> steps =
                processStepRepository.findByProcessId(processId);

        Map<String, Object> result = new LinkedHashMap<>();

        // -----------------------------------------
        // 1. BASIC PROCESS METRICS
        // -----------------------------------------

        int totalEvents = events.size();

        long completedEvents = events.stream()
                .filter(event -> "COMPLETED".equalsIgnoreCase(event.getEventType()))
                .count();

        long delayedEvents = events.stream()
                .filter(event -> "DELAYED".equalsIgnoreCase(event.getEventType()))
                .count();

        double completionRate = totalEvents == 0
                ? 0
                : (completedEvents * 100.0) / totalEvents;

        double delayRate = totalEvents == 0
                ? 0
                : (delayedEvents * 100.0) / totalEvents;

        int totalDuration = events.stream()
                .filter(event -> event.getDurationMinutes() != null)
                .mapToInt(ProcessEvent::getDurationMinutes)
                .sum();

        double averageDuration = totalEvents == 0
                ? 0
                : totalDuration / (double) totalEvents;


        // -----------------------------------------
        // 2. EMPLOYEE DEPENDENCY
        // -----------------------------------------

        Map<String, Long> employeeActivity = events.stream()
                .filter(event -> event.getEmployee() != null)
                .collect(Collectors.groupingBy(
                        ProcessEvent::getEmployee,
                        Collectors.counting()
                ));

        String mostActiveEmployee = null;
        double employeeDependencyRate = 0;

        if (!employeeActivity.isEmpty()) {

            Map.Entry<String, Long> topEmployee =
                    employeeActivity.entrySet()
                            .stream()
                            .max(Map.Entry.comparingByValue())
                            .orElse(null);

            if (topEmployee != null) {
                mostActiveEmployee = topEmployee.getKey();

                employeeDependencyRate =
                        (topEmployee.getValue() * 100.0) / totalEvents;
            }
        }


        // -----------------------------------------
        // 3. BOTTLENECK DETECTION
        // -----------------------------------------

        Map<Long, List<ProcessEvent>> eventsByStep =
                events.stream()
                        .filter(event -> event.getProcessStepId() != null)
                        .collect(Collectors.groupingBy(
                                ProcessEvent::getProcessStepId
                        ));

       final Long[] bottleneckStepId = {null};
        double highestAverageDuration = 0;

        for (Map.Entry<Long, List<ProcessEvent>> entry
                : eventsByStep.entrySet()) {
        	double averageStepDuration =
                    entry.getValue()
                            .stream()
                            .filter(event -> event.getDurationMinutes() != null)
                            .mapToInt(ProcessEvent::getDurationMinutes)
                            .average()
                            .orElse(0);

            if (averageStepDuration > highestAverageDuration) {
                highestAverageDuration = averageStepDuration;
                bottleneckStepId[0] = entry.getKey();
            }
        }

        String bottleneckStepName = "Unknown";

        if (bottleneckStepId != null) {

            bottleneckStepName = steps.stream()
                    .filter(step -> step.getId().equals(bottleneckStepId[0]))
                    .map(ProcessStep::getName)
                    .findFirst()
                    .orElse("Unknown");
        }


        // -----------------------------------------
        // 4. BUILD INTELLIGENCE RESULT
        // -----------------------------------------

        result.put("processId", processId);

        result.put("totalEvents", totalEvents);
        result.put("completedEvents", completedEvents);
        result.put("delayedEvents", delayedEvents);

        result.put("completionRate",
                Math.round(completionRate * 10.0) / 10.0);

        result.put("delayRate",
                Math.round(delayRate * 10.0) / 10.0);

        result.put("totalDurationMinutes", totalDuration);

        result.put("averageDurationMinutes",
                Math.round(averageDuration * 10.0) / 10.0);

        result.put("mostActiveEmployee",
                mostActiveEmployee);

        result.put("employeeDependencyRate",
                Math.round(employeeDependencyRate * 10.0) / 10.0);

        result.put("bottleneckStep",
                bottleneckStepName);

        result.put("bottleneckAverageDurationMinutes",
                Math.round(highestAverageDuration * 10.0) / 10.0);

        return result;
    }
}
        