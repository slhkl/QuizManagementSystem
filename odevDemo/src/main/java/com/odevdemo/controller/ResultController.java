package com.odevdemo.controller;

import com.odevdemo.exception.ResourceNotFoundException;
import com.odevdemo.model.Login;
import com.odevdemo.model.Result;
import com.odevdemo.model.Student;
import com.odevdemo.model.Teacher;
import com.odevdemo.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("api/result")
public class ResultController {

    @Autowired
    ResultRepository resultRepository;

    @PostMapping
    public Result AddResult(@RequestBody Result result) {
        return resultRepository.save(result);
    }
}