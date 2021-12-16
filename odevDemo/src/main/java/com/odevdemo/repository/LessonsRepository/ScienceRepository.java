package com.odevdemo.repository.LessonsRepository;

import com.odevdemo.model.lessons.Science;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScienceRepository extends JpaRepository<Science, Long> {
}
