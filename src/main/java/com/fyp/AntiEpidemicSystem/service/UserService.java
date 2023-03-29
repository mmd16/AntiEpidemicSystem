package com.fyp.AntiEpidemicSystem.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.fyp.AntiEpidemicSystem.model.User;
import com.fyp.AntiEpidemicSystem.request.RegisterRequest;
import com.fyp.AntiEpidemicSystem.response.FormResponse;
import com.fyp.AntiEpidemicSystem.response.InfectionResponse;

public interface UserService {

	public InfectionResponse getPositiveNumber();

	public FormResponse changeUserProfile(MultipartFile multipartFile, String email, String mobile, int vaccinatedDose,
			String username) throws IOException;

	public int getAbsNumber();

	public FormResponse editUserProfile(RegisterRequest request);

	public List<User> getAllUsers();

	public FormResponse changePassword(String prev, String latest, String username);
}
