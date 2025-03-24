package com.school_assignment_tracker.back_end.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendWelcomeEmail(String to) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("Welcome to School Assignment Tracker");

            String htmlContent = "<html>" + "<body style='font-family: Arial, sans-serif;'>"
                    + "<h2 style='color: #4CAF50;'>Welcome to School Assignment Tracker!</h2>" + "<p>Hello,</p>"
                    + "<p>We are excited to have you on board. Here are some resources to get you started:</p>" + "<ul>"
                    + "<li><a href='https://example.com/guide'>Getting Started Guide</a></li>"
                    + "<li><a href='https://example.com/support'>Support</a></li>" + "</ul>"
                    + "<p>Best regards,<br>The Team</p>" + "</body>" + "</html>";

            helper.setText(htmlContent, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            System.err.println("Failed to send welcome email: " + e.getMessage());
        }
    }
}