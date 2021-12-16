package com.odevdemo.repository.LessonsRepository;

import com.odevdemo.model.lessons.Math;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MathRepository extends JpaRepository<Math, Long> {
}
