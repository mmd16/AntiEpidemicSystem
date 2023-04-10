package com.fyp.AntiEpidemicSystem.service;

import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.fyp.AntiEpidemicSystem.model.Form;
import com.fyp.AntiEpidemicSystem.response.FormResponse;
import com.fyp.AntiEpidemicSystem.response.UserSubmittedFormStatusResponse;

import jakarta.mail.MessagingException;

public interface FormService {

	public FormResponse saveRATForm(MultipartFile multipartFile, String ratResult, Date ratTestDate,
			String submittedByUsername) throws IOException;

	public FormResponse savePoclForm(MultipartFile multipartFile, String pcrResult, String closeResult,
			Date caseDate, String submittedByUsername) throws IOException;

	public FormResponse saveSlForm(MultipartFile multipartFile, String leaveReason, Date leaveStartDate,
			Date leaveEndDate, String username) throws IOException;

	public Optional<List<Form>> fetchAllForm(String username, String formCode);

	public Optional<Form> fetchform(String id, String formCode);

	public FormResponse approveForm(String id, String formCode, String username) throws ParseException, MessagingException, InterruptedException;

	public FormResponse rejectForm(String id, String formCode, String username) throws MessagingException, InterruptedException;

	public FormResponse cancelForm(String id, String formCode);

	public UserSubmittedFormStatusResponse gatherStatus(String username);
}
