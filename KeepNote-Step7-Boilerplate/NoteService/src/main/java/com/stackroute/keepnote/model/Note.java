package com.stackroute.keepnote.model;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Note {

	/*
	 * This class should have eight fields
	 * (noteId,noteTitle,noteContent,noteStatus,createdAt,
	 * category,reminder,createdBy). This class should also contain the getters and
	 * setters for the fields along with the no-arg , parameterized constructor and
	 * toString method. The value of createdAt should not be accepted from the user
	 * but should be always initialized with the system date.
	 * 
	 */
	@Id
	private int id;
	private String noteTitle;
	private String noteDescription;
	private String noteStatus;
	private Date noteCreationDate;
	private String noteCreatedBy;
	private Color color;
	public void setColor(Color color) {
		this.color = color;
	}


	private Category category;
	private List<Reminder> reminders;


    public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getNoteTitle() {
		return noteTitle;
	}


	public void setNoteTitle(String noteTitle) {
		this.noteTitle = noteTitle;
	}


	public String getNoteDescription() {
		return noteDescription;
	}


	public void setNoteDescription(String noteDescription) {
		this.noteDescription = noteDescription;
	}


	public String getNoteStatus() {
		return noteStatus;
	}


	public void setNoteStatus(String noteStatus) {
		this.noteStatus = noteStatus;
	}


	public Date getNoteCreationDate() {
		return noteCreationDate;
	}


	public void setNoteCreationDate(Date noteCreationDate) {
		this.noteCreationDate = noteCreationDate;
	}


	public String getNoteCreatedBy() {
		return noteCreatedBy;
	}


	public void setNoteCreatedBy(String noteCreatedBy) {
		this.noteCreatedBy = noteCreatedBy;
	}


	public Color getColor() {
		return color;
	}


	@Override
	public String toString() {
		return "Note [id=" + id + ", noteTitle=" + noteTitle + ", noteDescription=" + noteDescription + ", noteStatus="
				+ noteStatus + ", noteCreationDate=" + noteCreationDate + ", noteCreatedBy=" + noteCreatedBy
				+ ", color=" + color + ", category=" + category + ", reminders=" + reminders + "]";
	}



	public Category getCategory() {
		return category;
	}


	public void setCategory(Category category) {
		this.category = category;
	}


	public List<Reminder> getReminders() {
		return reminders;
	}


	public void setReminders(List<Reminder> reminders) {
		this.reminders = reminders;
	}



}
