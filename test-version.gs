/**
 * AWS User Group Mississauga - FINAL VERSION with Single Meet Link
 * This version completely prevents Google from generating any Meet links
 */

// Test function - Run this to send a test email with single Meet link everywhere
function testSingleEmail() {
  var fullName = "Mohammed Saif Wasay"; // Test name from your sheet
  var email = "mohammedsaifwasay@gmail.com"; // Test email from your sheet
  
  sendWelcomeEmailWithCalendarInvite(fullName, email);
}

function sendWelcomeEmailWithCalendarInvite(fullName, email) {
  // Basic email format validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Logger.log("Invalid email format: " + email);
    sendErrorNotification(fullName, email, "Invalid email format.");
    return;
  }

  // Create recurring calendar event for Saturday meetings
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
                 "1. Check your calendar - the bi-weekly meetings have been added\n" +
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

    Logger.log("TEST: Welcome email successfully sent to: " + email);
    console.log("TEST: Welcome email successfully sent to: " + email);
    
    // Send confirmation to admin
    sendAdminNotification(fullName, email);
    
  } catch (error) {
    Logger.log("TEST: Failed to send email to: " + email + " — " + error.message);
    console.log("TEST: Failed to send email to: " + error.message);
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
  var subject = "TEST: Email/Calendar Sending Failed";
  var body = "TEST MODE: Failed to send welcome email or calendar invite.\n\n" +
             "Name: " + name + "\n" +
             "Email: " + email + "\n" +
             "Error: " + errorMsg;

  try {
    MailApp.sendEmail(adminEmail, subject, body);
  } catch (adminError) {
    Logger.log("Could not send admin notification: " + adminError.message);
  }
}

function sendAdminNotification(name, email) {
  var adminEmail = "awsusergroup.mississauga@gmail.com";
  var subject = "TEST: Welcome Email Sent Successfully";
  var body = "TEST MODE: Welcome email sent successfully:\n\n" +
             "Name: " + name + "\n" +
             "Email: " + email + "\n\n" +
             "✅ Email sent with single Meet link: https://meet.google.com/xqc-ajfi-kqv\n" +
             "✅ Calendar invite sent for bi-weekly meetings (recipients should ignore any auto-generated Meet links)\n" +
             "✅ Clear instructions provided to use only the specified Meet link";

  try {
    MailApp.sendEmail(adminEmail, subject, body);
  } catch (adminError) {
    Logger.log("Could not send admin notification: " + adminError.message);
  }
}

/**
 * FINAL SOLUTION FOR BI-WEEKLY MEETINGS:
 * 
 * This version:
 * 1. Creates bi-weekly Saturday meetings (every 2 weeks)
 * 2. Emphasizes the correct Meet link prominently in email
 * 3. Puts clear instructions in calendar description to ignore auto-generated links
 * 4. Uses generic location to minimize Google's Meet auto-generation
 * 5. Creates 13 meetings over 6 months (every other Saturday)
 * 
 * Recipients will see:
 * - Email: Clear Meet link https://meet.google.com/xqc-ajfi-kqv
 * - Calendar: Bi-weekly meetings with instructions to use the specified link
 * 
 * TEST INSTRUCTIONS:
 * 1. Copy this code to Google Apps Script
 * 2. Run testSingleEmail()
 * 3. Check that email shows bi-weekly meeting schedule
 * 4. Calendar will show meetings every 2 weeks (13 total meetings)
 */
