/**
 * AWS User Group Mississauga - PRODUCTION VERSION for Real Volunteer Emails
 * This version sends welcome emails to all volunteers from Google Form responses
 */

// SEND TO ALL VOLUNTEERS NOW - Run this function to email all volunteers immediately
function sendEmailsToAllVolunteersNow() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  Logger.log("🚀 Starting to send emails to all volunteers...");
  Logger.log("Found " + (data.length - 1) + " volunteers to process");
  
  var successCount = 0;
  var errorCount = 0;
  
  // Skip header row, start from row 2
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    
    // Skip empty rows
    if (!row[1] || !row[2]) {
      Logger.log("⏭️ Skipping empty row " + (i + 1));
      continue;
    }
    
    var email = row[1].toString().trim(); // Email Address (Column B)
    var fullName = row[2].toString(); // Full Name (Column C)
    
    Logger.log("📧 Processing " + (i) + "/" + (data.length - 1) + ": " + fullName + " (" + email + ")");
    
    try {
      // Create event object like form submission
      var e = {
        values: row
      };
      
      sendWelcomeEmailWithImages(e);
      successCount++;
      Logger.log("✅ SUCCESS: Email sent to " + email);
      
      // Add delay to avoid Gmail rate limiting
      Utilities.sleep(3000); // 3 second delay between emails
      
    } catch (error) {
      errorCount++;
      Logger.log("❌ ERROR sending to " + email + ": " + error.message);
    }
  }
  
  Logger.log("🎉 BATCH COMPLETE!");
  Logger.log("✅ Successful: " + successCount + " emails");
  Logger.log("❌ Errors: " + errorCount + " emails");
  Logger.log("📧 Total processed: " + (successCount + errorCount) + " volunteers");
}

