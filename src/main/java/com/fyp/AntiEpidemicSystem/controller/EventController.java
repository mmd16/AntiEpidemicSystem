package com.fyp.AntiEpidemicSystem.controller;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fyp.AntiEpidemicSystem.model.Event;
import com.fyp.AntiEpidemicSystem.response.FormResponse;
import com.fyp.AntiEpidemicSystem.service.EventService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/event")
@RequiredArgsConstructor
public class EventController {

	private final EventService service;

	@PostMapping("/addEvent")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<FormResponse> addEvent(@RequestParam("start") Date start, @RequestParam("end") Date end,
			@RequestParam("title") String title) throws IOException {
		return ResponseEntity.ok(service.addEventforAll(start, end, title));
	}

	@PostMapping("/removeEvent")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<FormResponse> removeEvent(@RequestParam("id") String id) throws IOException {
		return ResponseEntity.ok(service.removeEventforAll(id));
	}

	@PostMapping("/updateEvent")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<FormResponse> updateEvent(@RequestParam("start") Date start, @RequestParam("end") Date end,
			@RequestParam("title") String title, @RequestParam("id") String id) throws IOException {
		return ResponseEntity.ok(service.updateEventforAll(start, end, title, id));
	}

	@GetMapping("/getAllEvent")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Event> getAllEvent(@RequestParam("username") String username) throws IOException {
		return service.getUserAllEvent(username);
	}

	@GetMapping("/checkIsEditable")
	@CrossOrigin(origins = "http://localhost:3000")
	public boolean checkIsEditable(@RequestParam("id") String id) throws IOException {
		return service.checkIsEditable(id);
	}

}
