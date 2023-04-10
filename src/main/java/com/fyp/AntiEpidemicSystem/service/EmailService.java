package com.fyp.AntiEpidemicSystem.service;

import java.util.List;

import jakarta.mail.MessagingException;

public interface EmailService {

	public void sendEmail(String toUser, List<String> ccUser, String subject, String body)
			throws MessagingException, InterruptedException;

	public void sendEmail(String toUser, String subject, String body)
			throws MessagingException, InterruptedException;

	public void sendEmail(List<String> toUser, String subject, String body) throws MessagingException, InterruptedException;

}
