package com.eatmovesleep.service.impl;

import com.eatmovesleep.model.Workout;
import com.eatmovesleep.repository.WorkoutRepository;
import com.eatmovesleep.service.WorkoutService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutServiceImpl implements WorkoutService {


    private final WorkoutRepository WorkoutRepository;

    public WorkoutServiceImpl(WorkoutRepository WorkoutRepository) {
        this.WorkoutRepository = WorkoutRepository;
    }

    @Override
    public Workout saveWorkout(Workout Workout) {
        return WorkoutRepository.save(Workout);
    }

    @Override
    public List<Workout> getWorkoutsByUserId(Long userId) {
        return WorkoutRepository.findByUserId(userId);
    }

    @Override
    public Workout getWorkoutById(Long id) {
        return WorkoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout not found with ID: " + id));
    }

    @Override
    public void deleteWorkout(Long id) {
        if (!WorkoutRepository.existsById(id)) {
            throw new RuntimeException("Workout not found with ID: " + id);
        }
        WorkoutRepository.deleteById(id);
    }

    @Override
    public Workout updateWorkout(Long id, Workout updatedWorkout) {
        Workout existingWorkout = WorkoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout not found with ID: " + id));

        existingWorkout.setUser(updatedWorkout.getUser());
        existingWorkout.setCaloriesBurned(updatedWorkout.getCaloriesBurned());
        existingWorkout.setWorkoutTime(updatedWorkout.getWorkoutTime());
        existingWorkout.setType(updatedWorkout.getType());
        existingWorkout.setCalories(updatedWorkout.getCalories());
        existingWorkout.setWorkoutId(updatedWorkout.getWorkoutId());
        existingWorkout.setWorkoutId(updatedWorkout.getWorkoutId());
        return WorkoutRepository.save(existingWorkout);
    }
}
