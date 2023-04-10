package com.fyp.AntiEpidemicSystem.model;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.function.Function;

import org.springframework.stereotype.Service;

import lombok.Data;

@Service
@Data
public class UserDTOMapper implements Function<User, UserDTO> {

	@Override
	public UserDTO apply(User u) {
		return new UserDTO(u.getId(), u.getFirstname(), u.getLastname(), u.getUsername(), u.getEmail(),
				u.getEmergencyEmail(), u.getMobile(), u.getClassName(), u.getVaccinatedDose(), checkifSLtoday(u),
				u.isPositive(), u.getVaccinationRecord(), u.getRole(), u.getClassRole(), u.getGroups());
	}

	private boolean checkifSLtoday(User user) {
		if (user.getEvents() != null) {
			for (Event e : user.getEvents()) {
				if (e.getTitle().equalsIgnoreCase("Sick Leave")) {
					if (checkifTodayisInPeriod(e.getStart(), e.getEnd())) {
						return true;
					}
				}
			}
		}
		return false;
	}

	private boolean checkifTodayisInPeriod(Date start, Date end) {
		LocalDate today = LocalDate.now();
		LocalDate startDate = start.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		LocalDate endDate = end.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		if (today.isAfter(startDate) && today.isBefore(endDate) || today.isEqual(startDate) || today.isEqual(endDate)) {
			return true;
		}
		return false;
	}

}
