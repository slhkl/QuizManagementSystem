package com.odevdemo.controller.lessons;


import com.odevdemo.exception.ResourceNotFoundException;
import com.odevdemo.model.Lesson;
import com.odevdemo.model.lessons.English;
import com.odevdemo.model.lessons.German;
import com.odevdemo.repository.LessonRepository;
import com.odevdemo.repository.LessonsRepository.EnglishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/lessons/english")
public class EnglishController {
    @Autowired
    LessonRepository lessonRepository;

    @Autowired
    EnglishRepository englishRepository;

    @GetMapping()
    public List<English> GetQuestionsEnglish() {
        return englishRepository.findAll();
    }

    @GetMapping("{id}")
    public English GetById(@PathVariable long id) {
        return englishRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id+" yok GetById"));
    }
    @GetMapping("get/{index}")
    public English GetQuestion(@PathVariable int index) {
        return englishRepository.findAll().get(index);
    }

    @PostMapping()
    public English AddQuestionEnglish(@RequestBody English english) {
        Lesson lesson = lessonRepository.getById((long)1);
        lesson.setQuestionCount(lesson.getQuestionCount()+1);
        return englishRepository.save(english);
    }

    @PutMapping("{id}")
    public  ResponseEntity<English> updateQuestion(@PathVariable long id, @RequestBody English newQuestion) {
        English question = englishRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException(id + " yok update"));
        question.setQuestion(newQuestion.getQuestion());
        question.setOptionA(newQuestion.getOptionA());
        question.setOptionB(newQuestion.getOptionB());
        question.setOptionC(newQuestion.getOptionC());
        question.setOptionD(newQuestion.getOptionD());
        question.setCorrectOption(newQuestion.getCorrectOption());
        englishRepository.save(question);
        return ResponseEntity.ok(question);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> DeleteQuestionEnglish(@PathVariable long id) {
        Lesson lesson = lessonRepository.getById((long)1);
        lesson.setQuestionCount(lesson.getQuestionCount()-1);
        englishRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
