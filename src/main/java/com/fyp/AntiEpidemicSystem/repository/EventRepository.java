package com.fyp.AntiEpidemicSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.AntiEpidemicSystem.model.Event;

public interface EventRepository extends JpaRepository<Event, Integer> {

}
