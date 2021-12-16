package com.odevdemo.controller;

import com.odevdemo.dto.StudentDto;
import com.odevdemo.dto.TeacherDto;
import com.odevdemo.exception.ResourceNotFoundException;
import com.odevdemo.model.Student;
import com.odevdemo.model.Teacher;
import com.odevdemo.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/teacher")
public class TeacherController {

    @Autowired
    private TeacherRepository teacherRepository;

    @GetMapping
    public List<TeacherDto> getAllTeachers() {
        List<TeacherDto> teachersList = new ArrayList<TeacherDto>();
        for (var teacher :teacherRepository.findAll())
        {
            TeacherDto teacherDto = new TeacherDto();
            teacherDto.setTeacherName(teacher.getTeacherName());
            teacherDto.setTeacherSurname(teacher.getTeacherSurname());
            teacherDto.setTeacherNumber(teacher.getTeacherNumber());
            teachersList.add(teacherDto);
        }
        return teachersList;
    }

    @GetMapping("{id}")
    public ResponseEntity<TeacherDto> getTeacherById(@PathVariable long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id+" yok GetById"));
        TeacherDto teacherDto = new TeacherDto();
        teacherDto.setTeacherNumber(teacher.getTeacherNumber());
        teacherDto.setTeacherName(teacher.getTeacherName());
        teacherDto.setTeacherSurname(teacher.getTeacherSurname());
        return ResponseEntity.ok(teacherDto);
    }


    @PostMapping
    public Teacher createTeacher(@RequestBody Teacher teacher) {
        if (teacherRepository.existsTeacherByTeacherNumber(teacher.getTeacherNumber())) {
            return new Teacher(-1, "", "","");
        }
        return teacherRepository.save(teacher);
    }

    @PutMapping("{id}")
    public  ResponseEntity<Teacher> updateTeacher(@PathVariable long id, @RequestBody Teacher newTeacher) {
        Teacher teacher = teacherRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException(id + " yok update"));
        teacher.setTeacherName(newTeacher.getTeacherName());
        teacher.setTeacherSurname(newTeacher.getTeacherSurname());

        teacherRepository.save(teacher);

        return ResponseEntity.ok(teacher);
    }

    @DeleteMapping("{id}")
    public  ResponseEntity<HttpStatus> deleteTeacher(@PathVariable long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException(id + " yok delete"));
        teacherRepository.delete(teacher);
        return  new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
