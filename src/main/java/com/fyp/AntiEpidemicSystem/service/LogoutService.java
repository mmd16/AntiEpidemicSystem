package com.fyp.AntiEpidemicSystem.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import com.fyp.AntiEpidemicSystem.repository.TokenRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

	private final TokenRepository tokenRepository;

	@Override
	public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
		final String authHeader = request.getHeader("Authorization");
		final String token;
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			return;
		}
		token = authHeader.substring(7);
		var dbToken = tokenRepository.findByToken(token).orElse(null);
		if (dbToken != null) {
			dbToken.setExpired(true);
			dbToken.setRevoked(true);
			tokenRepository.save(dbToken);
			SecurityContextHolder.clearContext();
		}
	}
}
