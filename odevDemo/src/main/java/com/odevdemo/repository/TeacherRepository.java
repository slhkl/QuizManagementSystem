package com.odevdemo.repository;

import com.odevdemo.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    boolean existsTeacherByTeacherNumber(long teacherNumber);
}
