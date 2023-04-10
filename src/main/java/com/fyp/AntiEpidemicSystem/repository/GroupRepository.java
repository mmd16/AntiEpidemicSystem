package com.fyp.AntiEpidemicSystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.AntiEpidemicSystem.model.Group;

public interface GroupRepository extends JpaRepository<Group, Integer> {

	Optional<Group> findByName(String name);

	Optional<List<Group>> findAllByIsActive(boolean isActive);
}
