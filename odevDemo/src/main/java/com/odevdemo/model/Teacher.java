package com.odevdemo.model;

import ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Teacher {
    @Id
    private long teacherNumber;

    private String teacherName;

    private String teacherSurname;

    private String teacherPassword;
}
