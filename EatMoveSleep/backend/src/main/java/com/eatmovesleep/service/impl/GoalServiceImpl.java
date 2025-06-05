package com.eatmovesleep.service.impl;

import com.eatmovesleep.model.Goal;
import com.eatmovesleep.repository.GoalRepository;
import com.eatmovesleep.service.GoalService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalServiceImpl implements GoalService {

    private final GoalRepository goalRepository;

    public GoalServiceImpl(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }

    @Override
    public Goal createGoal(Goal goal) {
        return goalRepository.save(goal);
    }

    @Override
    public Goal updateGoal(Long goalId, Goal updatedGoal) {
        Goal existing = goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        existing.setType(updatedGoal.getType());
        existing.setTarget(updatedGoal.getTarget());
        existing.setProgress(updatedGoal.getProgress());
        existing.setStatus(updatedGoal.getStatus());

        return goalRepository.save(existing);
    }

    @Override
    public void deleteGoal(Long goalId) {
        goalRepository.deleteById(goalId);
    }

    @Override
    public List<Goal> getGoalsByUserId(Long userId) {
        return goalRepository.findByUserId(userId);
    }
}
