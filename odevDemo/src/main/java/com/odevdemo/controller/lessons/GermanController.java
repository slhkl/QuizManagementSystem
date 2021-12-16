package com.odevdemo.controller.lessons;

import com.odevdemo.exception.ResourceNotFoundException;
import com.odevdemo.model.Lesson;
import com.odevdemo.model.lessons.English;
import com.odevdemo.model.lessons.German;
import com.odevdemo.repository.LessonRepository;
import com.odevdemo.repository.LessonsRepository.EnglishRepository;
import com.odevdemo.repository.LessonsRepository.GermanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@CrossOrigin("*")
@RestController
@RequestMapping("api/lessons/german")
public class GermanController {
    @Autowired
    LessonRepository lessonRepository;

    @Autowired
    GermanRepository germanRepository;

    @GetMapping()
    public List<German> GetQuestionsGerman() {
        return germanRepository.findAll();
    }

    @GetMapping("{id}")
    public German GetById(@PathVariable long id) {
        return germanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id + " yok GetById"));
    }

    @GetMapping("get/{index}")
    public German GetQuestion(@PathVariable int index) {
        return germanRepository.findAll().get(index);
    }

    @PostMapping()
    public German AddQuestionGerman(@RequestBody German german) {
        Lesson lesson = lessonRepository.getById((long) 4);
        lesson.setQuestionCount(lesson.getQuestionCount() + 1);
        return germanRepository.save(german);
    }

    @PutMapping("{id}")
    public ResponseEntity<German> updateQuestion(@PathVariable long id, @RequestBody German newQuestion) {
        German question = germanRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(id + " yok update"));
        question.setQuestion(newQuestion.getQuestion());
        question.setOptionA(newQuestion.getOptionA());
        question.setOptionB(newQuestion.getOptionB());
        question.setOptionC(newQuestion.getOptionC());
        question.setOptionD(newQuestion.getOptionD());
        question.setCorrectOption(newQuestion.getCorrectOption());
        germanRepository.save(question);
        return ResponseEntity.ok(question);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> DeleteQuestionGerman(@PathVariable long id) {
        Lesson lesson = lessonRepository.getById((long) 4);
        lesson.setQuestionCount(lesson.getQuestionCount() - 1);
        germanRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
