package com.odevdemo.controller.lessons;

import com.odevdemo.exception.ResourceNotFoundException;
import com.odevdemo.model.Lesson;
import com.odevdemo.model.lessons.English;
import com.odevdemo.model.lessons.German;
import com.odevdemo.model.lessons.Math;
import com.odevdemo.model.lessons.Science;
import com.odevdemo.repository.LessonRepository;
import com.odevdemo.repository.LessonsRepository.MathRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/lessons/math")
public class MathController {
    @Autowired
    MathRepository mathRepository;

    @Autowired
    LessonRepository lessonRepository;

    @GetMapping()
    public List<Math> GetQuestionsMath() {
        return mathRepository.findAll();
    }

    @GetMapping("{id}")
    public Math GetById(@PathVariable long id) {
        return mathRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id+" yok GetById"));
    }

    @GetMapping("get/{index}")
    public Math GetQuestion(@PathVariable int index) {
        return mathRepository.findAll().get(index);
    }

    @PostMapping()
    public Math AddQuestionMath(@RequestBody Math math) {
        Lesson lesson = lessonRepository.getById((long)2);
        lesson.setQuestionCount(lesson.getQuestionCount()+1);
        return mathRepository.save(math);
    }

    @PutMapping("{id}")
    public  ResponseEntity<Math> updateQuestion(@PathVariable long id, @RequestBody Math newQuestion) {
        Math question = mathRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException(id + " yok update"));
        question.setQuestion(newQuestion.getQuestion());
        question.setOptionA(newQuestion.getOptionA());
        question.setOptionB(newQuestion.getOptionB());
        question.setOptionC(newQuestion.getOptionC());
        question.setOptionD(newQuestion.getOptionD());
        question.setCorrectOption(newQuestion.getCorrectOption());
        mathRepository.save(question);
        return ResponseEntity.ok(question);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> DeleteQuestionMath(@PathVariable long id) {
        Lesson lesson = lessonRepository.getById((long)2);
        lesson.setQuestionCount(lesson.getQuestionCount()-1);
        mathRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