// Main function triggered by Google Form submissions
function sendWelcomeEmailWithImages(e) {
  // Check if event object exists and has values
  if (!e || !e.values || e.values.length < 3) {
    Logger.log("Error: No form data received. This function should be triggered by Google Form submissions.");
    Logger.log("Make sure the form trigger is set up correctly.");
    return;
  }

  var email = e.values[1].trim(); // Email Address from Column B
  var fullName = e.values[2]; // Full Name from Column C

  // Check if email and name are not empty
  if (!email || !fullName) {
    Logger.log("Error: Missing email or name data");
    Logger.log("Email: " + email + ", Name: " + fullName);
    return;
  }

  // Basic email format validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Logger.log("Invalid email format: " + email);
    sendErrorNotification(fullName, email, "Invalid email format.");
    return;
  }

  // Create recurring calendar event for bi-weekly meetings
  var calendarInvite = createRecurringCalendarEvent(fullName, email);

  var subject = "Welcome to AWS User Group Mississauga - Community Volunteer Program!";
  
  // Plain text version
  var textBody = "Hi " + fullName + ",\n\n" +
                 "Welcome to the AWS User Group Mississauga Community Volunteer Program! 🎉\n\n" +
                 "Thank you for signing up to be a community volunteer! We're thrilled to have you join our team of AWS enthusiasts and help us build an amazing community.\n\n" +
                 "📅 BI-WEEKLY VOLUNTEER MEETINGS\n" +
                 "You have been automatically invited to our bi-weekly Saturday meetings at 10:00 AM EST.\n" +
                 "Meeting Link: https://meet.google.com/xqc-ajfi-kqv\n\n" +
                 "🤝 What to expect as a volunteer:\n" +
                 "• Help organize meetups and workshops\n" +
                 "• Connect with fellow AWS professionals\n" +
                 "• Share your AWS knowledge and experiences\n" +
                 "• Contribute to community growth initiatives\n" +
                 "• Network with industry experts\n\n" +
                 "📱 IMPORTANT: Help us grow our community!\n" +
                 "Please share ALL our LinkedIn posts to your social media networks. Every single post from our LinkedIn page helps us reach more AWS enthusiasts and grow our community. Your shares make a huge difference!\n\n" +
                 "🔗 Stay connected with us:\n" +
                 "👉 Join our events on Meetup: https://www.meetup.com/mississauga-linux-meetup-group\n" +
                 "💼 Follow us on LinkedIn: https://www.linkedin.com/company/awsug-mississauga\n" +
                 "🌐 Visit our website: https://meetupscloud.org/\n\n" +
                 "📋 Next Steps:\n" +
                 "1. Check your calendar - bi-weekly meetings have been added\n" +
                 "2. Use this meeting link for ALL meetings: https://meet.google.com/xqc-ajfi-kqv\n" +
                 "3. Join the next meeting at 10 AM EST\n" +
                 "4. Introduce yourself to the volunteer team\n" +
                 "5. Follow our LinkedIn page and start sharing our posts\n" +
                 "6. Let us know how you'd like to contribute!\n\n" +
                 "We look forward to working with you and building an amazing AWS community together!\n\n" +
                 "Best regards,\n" +
                 "AWS User Group Mississauga\n" +
                 "Community Organizing Team\n" +
                 "awsusergroup.mississauga@gmail.com";

  // HTML version with single Meet link emphasis
  var htmlBody = 
    '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">' +
      '<div style="background-color: #232F3E; color: white; padding: 20px; text-align: center;">' +
        '<h1 style="margin: 0;">Welcome to AWS User Group Mississauga!</h1>' +
        '<h2 style="margin: 10px 0 0 0; font-weight: normal;">Community Volunteer Program</h2>' +
      '</div>' +
      
      '<div style="padding: 20px; background-color: #f9f9f9;">' +
        '<p>Hi <strong>' + fullName + '</strong>,</p>' +
        
        '<p>Welcome to the AWS User Group Mississauga Community Volunteer Program! 🎉</p>' +
        
        '<p>Thank you for signing up to be a community volunteer! We\'re thrilled to have you join our team of AWS enthusiasts and help us build an amazing community.</p>' +
        
        '<div style="background-color: #28a745; color: white; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center;">' +
          '<h3 style="margin: 0;">📅 BI-WEEKLY VOLUNTEER MEETINGS</h3>' +
          '<p style="margin: 10px 0 0 0;"><strong>Every Other Saturday at 10:00 AM EST</strong></p>' +
          '<p style="margin: 5px 0 0 0;">✅ Calendar invite sent to your email</p>' +
        '</div>' +
        
        '<div style="background-color: #FF9900; color: white; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center;">' +
          '<h3 style="margin: 0;">🎥 MEETING LINK FOR ALL SESSIONS</h3>' +
          '<p style="margin: 10px 0 5px 0; font-size: 18px;"><strong>https://meet.google.com/xqc-ajfi-kqv</strong></p>' +
          '<p style="margin: 0; font-size: 14px;">Save this link - use it for every bi-weekly meeting!</p>' +
        '</div>' +
        
        '<h3>🤝 What to expect as a volunteer:</h3>' +
        '<ul>' +
          '<li>Help organize meetups and workshops</li>' +
          '<li>Connect with fellow AWS professionals</li>' +
          '<li>Share your AWS knowledge and experiences</li>' +
          '<li>Contribute to community growth initiatives</li>' +
          '<li>Network with industry experts</li>' +
        '</ul>' +
        
        '<div style="background-color: #e8f4fd; border-left: 4px solid #0073bb; padding: 15px; margin: 20px 0;">' +
          '<h3 style="margin: 0 0 10px 0;">📱 IMPORTANT: Help us grow our community!</h3>' +
          '<p style="margin: 0;"><strong>Please share ALL our LinkedIn posts to your social media networks.</strong> Every single post from our LinkedIn page helps us reach more AWS enthusiasts and grow our community. Your shares make a huge difference!</p>' +
        '</div>' +
        
        '<h3>🔗 Stay connected with us:</h3>' +
        '<div style="margin: 15px 0;">' +
          '<p style="margin: 5px 0;">👉 <a href="https://www.meetup.com/mississauga-linux-meetup-group" target="_blank" style="color: #0073bb; text-decoration: none;">Join our events on Meetup</a></p>' +
          '<p style="margin: 5px 0;">💼 <a href="https://www.linkedin.com/company/awsug-mississauga" target="_blank" style="color: #0073bb; text-decoration: none;">Follow us on LinkedIn</a></p>' +
          '<p style="margin: 5px 0;">🌐 <a href="https://meetupscloud.org/" target="_blank" style="color: #0073bb; text-decoration: none;">Visit our website</a></p>' +
        '</div>' +
        
        '<h3>📋 Next Steps:</h3>' +
        '<ol>' +
          '<li><strong>Check your calendar</strong> - bi-weekly meetings have been added</li>' +
          '<li><strong>Save this meeting link:</strong> https://meet.google.com/xqc-ajfi-kqv</li>' +
          '<li>Join the next meeting at <strong>10 AM EST</strong></li>' +
          '<li>Introduce yourself to the volunteer team</li>' +
          '<li><strong>Follow our LinkedIn page and start sharing our posts</strong></li>' +
          '<li>Let us know how you\'d like to contribute!</li>' +
        '</ol>' +
        
        '<p>We look forward to working with you and building an amazing AWS community together!</p>' +
        
        '<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">' +
          '<p><strong>Best regards,</strong><br>' +
          'AWS User Group Mississauga<br>' +
          'Community Organizing Team<br>' +
          '<a href="mailto:awsusergroup.mississauga@gmail.com" style="color: #0073bb;">awsusergroup.mississauga@gmail.com</a></p>' +
        '</div>' +
      '</div>' +
      
      '<div style="background-color: #232F3E; color: #cccccc; padding: 15px; text-align: center; font-size: 12px;">' +
        '<p style="margin: 0;">AWS User Group Mississauga | Building the AWS Community Together</p>' +
      '</div>' +
    '</div>';

  try {
    // Try to get the image, but continue even if it fails
    var attachments = [];
    try {
      var image = DriveApp.getFileById("1k5ufK8Wa4LK0LWC5SxeoBqeSyxU2_CLF");
      attachments = [image.getAs(MimeType.PNG)];
    } catch (imageError) {
      Logger.log("Could not attach image: " + imageError.message);
      // Continue without image
    }

    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: textBody,
      htmlBody: htmlBody,
      attachments: attachments
    });

    Logger.log("Welcome email successfully sent to: " + email);
    
    // Send confirmation to admin
    sendAdminNotification(fullName, email);
    
  } catch (error) {
    Logger.log("Failed to send email to: " + email + " — " + error.message);
    sendErrorNotification(fullName, email, error.message);
  }
}

