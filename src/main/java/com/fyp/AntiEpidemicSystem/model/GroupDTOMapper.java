package com.fyp.AntiEpidemicSystem.model;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.Data;

@Service
@Data
public class GroupDTOMapper implements Function<Group, GroupDTO> {

	@Override
	public GroupDTO apply(Group t) {
		return new GroupDTO(t.getId(), t.getName(), t.getMemberNumber(), t.isActive(), t.getUsers(),
				getInfectionNum(t.getUsers()), getAbsentNum(t.getUsers()));
	}

	private int getInfectionNum(Set<User> users) {
		var userList = new ArrayList<>(users);
		int rslt = userList.stream().filter(u -> u.isPositive()).collect(Collectors.toList()).size();
		return rslt;
	}

	private int getAbsentNum(Set<User> users) {
		int count = 0;
		var userList = new ArrayList<>(users);
		for (User u : userList) {
			count = checkifSLtoday(u) ? count + 1 : count;
		}
		return count;
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
