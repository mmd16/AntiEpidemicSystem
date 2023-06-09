package com.fyp.AntiEpidemicSystem.service;

import java.util.HashSet;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fyp.AntiEpidemicSystem.model.ClassRole;
import com.fyp.AntiEpidemicSystem.model.Event;
import com.fyp.AntiEpidemicSystem.model.Group;
import com.fyp.AntiEpidemicSystem.model.Role;
import com.fyp.AntiEpidemicSystem.model.Token;
import com.fyp.AntiEpidemicSystem.model.TokenType;
import com.fyp.AntiEpidemicSystem.model.User;
import com.fyp.AntiEpidemicSystem.model.UserDTOMapper;
import com.fyp.AntiEpidemicSystem.repository.EventRepository;
import com.fyp.AntiEpidemicSystem.repository.TokenRepository;
import com.fyp.AntiEpidemicSystem.repository.UserRepository;
import com.fyp.AntiEpidemicSystem.request.AuthenticationRequest;
import com.fyp.AntiEpidemicSystem.request.RegisterRequest;
import com.fyp.AntiEpidemicSystem.response.AuthenticationResponse;
import com.fyp.AntiEpidemicSystem.response.FormResponse;
import com.fyp.AntiEpidemicSystem.response.RegisterResponse;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

	private final UserRepository userRepository;
	private final TokenRepository tokenRepository;
	private final EventRepository eventRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final EmailService emailService;
	private final AuthenticationManager authenticationManager;
	private final UserDTOMapper userDTOMapper;

	@Override
	public RegisterResponse register(RegisterRequest request) {
		var user = User.builder().firstname(request.getFirstname()).lastname(request.getLastname())
				.username(request.getUsername()).email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword())).role(getUserRole(request.getRole()))
				.mobile(request.getMobile()).vaccinatedDose(request.getVaccinatedDose())
				.classRole(getUserClassRole(request.getClassRole())).className(request.getClassName())
				.events(initialiseEvent()).emergencyEmail(request.getEmergencyEmail()).groups(new HashSet<Group>())
				.build();
		userRepository.save(user);
		return RegisterResponse.builder().msg("The registration is completed").build();
	}

	@Override
	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
		var user = userRepository.findByUsername(request.getUsername()).orElseThrow();
		var token = jwtService.generateToken(user);
		revokeAllToken(user);
		saveToken(user, token);
		return AuthenticationResponse.builder().token(token).user(userDTOMapper.apply(user)).build();
	}

	private HashSet<Event> initialiseEvent() {
		var eventList = eventRepository.findAll().stream().filter(s -> !s.getTitle().equalsIgnoreCase("Sick Leave"))
				.collect(Collectors.toList());
		return new HashSet<Event>(eventList);
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
			userRepository.findByUsername(username).orElseThrow();

		} catch (NoSuchElementException e) {
			return false;
		}
		return true;
	}

	private void saveToken(User user, String token) {
		var jwtToken = Token.builder().user(user).token(token).tokenType(TokenType.BEARER).expired(false).revoked(false)
				.build();
		tokenRepository.save(jwtToken);
	}

	private void revokeAllToken(User user) {
		var validTokens = tokenRepository.findAllValidTokenByUser(user.getId());
		if (validTokens.isEmpty()) {
			return;
		}
		validTokens.forEach(t -> {
			t.setExpired(true);
			t.setRevoked(true);
		});
		tokenRepository.saveAll(validTokens);
	}

	@Override
	public FormResponse changePassword(String latest, String username) {
		var user = userRepository.findByUsername(username).orElseThrow();
		user.setPassword(passwordEncoder.encode(latest));
		userRepository.save(user);
		return FormResponse.builder().msg("Password has been successfully changed").build();
	}

	@Override
	public FormResponse forgetPassword(String username) throws MessagingException, InterruptedException {
		var user = userRepository.findByUsername(username).orElseThrow();
		emailService.sendEmail(user.getEmail(), "Information regarding forget Password",
				generateForgetPasswordTemplate(String.format("%s %s", user.getFirstname(), user.getLastname())));
		return FormResponse.builder().msg("Password reset link has been sent").build();
	}

	private String generateForgetPasswordTemplate(String re) {
		String template = String.format("Dear %s\n\nPlease reset your password by the following link.\n"
				+ "http://localhost:3000/updatePassword\n\n" + "Best regards,\n" + "General Office\n"
				+ "Poki Secondary School", re);
		return template;
	}

}
