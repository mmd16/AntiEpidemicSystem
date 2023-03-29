package com.fyp.AntiEpidemicSystem.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserSubmittedFormStatusResponse {

	private boolean ratForm;
	private boolean poclForm;
	private boolean slForm;

}
