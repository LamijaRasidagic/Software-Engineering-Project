package com.eatmovesleep.repository;
import com.eatmovesleep.model.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface MealRepository extends JpaRepository<Meal, Long>{
    List<Meal> findByUserId(Long userId);

}
