package com.odevdemo.controller;

import com.odevdemo.exception.ResourceNotFoundException;
import com.odevdemo.model.Lesson;
import com.odevdemo.model.Quiz;
import com.odevdemo.model.QuizResult;
import com.odevdemo.model.Result;
import com.odevdemo.repository.LessonRepository;
import com.odevdemo.repository.QuizRepository;
import com.odevdemo.repository.QuizResultRepository;
import com.odevdemo.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/quizResult")
public class QuizResultController {

    @Autowired
    QuizResultRepository quizResultRepository;

    @Autowired
    ResultRepository resultRepository;

    @Autowired
    QuizRepository quizRepository;

    @Autowired
    LessonRepository lessonRepository;

    @GetMapping("{quizId}/{studentNumber}")
    public QuizResult GetResult(@PathVariable long studentNumber, @PathVariable long quizId) {
        List<QuizResult> newResult = quizResultRepository.findAll();

        for (var res:newResult) {
            if(res.getQuizId() == quizId && res.getStudentNumber() == studentNumber) {
                return res;
            }
        }
        return new QuizResult(0,0,"",0,0,0,0,0);
    }

    @GetMapping("{studentNumber}")
    public List<QuizResult> GetResultForStudent(@PathVariable long studentNumber) {
        List<QuizResult> newResult = quizResultRepository.findAll();
        List<QuizResult> sendResult = new ArrayList<QuizResult>();
        for (var res:newResult) {
            if(res.getStudentNumber() == studentNumber) {
                sendResult.add(res);
            }
        }
        return sendResult;
    }

    @GetMapping("/teacher/{teaherNumber}")
    public List<QuizResult> GetResultForTeacher(@PathVariable long teaherNumber) {
        List<QuizResult> newResult = quizResultRepository.findAll();
        if(teaherNumber == 0) {
            return newResult;
        }
        List<QuizResult> sendResult = new ArrayList<QuizResult>();

        for (var res:newResult) {
            res.getQuizId();
            if(res.getTeacherNumber() == teaherNumber) {
                sendResult.add(res);
            }
        }
        return sendResult;
    }

    @PostMapping("{quizId}/{studentNumber}")
    public QuizResult AddResult(@PathVariable long quizId, @PathVariable long studentNumber) {
        List<Result> liste = resultRepository.findAll();
        List<Result> resultListForStudent = new ArrayList<Result>();
        for (var resultObject:liste) {
            if(resultObject.getQuizId() == quizId && resultObject.getStudentNumber() == studentNumber) {
                resultListForStudent.add(resultObject);
            }
        }
        int correctCount=0;
        int wrongCount=0;
        QuizResult quizResult = new QuizResult();
        for (var res:resultListForStudent ) {
            if(res.getChosenOption().equals(res.getCorrectOption())) {
                correctCount++;
            } else {
                wrongCount++;
            }
        }

        List<Lesson> lessonsList = lessonRepository.findAll();

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException(" yok GetById"));

        for (var les:lessonsList) {
            if(les.getLessonName() == quiz.getLessonName()) {
                quizResult.setTeacherNumber(les.getTeacherNumber());
            }
        }
        quizResult.setQuizId(quizId);
        quizResult.setStudentNumber(studentNumber);
        quizResult.setQuestionCount(resultListForStudent.size());
        quizResult.setCorrectCount(correctCount);
        quizResult.setWrongCount(wrongCount);
        quizResult.setLessonName(quiz.getLessonName());
        return quizResultRepository.save(quizResult);
    }
}