package com.fyp.AntiEpidemicSystem.service;

import java.util.List;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

	private final JavaMailSender mailSender;

	@Async
	@Override
	public void sendEmail(String toUser, List<String> ccUser, String subject, String body)
			throws MessagingException, InterruptedException {
		Thread.sleep(1000);
		JavaMailSenderImpl jsmi = (JavaMailSenderImpl) mailSender;
		MimeMessage message = jsmi.createMimeMessage();
		MimeMessageHelper msgHelper = new MimeMessageHelper(message, true);
		msgHelper.setFrom("noahwong52@gmail.com");
		msgHelper.setTo(toUser);
		msgHelper.setCc(ccUser.stream().toArray(String[]::new));
		msgHelper.setText(body);
		msgHelper.setSubject(subject);
		mailSender.send(message);
	}

	@Async
	@Override
	public void sendEmail(List<String> toUser, String subject, String body)
			throws MessagingException, InterruptedException {
		Thread.sleep(1000);
		JavaMailSenderImpl jsmi = (JavaMailSenderImpl) mailSender;
		MimeMessage message = jsmi.createMimeMessage();
		MimeMessageHelper msgHelper = new MimeMessageHelper(message, true);
		msgHelper.setFrom("noahwong52@gmail.com");
		msgHelper.setTo(toUser.stream().toArray(String[]::new));
		msgHelper.setText(body);
		msgHelper.setSubject(subject);
		mailSender.send(message);
	}

	@Async
	@Override
	public void sendEmail(String toUser, String subject, String body) throws MessagingException, InterruptedException {
		Thread.sleep(1000);
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("noahwong52@gmail.com");
		message.setTo(toUser);
		message.setText(body);
		message.setSubject(subject);
		mailSender.send(message);
	}

}
