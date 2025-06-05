package com.eatmovesleep.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "workouts")
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false, length = 100)
    private String type;

    @Column(name = "workout_id", nullable = false)
    private int workoutId;

    @Column(name = "calories", nullable = false)
    private int calories;

    @Column(name = "calories_burned", nullable = false)
    private Integer caloriesBurned;

    @Column(name = "date_logged", nullable = false)
    private LocalDateTime dateLogged;

    public int getWorkoutId() {
        return workoutId;
    }

    public void setWorkoutId(int workoutId) {
        this.workoutId = workoutId;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setType(String type) {
        this.type = type;
    }



    public void setCaloriesBurned(Integer caloriesBurned) {
        this.caloriesBurned = caloriesBurned;
    }

    public void setWorkoutTime(LocalDateTime dateLogged) {
        this.dateLogged = dateLogged;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getType() {
        return type;
    }


    public Integer getCaloriesBurned() {
        return caloriesBurned;
    }

    public LocalDateTime getWorkoutTime() {
        return dateLogged;
    }
}
