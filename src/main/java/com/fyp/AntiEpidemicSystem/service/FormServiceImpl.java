package com.fyp.AntiEpidemicSystem.service;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.fyp.AntiEpidemicSystem.config.FileUploadUtil;
import com.fyp.AntiEpidemicSystem.model.ClassRole;
import com.fyp.AntiEpidemicSystem.model.Form;
import com.fyp.AntiEpidemicSystem.model.FormCode;
import com.fyp.AntiEpidemicSystem.model.FormStatus;
import com.fyp.AntiEpidemicSystem.model.Role;
import com.fyp.AntiEpidemicSystem.model.User;
import com.fyp.AntiEpidemicSystem.repository.FormRepository;
import com.fyp.AntiEpidemicSystem.repository.UserRepository;
import com.fyp.AntiEpidemicSystem.response.FormResponse;
import com.fyp.AntiEpidemicSystem.response.UserSubmittedFormStatusResponse;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FormServiceImpl implements FormService {

	private final FormRepository formRepository;
	private final UserRepository userRepository;
	private final EventService eventService;
	private final EmailService emailService;
	private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

	@Override
	public FormResponse saveRATForm(MultipartFile multipartFile, String ratResult, Date ratTestDate,
			String submittedByUsername) throws IOException {
		// Form Name
		String formName = "Rapid Antigen Test Form";
		// Time
		String submittedTime = LocalDate.now().format(formatter);
		// Image
		String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
		var form = Form.builder().ratResult(ratResult).ratTestDate(formatDate(ratTestDate))
				.submittedByUsername(submittedByUsername).submittedTime(submittedTime).formCode(FormCode.RAT)
				.formStatus(FormStatus.PENDING).formName(formName).build();
		form = formRepository.save(form);
		String uploadDir = String.format("systemfrontend/public/form/RAT/%s/", form.getId());
		FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
		String photoDir = String.format("form/RAT/%s/%s", form.getId(), fileName);
		form.setPhotos(photoDir);
		formRepository.save(form);
		return FormResponse.builder().msg("Form is successfully created").build();
	}

	@Override
	public Optional<List<Form>> fetchAllForm(String username, String formCode) {
		var user = userRepository.findByUsername(username).orElseThrow();
		if (user.getRole().equals(Role.ADMIN)) {
			return formRepository.findAllByFormCode(getFormCode(formCode));
		}
		return formRepository.findAllBySubmittedByUsernameAndFormCode(username, getFormCode(formCode));
	}

	@Override
	public Optional<Form> fetchform(String id, String formCode) {
		return formRepository.findByid(id);
	}

	@Override
	public FormResponse savePoclForm(MultipartFile multipartFile, String pcrResult, String closeResult, Date caseDate,
			String submittedByUsername) throws IOException {
		// Form Name
		String formName = "Positive Close Contact Form";
		// Time
		String submittedTime = LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
		// Image
		String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
		var form = Form.builder().pcrResult(pcrResult).closeResult(closeResult).caseDate(formatDate(caseDate))
				.submittedByUsername(submittedByUsername).submittedTime(submittedTime).formCode(FormCode.POCL)
				.formStatus(FormStatus.PENDING).formName(formName).build();
		form = formRepository.save(form);
		String uploadDir = String.format("systemfrontend/public/form/POCL/%s/", form.getId());
		FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
		String photoDir = String.format("form/POCL/%s/%s", form.getId(), fileName);
		form.setPhotos(photoDir);
		formRepository.save(form);
		return FormResponse.builder().msg("Form is successfully created").build();
	}

	@Override
	public FormResponse saveSlForm(MultipartFile multipartFile, String leaveReason, Date leaveStartDate,
			Date leaveEndDate, String submittedByUsername) throws IOException {
		String formName = "Sick Leave Request Form";
		String submittedTime = LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
		String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
		var form = Form.builder().leaveReason(leaveReason).leaveStartDate(formatDate(leaveStartDate))
				.leaveEndDate(formatDate(leaveEndDate)).submittedByUsername(submittedByUsername)
				.submittedTime(submittedTime).formCode(FormCode.SL).formStatus(FormStatus.PENDING).formName(formName)
				.build();
		form = formRepository.save(form);
		String uploadDir = String.format("systemfrontend/public/form/SL/%s/", form.getId());
		FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
		String photoDir = String.format("form/SL/%s/%s", form.getId(), fileName);
		form.setPhotos(photoDir);
		formRepository.save(form);
		return FormResponse.builder().msg("Form is successfully created").build();
	}

	private String formatDate(Date date) {
		LocalDate localDate = LocalDate.ofInstant(date.toInstant(), ZoneId.systemDefault());
		return localDate.format(formatter);
	}

	private FormCode getFormCode(String formCode) {
		switch (formCode) {
		case "RAT":
			return FormCode.RAT;
		case "POCL":
			return FormCode.POCL;
		case "SL":
			return FormCode.SL;
		}
		return null;
	}

	@Override
	public FormResponse approveForm(String id, String formCode, String username)
			throws ParseException, MessagingException, InterruptedException {
		var form = formRepository.findByid(id).orElseThrow();
		var user = userRepository.findByUsername(form.getSubmittedByUsername()).orElseThrow();
		var userFullName = String.format("%s %s", user.getFirstname(), user.getLastname());
		var teacherEmailList = userRepository.findAllByClassNameAndClassRole(user.getClassName(), ClassRole.TEACHER)
				.orElseThrow().stream().map(t -> t.getEmail()).collect(Collectors.toList());
		form.setApprovedByUsername(username);
		form.setApprovedTime(LocalDate.now().format(formatter));
		form.setFormStatus(FormStatus.APPROVED);
		formRepository.save(form);
		if (formCode.equalsIgnoreCase("SL")) {
			eventService.addEvent(dateStrConvert(form.getLeaveStartDate(), false),
					dateStrConvert(form.getLeaveEndDate(), true), "Sick Leave", form.getSubmittedByUsername());
			if (user.getClassRole().equals(ClassRole.STUDENT)) {
				emailService.sendEmail(user.getEmergencyEmail(), teacherEmailList, "Approval of Sick Leave Request",
						generateSickLeageTemplateStudent(userFullName, form.getLeaveStartDate(),
								form.getLeaveEndDate()));
			} else if (user.getClassRole().equals(ClassRole.TEACHER)) {
				emailService.sendEmail(user.getEmail(), "Approval of Sick Leave Request",
						generateSickLeageTemplateTeacher(userFullName, form.getLeaveStartDate(),
								form.getLeaveEndDate()));
			}

		} else if (formCode.equalsIgnoreCase("RAT")) {
			if (form.getRatResult().equalsIgnoreCase("Positive")) {
				user.setPositive(true);
				if (user.getClassRole().equals(ClassRole.STUDENT)) {
					emailService.sendEmail(user.getEmergencyEmail(), teacherEmailList,
							"Information regarding Positive RAT Result", generatePositiveTemplateStudent(userFullName));
				} else if (user.getClassRole().equals(ClassRole.TEACHER)) {
					emailService.sendEmail(user.getEmail(), "Information regarding Positive RAT Result",
							generatePositiveTemplateTeacher(userFullName));
				}
				sendtoGroupMembers(user);
			} else {
				user.setPositive(false);
			}
			userRepository.save(user);
		}
		return FormResponse.builder().msg("Form is approved").build();
	}

	private void sendtoGroupMembers(User user) {
		if (user.getGroups().size() > 0) {
			user.getGroups().forEach(g -> {
				var userList = new ArrayList<>(g.getUsers());
				List<String> emailList = userList.stream().map(u -> u.getEmail()).collect(Collectors.toList());
				try {
					emailService.sendEmail(emailList,
							String.format("Information regarding Positive RAT Result of member in %s", g.getName()),
							generateGroupNotification());
				} catch (MessagingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			});
		}
	}

	@Override
	public FormResponse rejectForm(String id, String formCode, String username)
			throws MessagingException, InterruptedException {
		var form = formRepository.findByid(id).orElseThrow();
		var user = userRepository.findByUsername(form.getSubmittedByUsername()).orElseThrow();
		var userFullName = String.format("%s %s", user.getFirstname(), user.getLastname());
		form.setRejectedByUsername(username);
		form.setRejectedTime(LocalDate.now().format(formatter));
		form.setFormStatus(FormStatus.REJECTED);
		formRepository.save(form);
		emailService.sendEmail(user.getEmail(),
				String.format("Information regarding the form submission of %s", form.getFormName()),
				generateRejectMessage(userFullName, form.getFormName()));
		return FormResponse.builder().msg("Form is rejected").build();
	}

	@Override
	public FormResponse cancelForm(String id, String formCode) {
		var form = formRepository.findByid(id).get();
		form.setCancelledTime(LocalDate.now().format(formatter));
		form.setFormStatus(FormStatus.CANCELED);
		formRepository.save(form);
		return FormResponse.builder().msg("Form is cancelled").build();
	}

	private Date dateStrConvert(String dateStr, boolean isEnd) throws ParseException {
		if (isEnd) {
			Date date = new SimpleDateFormat("dd-MM-yyyy").parse(dateStr);
			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			cal.set(Calendar.HOUR_OF_DAY, 23);
			cal.set(Calendar.MINUTE, 59);
			cal.set(Calendar.SECOND, 59);
			return cal.getTime();
		} else {
			Date date = new SimpleDateFormat("dd-MM-yyyy").parse(dateStr);
			return date;
		}
	}

	@Override
	public UserSubmittedFormStatusResponse gatherStatus(String username) {
		String submittedTime = LocalDate.now().format(formatter);
		var ratList = formRepository
				.findAllBySubmittedTimeAndSubmittedByUsernameAndFormCode(submittedTime, username, getFormCode("RAT"))
				.orElseThrow();
		var poclList = formRepository
				.findAllBySubmittedTimeAndSubmittedByUsernameAndFormCode(submittedTime, username, getFormCode("POCL"))
				.orElseThrow();
		var slList = formRepository
				.findAllBySubmittedTimeAndSubmittedByUsernameAndFormCode(submittedTime, username, getFormCode("SL"))
				.orElseThrow();
		boolean ratForm = ratList.size() > 0 ? true : false;
		boolean poclForm = poclList.size() > 0 ? true : false;
		boolean slForm = slList.size() > 0 ? true : false;
		return UserSubmittedFormStatusResponse.builder().ratForm(ratForm).poclForm(poclForm).slForm(slForm).build();
	}

	private String generatePositiveTemplateStudent(String re) {
		String template = String
				.format("Dear %s's parent,\n\nWe are sorry to know that %s has been infected with COVID-19. "
						+ "We will make an appropriate arrangement for his/her learning and "
						+ "we wish your child get well soon.\n\n" + "Best regards,\n" + "General Office\n"
						+ "Poki Secondary School", re, re);
		return template;
	}

	private String generateGroupNotification() {
		String template = "Dear All,\n\nWe are sorry to inform you that there are group members infected recently. "
				+ "We will make appropriate arrangements for it. " + "We wish you a healthy life.\n\n"
				+ "Best regards,\n" + "General Office\n" + "Poki Secondary School";
		return template;
	}

	private String generateRejectMessage(String name, String form) {
		String template = String.format("Dear %s,\n\nThe %s that you submitted has been rejected. "
				+ "Please review your submission and resubmit the form. "
				+ "Should you have any enquries, please feel free to contact us. \n\n" + "Best regards,\n"
				+ "General Office\n" + "Poki Secondary School", name, form);
		return template;
	}

	private String generatePositiveTemplateTeacher(String re) {
		String template = String.format("Dear %s,\n\nWe are sorry to know that you are infected with COVID-19. "
				+ "We will make an appropriate arrangement for your work." + " We wish you get well soon.\n\n"
				+ "Best regards,\n" + "General Office\n" + "Poki Secondary School", re);
		return template;
	}

	private String generateSickLeageTemplateStudent(String re, String start, String end) {
		String template = String.format("Dear %s's parent,\n\nWe are sorry to know that %s is sick. "
				+ "The sick leave from %s to %s is approved, we wish your child get well soon.\n\n" + "Best regards,\n"
				+ "General Office\n" + "Poki Secondary School", re, re, start, end);
		return template;
	}

	private String generateSickLeageTemplateTeacher(String re, String start, String end) {
		String template = String.format("Dear %s\n\nWe are sorry to know that you are sick."
				+ "The sick leave from %s to %s is approved, we wish your get well soon.\n\n" + "Best regards,\n"
				+ "General Office\n" + "Poki Secondary School", re, start, end);
		return template;
	}

}
