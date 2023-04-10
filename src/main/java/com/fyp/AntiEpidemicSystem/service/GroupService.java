package com.fyp.AntiEpidemicSystem.service;

import java.util.List;

import com.fyp.AntiEpidemicSystem.model.GroupDTO;
import com.fyp.AntiEpidemicSystem.model.UserDTO;
import com.fyp.AntiEpidemicSystem.response.GroupResponse;

public interface GroupService {

	public GroupResponse createGroup(String name);

	public GroupResponse removeGroup(String name);

	public GroupResponse addToGroup(List<String> users, String name);

	public GroupResponse removeFromGroup(List<String> users, String name);

	public List<GroupDTO> getGroupLists();

	public List<UserDTO> getUsersNotJoined(String name);

	public List<UserDTO> getUsersJoined(String name);

	public boolean checkIfExist(String name);
}
