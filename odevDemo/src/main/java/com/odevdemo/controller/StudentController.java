package com.odevdemo.controller;

import com.odevdemo.dto.StudentDto;
import com.odevdemo.exception.ResourceNotFoundException;
import com.odevdemo.model.Student;
import com.odevdemo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/student")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<StudentDto> getAllStudents() {
        List<StudentDto> studentsList = new ArrayList<StudentDto>();
        for (var student :studentRepository.findAll())
        {
            StudentDto studentDto = new StudentDto();
            studentDto.setStudentNumber(student.getStudentNumber());
            studentDto.setStudentName(student.getStudentName());
            studentDto.setStudentSurname(student.getStudentSurname());
            studentDto.setClassId(student.getClassId());
            studentsList.add(studentDto);
        }
        return studentsList;
    }

    @GetMapping("{id}")
    public ResponseEntity<StudentDto> getStudentById(@PathVariable long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id+" yok GetById"));
        StudentDto studentDto = new StudentDto();
        studentDto.setStudentNumber(student.getStudentNumber());
        studentDto.setStudentName(student.getStudentName());
        studentDto.setStudentSurname(student.getStudentSurname());
        studentDto.setClassId(student.getClassId());
        return ResponseEntity.ok(studentDto);
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        if (studentRepository.existsStudentByStudentNumber(student.getStudentNumber())) {
            return new Student(-1, "", "", "", -1);
        }
        return studentRepository.save(student);
    }

    @PutMapping("{id}")
    public  ResponseEntity<Student> updateStudent(@PathVariable long id, @RequestBody Student newStudent) {
        Student student = studentRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException(id + " yok update"));
        student.setStudentName(newStudent.getStudentName());
        student.setStudentSurname(newStudent.getStudentSurname());
        student.setClassId(newStudent.getClassId());

        studentRepository.save(student);

        return ResponseEntity.ok(student);
    }

    @DeleteMapping("{id}")
    public  ResponseEntity<HttpStatus> deleteStudent(@PathVariable long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException(id + " yok delete"));
        studentRepository.delete(student);
        return  new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
