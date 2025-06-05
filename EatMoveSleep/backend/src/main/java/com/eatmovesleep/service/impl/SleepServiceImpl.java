package com.eatmovesleep.service.impl;

import com.eatmovesleep.model.Sleep;
import com.eatmovesleep.repository.SleepRepository;
import com.eatmovesleep.service.SleepService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SleepServiceImpl implements SleepService {


    private final SleepRepository SleepRepository;

    public SleepServiceImpl(SleepRepository SleepRepository) {
        this.SleepRepository = SleepRepository;
    }

    @Override
    public Sleep saveSleep(Sleep Sleep) {
        return SleepRepository.save(Sleep);
    }


    @Override
    public List<Sleep> getSleepsByUserId(Long userId) {
        return SleepRepository.findByUserId(userId);
    }

    @Override
    public Sleep getSleepById(Long id) {
        return SleepRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sleep not found with ID: " + id));
    }

    @Override
    public void deleteSleep(Long id) {
        if (!SleepRepository.existsById(id)) {
            throw new RuntimeException("Sleep not found with ID: " + id);
        }
        SleepRepository.deleteById(id);
    }

    @Override
    public Sleep updateSleep(Long id, Sleep updatedSleep) {
        Sleep existingSleep = SleepRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sleep not found with ID: " + id));

        existingSleep.setUser(updatedSleep.getUser());
        existingSleep.setSleepStart(updatedSleep.getSleepStart());
        existingSleep.setSleepEnd(updatedSleep.getSleepEnd());
        existingSleep.setQuality(updatedSleep.getQuality());
        existingSleep.setHours(updatedSleep.getHours());

        return SleepRepository.save(existingSleep);
    }

}
