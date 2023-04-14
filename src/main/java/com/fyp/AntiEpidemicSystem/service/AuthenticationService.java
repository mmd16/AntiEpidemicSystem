package com.fyp.AntiEpidemicSystem.service;

import com.fyp.AntiEpidemicSystem.request.AuthenticationRequest;
import com.fyp.AntiEpidemicSystem.request.RegisterRequest;
import com.fyp.AntiEpidemicSystem.response.AuthenticationResponse;
import com.fyp.AntiEpidemicSystem.response.FormResponse;
import com.fyp.AntiEpidemicSystem.response.RegisterResponse;

import jakarta.mail.MessagingException;

public interface AuthenticationService {

	public RegisterResponse register(RegisterRequest request);

	public AuthenticationResponse authenticate(AuthenticationRequest request);

	public boolean checkIfExist(String username);

	FormResponse changePassword(String latest, String username);

	FormResponse forgetPassword(String username) throws MessagingException, InterruptedException;
}
