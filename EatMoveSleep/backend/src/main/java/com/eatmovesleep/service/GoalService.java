package com.eatmovesleep.service;

import com.eatmovesleep.model.Goal;

import java.util.List;

public interface GoalService {
    Goal createGoal(Goal goal);
    Goal updateGoal(Long goalId, Goal goal);
    void deleteGoal(Long goalId);
    List<Goal> getGoalsByUserId(Long userId);
}
