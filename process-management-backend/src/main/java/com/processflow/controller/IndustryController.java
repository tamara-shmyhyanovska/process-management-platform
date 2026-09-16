package com.processflow.controller;

import com.processflow.entity.Industry;
import com.processflow.repository.IndustryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/industries")
@CrossOrigin(origins = "http://localhost:5175")
public class IndustryController {

    private final IndustryRepository industryRepository;

    public IndustryController(IndustryRepository industryRepository) {
        this.industryRepository = industryRepository;
    }

    @GetMapping
    public List<Industry> getIndustries() {
        return industryRepository.findAll();
    }
}