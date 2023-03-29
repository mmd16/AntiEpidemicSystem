package com.fyp.AntiEpidemicSystem.service;

import java.util.HashSet;
import java.util.NoSuchElementException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fyp.AntiEpidemicSystem.model.ClassRole;
import com.fyp.AntiEpidemicSystem.model.Event;
import com.fyp.AntiEpidemicSystem.model.Role;
import com.fyp.AntiEpidemicSystem.model.User;
import com.fyp.AntiEpidemicSystem.repository.UserRepository;
import com.fyp.AntiEpidemicSystem.request.AuthenticationRequest;
import com.fyp.AntiEpidemicSystem.request.RegisterRequest;
import com.fyp.AntiEpidemicSystem.response.AuthenticationResponse;
import com.fyp.AntiEpidemicSystem.response.RegisterResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

	private final UserRepository repository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	@Override
	public RegisterResponse register(RegisterRequest request) {
		var user = User.builder().firstname(request.getFirstname()).lastname(request.getLastname())
				.username(request.getUsername()).email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword())).role(getUserRole(request.getRole()))
				.mobile(request.getMobile()).vaccinatedDose(request.getVaccinatedDose())
				.classRole(getUserClassRole(request.getClassRole())).className(request.getClassName())
				.events(new HashSet<Event>()).build();
		repository.save(user);
		return RegisterResponse.builder().msg("The registration is completed").build();
	}

	@Override
	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
		var user = repository.findByUsername(request.getUsername()).orElseThrow();
		var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder().token(jwtToken).user(user).build();
	}

	@Override
	public AuthenticationResponse upgrade(AuthenticationRequest request) {
		var user = repository.findByUsername(request.getUsername()).orElseThrow();
		user.setRole(Role.ADMIN);
		var jwtToken = jwtService.generateToken(user);
		repository.save(user);
		return AuthenticationResponse.builder().token(jwtToken).user(user).build();
	}

	@Override
	public AuthenticationResponse addClassName(String username, String className) {
		var user = repository.findByUsername(username).orElseThrow();
		String newClassName = (user.getClassName() != null ? String.format("%s %s", user.getClassName(), className)
				: className);
		user.setClassName(newClassName);
		var jwtToken = jwtService.generateToken(user);
		repository.save(user);
		return AuthenticationResponse.builder().token(jwtToken).user(user).build();
	}

	private Role getUserRole(String role) {
		switch (role) {
		case "USER":
			return Role.USER;
		case "ADMIN":
			return Role.ADMIN;
		}
		return null;
	}

	private ClassRole getUserClassRole(String classRole) {
		switch (classRole) {
		case "STUDENT":
			return ClassRole.STUDENT;
		case "TEACHER":
			return ClassRole.TEACHER;
		}
		return null;
	}

	@Override
	public boolean checkIfExist(String username) {
		try {
			repository.findByUsername(username).orElseThrow();

		} catch (NoSuchElementException e) {
			return false;
		}
		return true;
	}
}
