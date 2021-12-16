package com.odevdemo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentDto {
    private long studentNumber;

    private String studentName;

    private String studentSurname;

    private long classId;
}
