package com.fyp.AntiEpidemicSystem.service;

import java.util.Date;
import java.util.List;

import com.fyp.AntiEpidemicSystem.model.Event;
import com.fyp.AntiEpidemicSystem.response.FormResponse;

public interface EventService {

	public FormResponse addEventforAll(Date start, Date end, String title);
	
	public FormResponse removeEventforAll(String id);
	
	public FormResponse updateEventforAll(Date start, Date end, String title, String id);
	
	public FormResponse addEvent(Date start, Date end, String title, String username);
	
	public boolean checkIsEditable(String id);
	
	public List<Event> getUserAllEvent(String username);
}
