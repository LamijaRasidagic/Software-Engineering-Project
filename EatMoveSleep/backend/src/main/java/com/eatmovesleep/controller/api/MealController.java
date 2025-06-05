package com.eatmovesleep.controller.api;


import com.eatmovesleep.model.Meal;
import com.eatmovesleep.service.MealService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meals")
public class MealController {

    @Autowired
    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    // Create a new meal
    @PostMapping
    public ResponseEntity<Meal> createMeal(@RequestBody Meal meal) {
        Meal savedMeal = mealService.saveMeal(meal);
        return new ResponseEntity<>(savedMeal, HttpStatus.CREATED);
    }

    // Get all meals for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Meal>> getMealsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(mealService.getMealsByUserId(userId));
    }

    // Get a single meal by ID
    @GetMapping("/{id}")
    public ResponseEntity<Meal> getMealById(@PathVariable Long id) {
        return ResponseEntity.ok(mealService.getMealById(id));
    }

    // Update an existing meal
    @PutMapping("/{id}")
    public ResponseEntity<Meal> updateMeal(@PathVariable Long id, @RequestBody Meal updatedMeal) {
        return ResponseEntity.ok(mealService.updateMeal(id, updatedMeal));
    }

    // Delete a meal by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Long id) {
        mealService.deleteMeal(id);
        return ResponseEntity.noContent().build();
    }
}
