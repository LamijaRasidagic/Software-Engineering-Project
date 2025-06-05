package com.eatmovesleep.model;
import jakarta.persistence.*;


import java.math.BigDecimal;


@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "age")
    private Integer age;

    @Column(name = "weight")
    private BigDecimal weight;

    @Column(name = "fitnesGoal")
    private String fitnesGoal;

    public String getFitnesGoal() {
        return fitnesGoal;
    }

    public void setFitnesGoal(String fitnesGoal) {
        this.fitnesGoal = fitnesGoal;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public void setAge(Integer age) {
        this.age = age;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }





    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }



    public Integer getAge() {
        return age;
    }

    public BigDecimal getWeight() {
        return weight;
    }





}