function createRecurringCalendarEvent(fullName, email) {
  try {
    // Get the default calendar
    var calendar = CalendarApp.getDefaultCalendar();
    
    // Create start date for next Saturday at 10 AM EST
    var startDate = getNextSaturday();
    startDate.setHours(10, 0, 0, 0); // 10:00 AM
    
    // Create end date (1 hour meeting)
    var endDate = new Date(startDate.getTime() + (60 * 60 * 1000));
    
    // Create recurring event series with NO Google Meet integration (bi-weekly)
    var eventSeries = calendar.createEventSeries(
      'AWS UG Mississauga - Community Volunteer Meeting',
      startDate,
      endDate,
      CalendarApp.newRecurrence().addWeeklyRule().interval(2).times(13), // Every 2 weeks, 13 times = 6 months
      {
        description: 'Bi-weekly community volunteer coordination meeting for AWS User Group Mississauga.\n\n' +
                    '🎥 JOIN THE MEETING:\n' +
                    'https://meet.google.com/xqc-ajfi-kqv\n\n' +
                    'IMPORTANT: Use the link above to join all meetings.\n' +
                    'Ignore any other meeting links that may appear.\n\n' +
                    'Meeting Agenda:\n' +
                    '• Plan upcoming events and workshops\n' +
                    '• Coordinate community initiatives\n' +
                    '• Connect with fellow volunteers\n' +
                    '• Share ideas and feedback\n\n' +
                    'Contact: awsusergroup.mississauga@gmail.com',
        location: 'Virtual Meeting (link in description)',
        guests: email,
        sendInvites: true
      }
    );
    
    Logger.log("Calendar event created successfully for: " + email);
    return null; // Calendar invite is sent automatically via sendInvites: true
    
  } catch (error) {
    Logger.log("Failed to create calendar event: " + error.message);
    return null;
  }
}

function getNextSaturday() {
  var today = new Date();
  var dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
  var daysUntilSaturday = (6 - dayOfWeek) % 7;
  
  // If today is Saturday, get next Saturday
  if (daysUntilSaturday === 0) {
    daysUntilSaturday = 7;
  }
  
  var nextSaturday = new Date(today.getTime() + (daysUntilSaturday * 24 * 60 * 60 * 1000));
  return nextSaturday;
}

function sendErrorNotification(name, email, errorMsg) {
  var adminEmail = "awsusergroup.mississauga@gmail.com";
  var subject = "Email/Calendar Sending Failed for New Community Volunteer";
  var body = "Failed to send welcome email or calendar invite to new community volunteer.\n\n" +
             "Name: " + name + "\n" +
             "Email: " + email + "\n" +
             "Error: " + errorMsg + "\n\n" +
             "Please follow up manually with this volunteer.";

  try {
    MailApp.sendEmail(adminEmail, subject, body);
  } catch (adminError) {
    Logger.log("Could not send admin notification: " + adminError.message);
  }
}

function sendAdminNotification(name, email) {
  var adminEmail = "awsusergroup.mississauga@gmail.com";
  var subject = "Welcome Email Sent to New Community Volunteer";
  var body = "Welcome email successfully sent to new community volunteer:\n\n" +
             "Name: " + name + "\n" +
             "Email: " + email + "\n\n" +
             "✅ Email sent with single Meet link: https://meet.google.com/xqc-ajfi-kqv\n" +
             "✅ Calendar invite sent for bi-weekly meetings\n" +
             "✅ LinkedIn sharing request included\n" +
             "✅ All community links provided";

  try {
    MailApp.sendEmail(adminEmail, subject, body);
  } catch (adminError) {
    Logger.log("Could not send admin notification: " + adminError.message);
  }
}

// Function to manually send emails to existing form responses (if needed)
function sendWelcomeEmailsToExistingResponses() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  // Skip header row, start from row 2
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    
    // Check if email was already sent (Column G = index 6 for "Email Sent" status)
    var emailSentColumn = 6; // Column G for tracking sent status
    if (row[emailSentColumn] === "SENT") {
      continue; // Skip if already sent
    }
    
    // Create event object similar to form submission
    var e = {
      values: row
    };
    
    try {
      sendWelcomeEmailWithImages(e);
      
      // Mark as sent in Column G
      sheet.getRange(i + 1, emailSentColumn + 1).setValue("SENT");
      
      // Add delay to avoid rate limiting
      Utilities.sleep(2000);
      
    } catch (error) {
      Logger.log("Error processing row " + (i + 1) + ": " + error.message);
      sheet.getRange(i + 1, emailSentColumn + 1).setValue("ERROR");
    }
  }
  
  Logger.log("Batch email sending completed");
}
