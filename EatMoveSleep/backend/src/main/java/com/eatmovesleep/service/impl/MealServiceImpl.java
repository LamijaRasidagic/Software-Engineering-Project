package com.eatmovesleep.service.impl;

import com.eatmovesleep.model.Meal;
import com.eatmovesleep.repository.MealRepository;
import com.eatmovesleep.service.MealService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MealServiceImpl implements MealService {

    private final MealRepository mealRepository;

    public MealServiceImpl(MealRepository mealRepository) {
        this.mealRepository = mealRepository;
    }

    @Override
    public Meal saveMeal(Meal meal) {
        return mealRepository.save(meal);
    }

    @Override
    public List<Meal> getMealsByUserId(Long userId) {
        return mealRepository.findByUserId(userId);
    }

    @Override
    public Meal getMealById(Long id) {
        return mealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meal not found with ID: " + id));
    }

    @Override
    public void deleteMeal(Long id) {
        if (!mealRepository.existsById(id)) {
            throw new RuntimeException("Meal not found with ID: " + id);
        }
        mealRepository.deleteById(id);
    }

    @Override
    public Meal updateMeal(Long id, Meal updatedMeal) {
        Meal existingMeal = mealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meal not found with ID: " + id));

        existingMeal.setName(updatedMeal.getName());
        existingMeal.setCalories(updatedMeal.getCalories());
        existingMeal.setMealTime(updatedMeal.getMealTime());

        return mealRepository.save(existingMeal);
    }
}
