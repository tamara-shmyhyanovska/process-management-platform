package com.processflow.analytics;

import com.processflow.entity.ProcessEvent;
import com.processflow.repository.ProcessEventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcessAnalyticsService {

    private final ProcessEventRepository processEventRepository;

    public ProcessAnalyticsService(ProcessEventRepository processEventRepository) {
        this.processEventRepository = processEventRepository;
    }

    public ProcessAnalyticsResponse getProcessAnalytics(Long processId) {

        List<ProcessEvent> events =
                processEventRepository.findByProcessId(processId);

        long totalEvents = events.size();

        long completedEvents = events.stream()
                .filter(event ->
                        "COMPLETED".equalsIgnoreCase(event.getEventType()))
                .count();

        long delayedEvents = events.stream()
                .filter(event ->
                        "DELAYED".equalsIgnoreCase(event.getEventType()))
                .count();

        long totalDurationMinutes = events.stream()
                .filter(event -> event.getDurationMinutes() != null)
                .mapToLong(ProcessEvent::getDurationMinutes)
                .sum();

        double averageDurationMinutes =
                events.stream()
                        .filter(event -> event.getDurationMinutes() != null)
                        .mapToInt(ProcessEvent::getDurationMinutes)
                        .average()
                        .orElse(0.0);

        return new ProcessAnalyticsResponse(
                processId,
                totalEvents,
                completedEvents,
                delayedEvents,
                totalDurationMinutes,
                averageDurationMinutes
        );
    }
}