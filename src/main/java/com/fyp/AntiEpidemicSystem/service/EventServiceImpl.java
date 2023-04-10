package com.fyp.AntiEpidemicSystem.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fyp.AntiEpidemicSystem.model.Event;
import com.fyp.AntiEpidemicSystem.model.User;
import com.fyp.AntiEpidemicSystem.repository.EventRepository;
import com.fyp.AntiEpidemicSystem.repository.GroupRepository;
import com.fyp.AntiEpidemicSystem.repository.UserRepository;
import com.fyp.AntiEpidemicSystem.response.FormResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
	private final UserRepository userRepository;

	private final EventRepository eventRepository;

	private Event createEvent(Date start, Date end, String title, boolean isEditable) {
		var event = Event.builder().start(start).end(end).title(title).isEditable(isEditable).IsActive(true)
				.users(new HashSet<>()).build();
		return event;
	}

	@Override
	public FormResponse addEventforAll(Date start, Date end, String title) {
		List<User> userList = userRepository.findAll();
		var event = createEvent(start, end, title, true);
		event.setUsers(new HashSet<>(userList));
		eventRepository.save(event);
		userList.forEach(s -> {
			s.addEvent(event);
		});
		userRepository.saveAll(userList);
		return FormResponse.builder().msg("Event is created").build();
	}

	@Override
	public FormResponse removeEventforAll(String id) {
		var event = eventRepository.findById(Integer.parseInt(id)).orElseThrow();
		var userList = userRepository.findAll();
		event.setIsActive(false);
		event.clearUsers();
		eventRepository.save(event);
		userList.forEach(s -> {
			s.removeEvent(event);
		});
		userRepository.saveAll(userList);
		return FormResponse.builder().msg("Event is removed").build();
	}

	@Override
	public FormResponse updateEventforAll(Date start, Date end, String title, String id) {
		var oldEvent = eventRepository.findById(Integer.parseInt(id)).orElseThrow();
		var newEvent = oldEvent;
		newEvent.setStart(start);
		newEvent.setEnd(end);
		newEvent.setTitle(title);
		eventRepository.save(newEvent);
		List<User> userList = userRepository.findAll();
		;
		userList.forEach(s -> {
			s.removeEvent(oldEvent);
			s.addEvent(newEvent);
		});
		userRepository.saveAll(userList);
		return FormResponse.builder().msg("Event is updated").build();
	}

	@Override
	public List<Event> getUserAllEvent(String username) {
		var user = userRepository.findByUsername(username).orElseThrow();
		Optional<List<Event>> eventList = Optional.of(new ArrayList<>(user.getEvents()));
		return eventList.orElseThrow();
	}

	@Override
	public FormResponse addEvent(Date start, Date end, String title, String username) {
		var user = userRepository.findByUsername(username).orElseThrow();
		var event = createEvent(start, end, title, false);
		event.addUser(user);
		eventRepository.save(event);
		user.addEvent(event);
		userRepository.save(user);
		return FormResponse.builder().msg("Event is created").build();
	}

	@Override
	public boolean checkIsEditable(String id) {
		var event = eventRepository.findById(Integer.parseInt(id)).orElseThrow();
		return event.isEditable();
	}
}
