package com.fyp.AntiEpidemicSystem.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.fyp.AntiEpidemicSystem.config.FileUploadUtil;
import com.fyp.AntiEpidemicSystem.model.ClassRole;
import com.fyp.AntiEpidemicSystem.model.Event;
import com.fyp.AntiEpidemicSystem.model.Role;
import com.fyp.AntiEpidemicSystem.model.User;
import com.fyp.AntiEpidemicSystem.model.UserDTO;
import com.fyp.AntiEpidemicSystem.model.UserDTOMapper;
import com.fyp.AntiEpidemicSystem.repository.UserRepository;
import com.fyp.AntiEpidemicSystem.request.RegisterRequest;
import com.fyp.AntiEpidemicSystem.response.FormResponse;
import com.fyp.AntiEpidemicSystem.response.InfectionResponse;

import lombok.Data;

@Service
@Data
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final AuthenticationManager authenticationManager;
	private final PasswordEncoder passwordEncoder;
	private final UserDTOMapper userDTOMapper;

	@Override
	public InfectionResponse getPositiveNumber() {
		var dataList = userRepository.findAll();
		var studentList = userRepository.findAllByIsPositiveAndClassRole(true, ClassRole.STUDENT).orElseThrow();
		var teacherList = userRepository.findAllByIsPositiveAndClassRole(true, ClassRole.TEACHER).orElseThrow();
		var infectionResponse = InfectionResponse.builder().studentInfectionNum(studentList.size())
				.teacherInfectionNum(teacherList.size()).allUser(dataList.size()).build();
		return infectionResponse;
	}

	@Override
	public int getAbsNumber() {
		int counter = 0;
		var dataList = userRepository.findAll();
		for (User user : dataList) {
			if (checkifSLtoday(user)) {
				counter++;
			}
		}
		return counter;
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

	@Override
	public FormResponse changeUserProfile(MultipartFile multipartFile, String email, String emergencyEmail,
			String mobile, int vaccinatedDose, String username) throws IOException {
		var user = userRepository.findByUsername(username).orElseThrow();
		String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
		String uploadDir = String.format("systemfrontend/public/user/%s/", user.getId());
		FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
		String refDir = String.format("/user/%s/%s", user.getId(), fileName);
		user.setVaccinationRecord(refDir);
		user.setEmail(email);
		user.setEmergencyEmail(emergencyEmail);
		user.setVaccinatedDose(vaccinatedDose);
		user.setMobile(mobile);
		userRepository.save(user);
		return FormResponse.builder().msg("Profile has been changed").build();
	}

	@Override
	public FormResponse editUserProfile(RegisterRequest request) {
		var user = userRepository.findByUsername(request.getUsername()).orElseThrow();
		user.setClassName(request.getClassName());
		user.setClassRole(getClassRole(request.getClassRole()));
		user.setEmail(request.getEmail());
		user.setEmergencyEmail(request.getEmergencyEmail());
		user.setFirstname(request.getFirstname());
		user.setLastname(request.getLastname());
		user.setMobile(request.getMobile());
		user.setRole(getRole(request.getRole()));
		userRepository.save(user);
		return FormResponse.builder().msg("Profile has been changed").build();
	}

	private ClassRole getClassRole(String str) {
		switch (str) {
		case "STUDENT":
			return ClassRole.STUDENT;
		case "TEACHER":
			return ClassRole.TEACHER;
		}
		return null;
	}

	private Role getRole(String str) {
		switch (str) {
		case "ADMIN":
			return Role.ADMIN;
		case "USER":
			return Role.USER;
		}
		return null;
	}

	@Override
	public List<UserDTO> getAllUsers() {
		return userRepository.findAll().stream().map(userDTOMapper).collect(Collectors.toList());
	}
	
	@Override
	public List<UserDTO> getAllInfectedUsers() {
		return userRepository.findAllByIsPositive(true).orElseThrow().stream().map(userDTOMapper).collect(Collectors.toList());
	}

	@Override
	public FormResponse changePassword(String prev, String latest, String username) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, prev));
		var user = userRepository.findByUsername(username).orElseThrow();
		user.setPassword(passwordEncoder.encode(latest));
		userRepository.save(user);
		return FormResponse.builder().msg("Password has been successfully changed").build();
	}

}
