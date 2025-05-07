package com.codewithus.ledgerbridge.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;
    public void sendOtpEmail(String to, String name, String otp) throws MessagingException {
        MimeMessage msg = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(msg, true, "UTF-8");

        String html = String.format("""
          <!DOCTYPE html><html>
          <head><style>
            body { background:#000; font-family:Arial,sans-serif;
                   display:flex; justify-content:center; align-items:center;
                   height:100vh; margin:0; }
            .container { background:#ffeb3b; padding:20px; border-radius:8px;
                         text-align:center; color:#000; }
            .otp { font-size:36px; font-weight:bold; }
          </style></head>
          <body><div class="container">
            <h1>OTP Verification</h1>
            <p>Hello %s, your One-Time Password is:</p>
            <p class="otp">%s</p>
          </div></body></html>
          """, name, otp);

        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject("LedgerBridge – OTP Verification");
        helper.setText(html, true);

        mailSender.send(msg);
    }
}
