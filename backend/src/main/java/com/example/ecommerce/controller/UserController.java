package com.example.ecommerce.controller;

import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> list() {
        return userRepository.findAll();
    }

    @PostMapping("/signup")
    public User signup(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        String email = body.get("email");
        String password = body.get("password");
        User user = new User(email, name);
        user.setPassword(new BCryptPasswordEncoder().encode(password));
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        if (!new BCryptPasswordEncoder().matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return user;
    }
}


