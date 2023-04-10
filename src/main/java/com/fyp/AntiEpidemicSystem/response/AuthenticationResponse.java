package com.fyp.AntiEpidemicSystem.response;

import com.fyp.AntiEpidemicSystem.model.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

	private String token;

	private UserDTO user;

}
