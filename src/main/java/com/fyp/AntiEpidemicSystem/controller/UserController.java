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
import org.springframework.web.multipart.MultipartFile;

import com.fyp.AntiEpidemicSystem.model.UserDTO;
import com.fyp.AntiEpidemicSystem.request.RegisterRequest;
import com.fyp.AntiEpidemicSystem.response.FormResponse;
import com.fyp.AntiEpidemicSystem.response.InfectionResponse;
import com.fyp.AntiEpidemicSystem.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

	private final UserService service;

	@GetMapping("/getInfectionNum")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<InfectionResponse> getInfectionNum() throws IOException {
		return ResponseEntity.ok(service.getPositiveNumber());
	}

	@GetMapping("/getAbsNum")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<Integer> getAbsNum() throws IOException {
		return ResponseEntity.ok(service.getAbsNumber());
	}

	@PostMapping("/changeUserProfile")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<FormResponse> changeUserProfile(@RequestParam("multipartFile") MultipartFile multipartFile,
			@RequestParam("email") String email, @RequestParam("emergencyEmail") String emergencyEmail,
			@RequestParam("mobile") String mobile, @RequestParam("vaccinatedDose") int vaccinatedDose,
			@RequestParam("username") String username) throws IOException {
		return ResponseEntity
				.ok(service.changeUserProfile(multipartFile, email, emergencyEmail, mobile, vaccinatedDose, username));
	}

	@PostMapping("/editUserProfile")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<FormResponse> editUserProfile(@RequestBody RegisterRequest request) {
		return ResponseEntity.ok(service.editUserProfile(request));
	}

	@GetMapping("/getAllUsers")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<List<UserDTO>> getAllUsers() {
		return ResponseEntity.ok(service.getAllUsers());
	}

	@GetMapping("/getAllInfectedUsers")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<List<UserDTO>> getAllInfectedUsers() {
		return ResponseEntity.ok(service.getAllInfectedUsers());
	}
	
	@PostMapping("/changePassword")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<FormResponse> changePassword(@RequestParam("prev") String prev,
			@RequestParam("latest") String latest, @RequestParam("username") String username) {
		return ResponseEntity.ok(service.changePassword(prev, latest, username));
	}
}
