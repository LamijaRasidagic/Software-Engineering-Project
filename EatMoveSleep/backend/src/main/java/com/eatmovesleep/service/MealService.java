package com.eatmovesleep.service;

import com.eatmovesleep.model.Meal;

import java.util.List;

public interface MealService {

    Meal saveMeal(Meal meal);

    List<Meal> getMealsByUserId(Long userId);

    Meal getMealById(Long id);

    void deleteMeal(Long id);

    Meal updateMeal(Long id, Meal updatedMeal);
}
