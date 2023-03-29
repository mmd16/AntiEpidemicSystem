package com.fyp.AntiEpidemicSystem.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InfectionResponse {

	private int studentInfectionNum;

	private int teacherInfectionNum;
	
	private int allUser;

}
