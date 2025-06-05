package com.eatmovesleep.service;

import com.eatmovesleep.model.Sleep;

import java.util.List;

public interface SleepService {

    Sleep saveSleep(Sleep Sleep);

    Sleep getSleepById(Long id);

    void deleteSleep(Long id);

    Sleep updateSleep(Long id, Sleep updatedSleep);


    List<Sleep> getSleepsByUserId(Long userId);
}
