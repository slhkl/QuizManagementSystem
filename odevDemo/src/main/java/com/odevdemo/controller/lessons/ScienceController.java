package com.odevdemo.controller.lessons;

import com.odevdemo.exception.ResourceNotFoundException;
import com.odevdemo.model.Lesson;
import com.odevdemo.model.lessons.English;
import com.odevdemo.model.lessons.German;
import com.odevdemo.model.lessons.Science;
import com.odevdemo.repository.LessonRepository;
import com.odevdemo.repository.LessonsRepository.ScienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/lessons/science")
public class ScienceController {
    @Autowired
    LessonRepository lessonRepository;

    @Autowired
    ScienceRepository scienceRepository;

    @GetMapping()
    public List<Science> GetQuestionsScience() {
        return scienceRepository.findAll();
    }

    @GetMapping("{id}")
    public Science GetById(@PathVariable long id) {
        return scienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id+" yok GetById"));
    }

    @GetMapping("get/{index}")
    public Science GetQuestion(@PathVariable int index) {
        return scienceRepository.findAll().get(index);
    }

    @PostMapping()
    public Science AddQuestionScience(@RequestBody Science science) {
        Lesson lesson = lessonRepository.getById((long)3);
        lesson.setQuestionCount(lesson.getQuestionCount()+1);
        return scienceRepository.save(science);
    }

    @PutMapping("{id}")
    public  ResponseEntity<Science> updateQuestion(@PathVariable long id, @RequestBody Science newQuestion) {
        Science question = scienceRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException(id + " yok update"));
        question.setQuestion(newQuestion.getQuestion());
        question.setOptionA(newQuestion.getOptionA());
        question.setOptionB(newQuestion.getOptionB());
        question.setOptionC(newQuestion.getOptionC());
        question.setOptionD(newQuestion.getOptionD());
        question.setCorrectOption(newQuestion.getCorrectOption());
        scienceRepository.save(question);
        return ResponseEntity.ok(question);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> DeleteQuestionScience(@PathVariable long id) {
        Lesson lesson = lessonRepository.getById((long)3);
        lesson.setQuestionCount(lesson.getQuestionCount()-1);
        scienceRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
