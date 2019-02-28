package com.stackroute.keepnote.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.keepnote.exception.ReminderNotCreatedException;
import com.stackroute.keepnote.exception.ReminderNotFoundException;
import com.stackroute.keepnote.model.Reminder;
import com.stackroute.keepnote.service.ReminderService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/*
 * As in this assignment, we are working with creating RESTful web service, hence annotate
 * the class with @RestController annotation.A class annotated with @Controller annotation
 * has handler methods which returns a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */
@RestController
@Api
public class ReminderController {

	/*
	 * From the problem statement, we can understand that the application requires
	 * us to implement five functionalities regarding reminder. They are as
	 * following:
	 * 
	 * 1. Create a reminder 
	 * 2. Delete a reminder 
	 * 3. Update a reminder 
	 * 4. Get all reminders by userId 
	 * 5. Get a specific reminder by id.
	 * 
	 */

	/*
	 * Autowiring should be implemented for the ReminderService. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword
	 */
	
	private Log log = LogFactory.getLog(getClass());
	
	private ReminderService reminderService;

	public ReminderController(ReminderService reminderService) {
		this.reminderService = reminderService;
	}

	/*
	 * Define a handler method which will create a reminder by reading the
	 * Serialized reminder object from request body and save the reminder in
	 * database. Please note that the reminderId has to be unique. This handler
	 * method should return any one of the status messages basis on different
	 * situations: 
	 * 1. 201(CREATED - In case of successful creation of the reminder
	 * 2. 409(CONFLICT) - In case of duplicate reminder ID
	 *
	 * This handler method should map to the URL "/api/v1/reminder" using HTTP POST
	 * method".
	 */
	@ApiOperation(value = "Create Reminder")
	@PostMapping("/api/v1/reminder")
	public ResponseEntity<?> createReminder(@RequestBody Reminder reminder,HttpServletRequest request) {
		log.info("createReminder : STARTED");
		HttpHeaders headers = new HttpHeaders();
		String loggedInUser =(String) request.getSession().getAttribute("loggedInUserId");
		try {
			reminder.setReminderCreatedBy(loggedInUser);
			reminder.setReminderCreationDate(new Date());
			if(reminderService.createReminder(reminder)!=null)
			{
				return new ResponseEntity<>(headers, HttpStatus.CREATED);
			}
		} catch (ReminderNotCreatedException e) {
			e.printStackTrace();
			return new ResponseEntity<>(headers, HttpStatus.CONFLICT);
		}
		log.info("createReminder : ENDED");
		return new ResponseEntity<>(headers, HttpStatus.CONFLICT);
	}

	/*
	 * Define a handler method which will delete a reminder from a database.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the reminder deleted successfully from database. 
	 * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/reminder/{id}" using HTTP Delete
	 * method" where "id" should be replaced by a valid reminderId without {}
	 */
	@ApiOperation(value = "Delete Reminder by Id")
	@DeleteMapping("/api/v1/reminder/{id}")
	public ResponseEntity<?> deleteReminder(@PathVariable("id") String id,HttpServletRequest request) 
	{
	
		log.info("deleteReminder : STARTED");
		HttpHeaders headers = new HttpHeaders();
		String loggedInUser =(String) request.getSession().getAttribute("loggedInUserId");
		
		try {
			if(reminderService.deleteReminder(id))
			{
				return new ResponseEntity<>(headers, HttpStatus.OK);
			}
		} catch (ReminderNotFoundException e) {
			e.printStackTrace();
			return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
		}
		log.info("deleteReminder : ENDED");
		return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
	}
	/*
	 * Define a handler method which will update a specific reminder by reading the
	 * Serialized object from request body and save the updated reminder details in
	 * a database. This handler method should return any one of the status messages
	 * basis on different situations: 
	 * 1. 200(OK) - If the reminder updated successfully. 
	 * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found. 
	 * 
	 * This handler method should map to the URL "/api/v1/reminder/{id}" using HTTP PUT
	 * method.
	 */
	@ApiOperation(value = "Update Reminder by id")
	@PutMapping("/api/v1/reminder/{id}")
	public ResponseEntity<?> updateReminder(@RequestBody Reminder reminder,@PathVariable("id") String id,HttpServletRequest request) 
	{
		log.info("updateReminder : STARTED");
		HttpHeaders headers = new HttpHeaders();
		try {	
				if(reminderService.updateReminder(reminder,id)!=null)
				{
					return new ResponseEntity<>(headers, HttpStatus.OK);
				}
				else
				{
					return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
				}
		} catch (ReminderNotFoundException e) {
			e.printStackTrace();
		}
		log.info("updateReminder : ENDED");
		return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
	}
	

	/*
	 * Define a handler method which will show details of a specific reminder. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the reminder found successfully. 
	 * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found. 
	 * 
	 * This handler method should map to the URL "/api/v1/reminder/{id}" using HTTP GET method
	 * where "id" should be replaced by a valid reminderId without {}
	 */
	@ApiOperation(value = "Get Reminder by id")
	@GetMapping("/api/v1/reminder/{id}")
	public ResponseEntity<?> getReminderById(@PathVariable("id") String id, HttpServletRequest request) {
		log.info("getReminderById : STARTED");
		HttpHeaders headers = new HttpHeaders();
		try {
				Reminder reminder =reminderService.getReminderById(id);
				if(reminder!=null)
				{
					return new ResponseEntity<>(headers, HttpStatus.OK);
					
				}
				
		} catch (ReminderNotFoundException e) {
			e.printStackTrace();
			return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
		}
		log.info("getReminderById : ENDED");
		return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
	}

	/*
	 * Define a handler method which will get us the all reminders.
	 * This handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the reminder found successfully. 
	 * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/reminder" using HTTP GET method
	 */
	@ApiOperation(value = "Get Reminders")
	@GetMapping("/api/v1/reminder")
	public ResponseEntity<?> getAllReminders(HttpServletRequest request) {
		log.info("getAllReminders : STARTED");
		HttpHeaders headers = new HttpHeaders();
		try {
				List<Reminder> reminders =reminderService.getAllReminders();
				if(reminders!=null)
				{
					return new ResponseEntity<List<Reminder>>(reminders, HttpStatus.OK);
				}
				
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
		}
		log.info("getAllReminders : ENDED");
		return new ResponseEntity<>(headers, HttpStatus.OK);
	}
}
