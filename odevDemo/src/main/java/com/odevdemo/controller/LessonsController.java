package com.odevdemo.controller;

import com.odevdemo.model.Lesson;
import com.odevdemo.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/lessons")
public class LessonsController {
    @Autowired
    LessonRepository lessonRepository;

    @GetMapping("{teacherNumber}")
        public List<Lesson> GetLessons(@PathVariable long teacherNumber) {
        List<Lesson> lessons = lessonRepository.findAll();
        if(teacherNumber==0)  {
            return  lessons;
        }
        List<Lesson> lessonsForSend = new ArrayList<Lesson>();
        for (var lesson: lessons) {
            if(lesson.getTeacherNumber() == teacherNumber) {
                lessonsForSend.add(lesson);
            }
        }
        return lessonsForSend;
    }
}
