package com.eatmovesleep.service;

import com.eatmovesleep.model.Workout;

import java.util.List;

public interface WorkoutService {

    Workout saveWorkout(Workout Workout);

    List<Workout> getWorkoutsByUserId(Long userId);

    Workout getWorkoutById(Long id);

    void deleteWorkout(Long id);

    Workout updateWorkout(Long id, Workout updatedWorkout);
}
