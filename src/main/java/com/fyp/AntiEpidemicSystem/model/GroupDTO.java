package com.fyp.AntiEpidemicSystem.model;

import java.util.Set;

public record GroupDTO(Integer id, String name, int memberNumber, boolean isActive, Set<User> users,
		int infectionNumber, int absentNumber) {

}
