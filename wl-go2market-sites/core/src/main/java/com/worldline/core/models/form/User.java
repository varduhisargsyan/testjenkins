package com.worldline.core.models.form;

/**
 * Created by varduhis on 5/8/2017.
 */
/*
POJO to populate the NewsLetterLandingForm
 */
public class User {
    private String firstName;
    private String lastName;
    private String job;
    private String email;
    private String country;
    private String company;

    public User(String firstName, String lastName, String job, String email, String country, String company) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.job = job;
        this.email = email;
        this.country = country;
        this.company = company;
    }

    public User() {
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    @Override
    public String toString() {
        return "User{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", job='" + job + '\'' +
                ", email='" + email + '\'' +
                ", country='" + country + '\'' +
                ", company='" + company + '\'' +
                '}';
    }
}
