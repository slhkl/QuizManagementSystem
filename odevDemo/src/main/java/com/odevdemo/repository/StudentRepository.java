package com.odevdemo.repository;

import com.odevdemo.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
    boolean existsStudentByStudentNumber(long studentNumber);
}
