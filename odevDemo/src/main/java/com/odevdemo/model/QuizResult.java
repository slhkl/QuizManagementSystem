package com.odevdemo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class QuizResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long quizResultId;

    private long quizId;

    private String lessonName;

    private long studentNumber;

    private long teacherNumber;

    private long questionCount;

    private long correctCount;

    private long wrongCount;

}
