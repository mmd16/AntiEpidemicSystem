package com.fyp.AntiEpidemicSystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.AntiEpidemicSystem.model.ClassRole;
import com.fyp.AntiEpidemicSystem.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByUsername(String username);
	
	Optional<List<User>> findAllByClassNameContaining(String className);
	
	Optional<List<User>> findAllByIsPositiveAndClassRole(boolean isPositive, ClassRole classRole);
}
