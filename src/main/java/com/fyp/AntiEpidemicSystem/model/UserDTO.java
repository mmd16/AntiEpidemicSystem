package com.fyp.AntiEpidemicSystem.model;

import java.util.Set;

public record UserDTO(Integer id, String firstname, String lastname, String username, String email,
		String emergencyEmail, String mobile, String className, Integer vaccinatedDose, boolean isSickLeave,
		boolean isPositive, String vaccinationRecord, Role role, ClassRole classRole, Set<Group> groups) {
}
