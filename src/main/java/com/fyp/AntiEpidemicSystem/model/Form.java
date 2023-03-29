package com.fyp.AntiEpidemicSystem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_form")
public class Form {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Enumerated(EnumType.STRING)
	private FormCode formCode;
	
	private String formName;
	
	private String submittedTime;
	
	private String approvedTime;
	
	private String cancelledTime;
	
	private String rejectedTime;
	
	private String submittedByUsername;
	
	private String approvedByUsername;
	
	private String rejectedByUsername;
	
	private String rejectReason;
	
	@Column(nullable = true, length = 64)
    private String photos;
	
	@Enumerated(EnumType.STRING)
	private FormStatus formStatus;
	
	//RAT Field
	private String ratResult;
	
	private String ratTestDate;
	
	//POCL Field
	private String pcrResult;
	
	private String closeResult;
	
	private String caseDate;
	
	//SL Field
	private String leaveReason;
	
	private String leaveStartDate;
	
	private String leaveEndDate;
}
