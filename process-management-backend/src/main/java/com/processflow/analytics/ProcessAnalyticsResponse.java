package com.processflow.analytics;

public class ProcessAnalyticsResponse {

    private Long processId;

    private long totalEvents;

    private long completedEvents;

    private long delayedEvents;

    private long totalDurationMinutes;

    private double averageDurationMinutes;

    public ProcessAnalyticsResponse() {
    }

    public ProcessAnalyticsResponse(
            Long processId,
            long totalEvents,
            long completedEvents,
            long delayedEvents,
            long totalDurationMinutes,
            double averageDurationMinutes
    ) {
        this.processId = processId;
        this.totalEvents = totalEvents;
        this.completedEvents = completedEvents;
        this.delayedEvents = delayedEvents;
        this.totalDurationMinutes = totalDurationMinutes;
        this.averageDurationMinutes = averageDurationMinutes;
    }

    public Long getProcessId() {
        return processId;
    }

    public void setProcessId(Long processId) {
        this.processId = processId;
    }

    public long getTotalEvents() {
        return totalEvents;
    }

    public void setTotalEvents(long totalEvents) {
        this.totalEvents = totalEvents;
    }

    public long getCompletedEvents() {
        return completedEvents;
    }

    public void setCompletedEvents(long completedEvents) {
        this.completedEvents = completedEvents;
    }

    public long getDelayedEvents() {
        return delayedEvents;
    }

    public void setDelayedEvents(long delayedEvents) {
        this.delayedEvents = delayedEvents;
    }

    public long getTotalDurationMinutes() {
        return totalDurationMinutes;
    }

    public void setTotalDurationMinutes(long totalDurationMinutes) {
        this.totalDurationMinutes = totalDurationMinutes;
    }

    public double getAverageDurationMinutes() {
        return averageDurationMinutes;
    }

    public void setAverageDurationMinutes(double averageDurationMinutes) {
        this.averageDurationMinutes = averageDurationMinutes;
    }
}