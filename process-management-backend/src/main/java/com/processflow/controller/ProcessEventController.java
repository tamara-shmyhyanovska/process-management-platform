package com.processflow.controller;

import com.processflow.entity.ProcessEvent;
import com.processflow.repository.ProcessEventRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/process-events")
@CrossOrigin(origins = "http://localhost:5173")
public class ProcessEventController {

    private final ProcessEventRepository repository;

    public ProcessEventController(ProcessEventRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<ProcessEvent> getAllEvents() {
        return repository.findAll();
    }

    @GetMapping("/process/{processId}")
    public List<ProcessEvent> getEventsByProcess(@PathVariable Long processId) {
        return repository.findByProcessId(processId);
    }

    @PostMapping
    public ProcessEvent createEvent(@RequestBody ProcessEvent event) {
        return repository.save(event);
    }
}
