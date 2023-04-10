package com.fyp.AntiEpidemicSystem.controller;

import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fyp.AntiEpidemicSystem.model.Form;
import com.fyp.AntiEpidemicSystem.response.FormResponse;
import com.fyp.AntiEpidemicSystem.response.UserSubmittedFormStatusResponse;
import com.fyp.AntiEpidemicSystem.service.FormService;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/form")
@RequiredArgsConstructor
public class FormController {

	private final FormService service;

	@PostMapping("/saveRat")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<FormResponse> test(@RequestParam("image") MultipartFile multipartFile,
			@RequestParam("ratResult") String ratResult, @RequestParam("ratTestDate") Date ratTestDate,
			@RequestParam("username") String username) throws IOException {
		return ResponseEntity.ok(service.saveRATForm(multipartFile, ratResult, ratTestDate, username));
	}

	@PostMapping("/savePocl")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<FormResponse> savePocl(@RequestParam("image") MultipartFile multipartFile,
			@RequestParam("pcrResult") String pcrResult, @RequestParam("closeResult") String closeResult,
			@RequestParam("caseDate") Date caseDate, @RequestParam("username") String username) throws IOException {
		return ResponseEntity.ok(service.savePoclForm(multipartFile, pcrResult, closeResult, caseDate, username));
	}

	@PostMapping("/saveSl")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<FormResponse> saveSl(@RequestParam("image") MultipartFile multipartFile,
			@RequestParam("leaveReason") String leaveReason, @RequestParam("leaveStartDate") Date leaveStartDate,
			@RequestParam("leaveEndDate") Date leaveEndDate, @RequestParam("username") String username)
			throws IOException {
		return ResponseEntity
				.ok(service.saveSlForm(multipartFile, leaveReason, leaveStartDate, leaveEndDate, username));
	}

	@GetMapping("/getFormList")
	@CrossOrigin(origins = "http://localhost:3000")
	public Optional<List<Form>> getFormList(@RequestParam("username") String username,
			@RequestParam("formCode") String formCode) throws IOException {
		return service.fetchAllForm(username, formCode);
	}

	@GetMapping("/getForm")
	@CrossOrigin(origins = "http://localhost:3000")
	public Optional<Form> getForm(@RequestParam("id") String id, @RequestParam("formCode") String formCode)
			throws IOException {
		return service.fetchform(id, formCode);
	}

	@PostMapping("/approveForm")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<FormResponse> approveForm(@RequestParam("id") String id,
			@RequestParam("formCode") String formCode, @RequestParam("username") String username)
			throws IOException, ParseException, MessagingException, InterruptedException {
		return ResponseEntity.ok(service.approveForm(id, formCode, username));
	}

	@PostMapping("/rejectForm")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<FormResponse> rejectForm(@RequestParam("id") String id,
			@RequestParam("formCode") String formCode, @RequestParam("username") String username) throws IOException, MessagingException, InterruptedException {
		return ResponseEntity.ok(service.rejectForm(id, formCode, username));
	}

	@PostMapping("/cancelForm")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<FormResponse> cancelForm(@RequestParam("id") String id,
			@RequestParam("formCode") String formCode) throws IOException {
		return ResponseEntity.ok(service.cancelForm(id, formCode));
	}

	@GetMapping("/gatherStatus")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<UserSubmittedFormStatusResponse> gatherStatus(@RequestParam("username") String username)
			throws IOException {
		return ResponseEntity.ok(service.gatherStatus(username));
	}
}
