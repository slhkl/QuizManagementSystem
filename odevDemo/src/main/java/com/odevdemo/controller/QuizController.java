package com.odevdemo.controller;

import com.odevdemo.exception.ResourceNotFoundException;
import com.odevdemo.model.Lesson;
import com.odevdemo.model.Quiz;
import com.odevdemo.model.Student;
import com.odevdemo.model.Teacher;
import com.odevdemo.repository.LessonRepository;
import com.odevdemo.repository.QuizRepository;
import com.odevdemo.repository.StudentRepository;
import com.odevdemo.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/quiz")
public class QuizController {
    @Autowired
    QuizRepository quizRepository;

    @Autowired
    LessonRepository lessonRepository;

    @Autowired
    TeacherRepository teacherRepository;

    @Autowired
    StudentRepository studentRepository;

    @GetMapping("{teacherNumber}")
    public List<Quiz> GetById(@PathVariable long teacherNumber) throws ParseException {
        List<Quiz> quizes = quizRepository.findAll();
        if(teacherNumber==0)  {
            return  quizes;
        }
        List<Lesson> lessons = lessonRepository.findAll();
        List<Lesson> lessonForQuiz = new ArrayList<Lesson>();
        for (var lesson:lessons) {
            if(lesson.getTeacherNumber() == teacherNumber) {
                lessonForQuiz.add(lesson);
            }
        }
        List<Quiz> quizForSend = new ArrayList<Quiz>();
        for (var quiz: quizes) {
            for (var lesson:lessonForQuiz) {
                if(quiz.getLessonName().equals(lesson.getLessonName())) {
                    quizForSend.add(quiz);
                }
            }
        }
        return quizForSend;
    }

    @GetMapping("student/{studentNumber}")
    public  List<Quiz> GetQuizForStudent(@PathVariable long studentNumber) {
        Student student = studentRepository.findById(studentNumber)
                .orElseThrow(() -> new ResourceNotFoundException(" yok GetById"));
        List<Lesson> lessons = lessonRepository.findAll();

        List<Lesson> lessonList = new ArrayList<Lesson>();
        for (var lesson: lessons) {
            if(lesson.getClassId() == student.getClassId()) {
                lessonList.add(lesson);
            }
        }
        List<Quiz> quizList = quizRepository.findAll();
        List<Quiz> quizForSend = new ArrayList<Quiz>();
        for (var lesson:lessonList) {
            for (var quiz: quizList) {
                if(quiz.getLessonName().equals(lesson.getLessonName())) {
                    quizForSend.add(quiz);
                }
            }
        }
        return quizForSend;
    }

    @GetMapping("get/{id}")
    public Quiz GetQuizByID(@PathVariable long id) {
        return quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id+" yok GetById"));
    }

    @PostMapping
    public Quiz AddQuiz(@RequestBody Quiz quiz) {
        Lesson lesson = lessonRepository.findById(quiz.getLessonId())
                .orElseThrow(() -> new ResourceNotFoundException("Addquiz eror"));
        if (lesson.getQuestionCount() < quiz.getQuestionCount()) {
            return new Quiz(-1, 2, "", 3, 1, 2, null);
        }
        quiz.setLessonName(lesson.getLessonName());

        return quizRepository.save(quiz);
    }

    @PutMapping("{id}")
    public Quiz editQuiz(@RequestBody Quiz newQuiz, @PathVariable long id) {
        Quiz quiz  = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Addquiz eror"));

        Lesson lesson = lessonRepository.findById(quiz.getLessonId())
                .orElseThrow(() -> new ResourceNotFoundException("Addquiz eror"));
        if (lesson.getQuestionCount() < newQuiz.getQuestionCount()) {
            return new Quiz(-1, 2, "", 3, 1, 2, null);
        }
        quiz.setQuestionCount(newQuiz.getQuestionCount());
        quiz.setQuizTime(newQuiz.getQuizTime());
        quiz.setStartDate(newQuiz.getStartDate());

        return quizRepository.save(quiz);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> DeleteQuiz(@PathVariable long id) {
        quizRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
