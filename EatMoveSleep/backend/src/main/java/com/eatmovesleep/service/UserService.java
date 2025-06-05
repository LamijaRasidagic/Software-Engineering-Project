package com.eatmovesleep.service;

import com.eatmovesleep.model.User;

import java.util.List;

public interface UserService {

    User createUser(User user);

    List<User> getAllUsers();

    User getUserById(Long id);

    void deleteUser(Long id);

    User updateUser(Long id, User updatedUser);

    User getUserByUserName(String username);
}
