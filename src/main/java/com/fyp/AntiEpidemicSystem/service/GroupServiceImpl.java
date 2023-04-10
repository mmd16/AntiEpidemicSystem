package com.fyp.AntiEpidemicSystem.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fyp.AntiEpidemicSystem.model.Group;
import com.fyp.AntiEpidemicSystem.model.GroupDTO;
import com.fyp.AntiEpidemicSystem.model.GroupDTOMapper;
import com.fyp.AntiEpidemicSystem.model.User;
import com.fyp.AntiEpidemicSystem.model.UserDTO;
import com.fyp.AntiEpidemicSystem.model.UserDTOMapper;
import com.fyp.AntiEpidemicSystem.repository.GroupRepository;
import com.fyp.AntiEpidemicSystem.repository.UserRepository;
import com.fyp.AntiEpidemicSystem.response.GroupResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

	private final GroupRepository groupRepository;
	private final UserRepository userRepository;
	private final UserDTOMapper userDTOMapper;
	private final GroupDTOMapper groupDTOMapper;

	@Override
	public GroupResponse createGroup(String name) {
		var group = Group.builder().name(name).memberNumber(0).isActive(true).users(new HashSet<User>()).build();
		groupRepository.save(group);
		return GroupResponse.builder().msg("Group is created successfully!").build();
	}

	@Override
	public GroupResponse removeGroup(String name) {
		var group = groupRepository.findByName(name).orElseThrow();
		group.setActive(false);
		groupRepository.save(group);
		return GroupResponse.builder().msg("Group is removed successfully!").build();
	}

	@Override
	public GroupResponse addToGroup(List<String> users, String name) {
		var group = groupRepository.findByName(name).orElseThrow();
		var oldNum = group.getMemberNumber();
		var userList = getUsers(users);
		group.getUsers().addAll(userList);
		group.setMemberNumber(oldNum += users.size());
		groupRepository.save(group);
		addGroups(userList, group);
		return GroupResponse.builder().msg("Members are added successfully!").build();
	}

	@Override
	public GroupResponse removeFromGroup(List<String> users, String name) {
		var group = groupRepository.findByName(name).orElseThrow();
		var oldNum = group.getMemberNumber();
		var userList = getUsers(users);
		group.getUsers().removeAll(userList);
		group.setMemberNumber(oldNum -= users.size());
		groupRepository.save(group);
		removeGroups(userList, group);
		return GroupResponse.builder().msg("Members are removed successfully!").build();
	}

	private List<User> getUsers(List<String> users) {
		List<User> tmp = new ArrayList<>();
		users.forEach(s -> {
			tmp.add(userRepository.findByUsername(s).orElseThrow());
		});
		return tmp;
	}

	private void addGroups(List<User> userList, Group group) {

		userList.forEach(u -> {
			u.addGroup(group);
		});
		userRepository.saveAll(userList);
		groupRepository.save(group);
	}

	private void removeGroups(List<User> userList, Group group) {
		userList.forEach(u -> {
			u.removeGroup(group);
		});
		userRepository.saveAll(userList);
		groupRepository.save(group);
	}

	@Override
	public List<UserDTO> getUsersNotJoined(String name) {
		var group = groupRepository.findByName(name).orElseThrow();
		var allUserList = userRepository.findAll();
		allUserList.removeAll(group.getUsers());
		return allUserList.stream().map(userDTOMapper).collect(Collectors.toList());
	}

	@Override
	public List<UserDTO> getUsersJoined(String name) {
		var group = groupRepository.findByName(name).orElseThrow();
		return new ArrayList<>(group.getUsers()).stream().map(userDTOMapper).collect(Collectors.toList());
	}

	@Override
	public List<GroupDTO> getGroupLists() {
		return groupRepository.findAllByIsActive(true).orElseThrow().stream().map(groupDTOMapper)
				.collect(Collectors.toList());
	}

	@Override
	public boolean checkIfExist(String name) {
		try {
			groupRepository.findByName(name).orElseThrow();

		} catch (NoSuchElementException e) {
			return false;
		}
		return true;
	}

}
