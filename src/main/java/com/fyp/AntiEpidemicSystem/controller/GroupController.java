package com.fyp.AntiEpidemicSystem.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fyp.AntiEpidemicSystem.model.GroupDTO;
import com.fyp.AntiEpidemicSystem.model.UserDTO;
import com.fyp.AntiEpidemicSystem.response.GroupResponse;
import com.fyp.AntiEpidemicSystem.service.GroupService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/group")
@RequiredArgsConstructor
public class GroupController {

	private final GroupService service;

	@GetMapping("/getLists")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<List<GroupDTO>> getLists() throws IOException {
		return ResponseEntity.ok(service.getGroupLists());
	}

	@GetMapping("/getJoinedLists")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<List<UserDTO>> getJoinedLists(@RequestParam("name") String name) throws IOException {
		return ResponseEntity.ok(service.getUsersJoined(name));
	}

	@GetMapping("/getNotJoinedLists")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<List<UserDTO>> getNotJoinedLists(@RequestParam("name") String name) throws IOException {
		return ResponseEntity.ok(service.getUsersNotJoined(name));
	}

	@PostMapping("/createGroup")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<GroupResponse> createGroup(@RequestParam("name") String name) throws IOException {
		return ResponseEntity.ok(service.createGroup(name));
	}

	@PostMapping("/removeGroup")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<GroupResponse> removeGroup(@RequestParam("name") String name) throws IOException {
		return ResponseEntity.ok(service.removeGroup(name));
	}

	@PostMapping("/addToGroup")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<GroupResponse> savePocl(@RequestBody List<String> users, @RequestParam("name") String name)
			throws IOException {
		return ResponseEntity.ok(service.addToGroup(users, name));
	}

	@PostMapping("/removeFromGroup")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<GroupResponse> removeFromGroup(@RequestBody List<String> users,
			@RequestParam("name") String name) throws IOException {
		return ResponseEntity.ok(service.removeFromGroup(users, name));
	}

	@GetMapping("/checkIfExist")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<Boolean> checkIfExist(@RequestParam("name") String name) {
		return ResponseEntity.ok(service.checkIfExist(name));
	}
}
