package com.fyp.AntiEpidemicSystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fyp.AntiEpidemicSystem.request.AuthenticationRequest;
import com.fyp.AntiEpidemicSystem.request.RegisterRequest;
import com.fyp.AntiEpidemicSystem.response.AuthenticationResponse;
import com.fyp.AntiEpidemicSystem.response.RegisterResponse;
import com.fyp.AntiEpidemicSystem.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

	private final AuthenticationService service;

	@PostMapping("/register")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) {
		return ResponseEntity.ok(service.register(request));
	}

	@PostMapping("/authenticate")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
		return ResponseEntity.ok(service.authenticate(request));

	}

	@GetMapping("/checkIfExist")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<Boolean> checkIfExist(@RequestParam("username") String username) {
		return ResponseEntity.ok(service.checkIfExist(username));
	}

	@PostMapping("/upgrade")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<AuthenticationResponse> upgrade(@RequestBody AuthenticationRequest request) {
		return ResponseEntity.ok(service.upgrade(request));

	}

	@PostMapping("/addClassName")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<AuthenticationResponse> addClassName(@RequestParam("username") String username,
			@RequestParam("className") String className) {
		return ResponseEntity.ok(service.addClassName(username, className));
	}

}
