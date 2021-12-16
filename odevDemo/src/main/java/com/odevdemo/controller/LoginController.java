package com.odevdemo.controller;

import com.odevdemo.dto.StudentDto;
import com.odevdemo.exception.ResourceNotFoundException;
import com.odevdemo.model.Login;
import com.odevdemo.model.Student;
import com.odevdemo.model.Teacher;
import com.odevdemo.repository.StudentRepository;
import com.odevdemo.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("api/login")
public class LoginController {
    @Autowired
    StudentRepository studentRepository;

    @Autowired
    TeacherRepository teacherRepository;

    @PostMapping()
    public String isLogin(@RequestBody Login login) {
        String session = "";
        if(login.getType().equals("student")) {
            Student student = studentRepository.findById(login.getNumber())
                    .orElseThrow(() -> new ResourceNotFoundException(login.getNumber()+" yok Login"));
            if(login.getPassword().equals(student.getStudentPassword())) {
                session = student.getStudentName() + "." + student.getStudentNumber() + ".student";
            }
        } else if (login.getType().equals("teacher")){
            Teacher teacher = teacherRepository.findById(login.getNumber())
                    .orElseThrow(() -> new ResourceNotFoundException(login.getNumber()+" yok Login"));
            if(login.getPassword().equals(teacher.getTeacherPassword())) {
                session = teacher.getTeacherName() + "." + teacher.getTeacherNumber()+ ".teacher";
            }
        }
        return session;
    }
}
