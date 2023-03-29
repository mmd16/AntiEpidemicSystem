package com.fyp.AntiEpidemicSystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fyp.AntiEpidemicSystem.model.Form;
import com.fyp.AntiEpidemicSystem.model.FormCode;

public interface FormRepository extends JpaRepository<Form, Integer> {
	Optional<Form> findByid(String id);

	Optional<List<Form>> findAllByFormCode(FormCode formcode);

	Optional<List<Form>> findAllBySubmittedByUsernameAndFormCode(String submittedByUsername, FormCode formcode);

	Optional<List<Form>> findAllBySubmittedTimeAndSubmittedByUsernameAndFormCode(String submittedTime,
			String submittedByUsername, FormCode formCode);
}
