package com.stackroute.keepnote.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.keepnote.exception.UserAlreadyExistsException;
import com.stackroute.keepnote.exception.UserIdAndPasswordMismatchException;
import com.stackroute.keepnote.exception.UserNotFoundException;
import com.stackroute.keepnote.exception.UserNullException;
import com.stackroute.keepnote.jwt.SecurityTokenGenrator;
import com.stackroute.keepnote.model.User;
import com.stackroute.keepnote.service.UserAuthenticationService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/*
 * As in this assignment, we are working on creating RESTful web service, hence annotate
 * the class with @RestController annotation. A class annotated with the @Controller annotation
 * has handler methods which return a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */
@RestController
@RequestMapping("/api/v1/auth")
public class UserAuthenticationController {

	private UserAuthenticationService authicationService;
	/*
	 * Autowiring should be implemented for the UserAuthenticationService. (Use
	 * Constructor-based autowiring) Please note that we should not create an
	 * object using the new keyword
	 */

	@Autowired
	public UserAuthenticationController(UserAuthenticationService authicationService) {
		this.authicationService = authicationService;
	}

	/*
	 * Define a handler method which will create a specific user by reading the
	 * Serialized object from request body and save the user details in the
	 * database. This handler method should return any one of the status
	 * messages basis on different situations: 1. 201(CREATED) - If the user
	 * created successfully. 2. 409(CONFLICT) - If the userId conflicts with any
	 * existing user
	 * 
	 * This handler method should map to the URL "/api/v1/auth/register" using
	 * HTTP POST method
	 */

	@PostMapping("/register")
	public ResponseEntity registerUser(@RequestBody User user) {

		ResponseEntity responseEntity = null;

		try {

			authicationService.saveUser(user);
			responseEntity = new ResponseEntity<String>("User registered successfully", HttpStatus.CREATED);

		} catch (UserAlreadyExistsException exception) {
			responseEntity = new ResponseEntity<String>("{ \"message\": \"" + exception.getMessage() + "\"}",
					HttpStatus.CONFLICT);
		}

		return responseEntity;

	}

	/*
	 * Define a handler method which will authenticate a user by reading the
	 * Serialized user object from request body containing the username and
	 * password. The username and password should be validated before proceeding
	 * ahead with JWT token generation. The user credentials will be validated
	 * against the database entries. The error should be return if validation is
	 * not successful. If credentials are validated successfully, then JWT token
	 * will be generated. The token should be returned back to the caller along
	 * with the API response. This handler method should return any one of the
	 * status messages basis on different situations: 1. 200(OK) - If login is
	 * successful 2. 401(UNAUTHORIZED) - If login is not successful
	 * 
	 * This handler method should map to the URL "/api/v1/auth/login" using HTTP
	 * POST method
	 */

	@PostMapping("/login")
	public ResponseEntity loginUser(@RequestBody User loginDetails) {

		try {

			String userId = loginDetails.getUserId();
			String password = loginDetails.getUserPassword();

			if (userId == null || password == null) {
				throw new UserNullException("Userid and Password cannot be empty");
			}

			User user = authicationService.findByUserIdAndPassword(userId, password);

			if (user == null) {
				throw new UserNotFoundException("User with given Id does not exists");
			}

			String fetchedPassword = user.getUserPassword();
			if (!password.equals(fetchedPassword)) {
				throw new UserIdAndPasswordMismatchException(
						"Invalid login credential, Please check username and password ");
			}

			// generating token
			SecurityTokenGenrator securityTokenGenrator = (User userDetails) -> {

				String jwtToken = "";
				jwtToken = Jwts.builder().setId(user.getUserId()).setSubject(user.getUserRole()).setIssuedAt(new Date())
						.signWith(SignatureAlgorithm.HS256, "secretkey").compact();

				Map<String, String> map1 = new HashMap<>();
				map1.put("token", jwtToken);
				map1.put("message", "User successfully logged in");
				return map1;
			};

			Map<String, String> map = securityTokenGenrator.generateToken(user);

			return new ResponseEntity<>(map, HttpStatus.OK);

		} catch (UserNullException | UserNotFoundException | UserIdAndPasswordMismatchException exception) {

			return new ResponseEntity<>("{ \"message\": \"" + exception.getMessage() + "\"}", HttpStatus.UNAUTHORIZED);
		}

	}

	// Generate JWT token
	public String getToken(String username, String password) throws Exception {

		return null;

	}

}
