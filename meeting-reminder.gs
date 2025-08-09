/**
 * AWS User Group Mississauga - Meeting Reminder Script
 * Simple script to send meeting reminders to all volunteers
 */

// SEND MEETING REMINDER - Run this function to send reminder to all volunteers
function sendMeetingReminderToAll() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  Logger.log("📧 Starting to send meeting reminders...");
  Logger.log("Found " + (data.length - 1) + " volunteers to remind");
  
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
    
    Logger.log("📧 Sending reminder " + (i) + "/" + (data.length - 1) + ": " + fullName + " (" + email + ")");
    
    try {
      sendMeetingReminder(email, fullName);
      successCount++;
      Logger.log("✅ SUCCESS: Reminder sent to " + email);
      
      // Add delay to avoid Gmail rate limiting
      Utilities.sleep(2000); // 2 second delay between emails
      
    } catch (error) {
      errorCount++;
      Logger.log("❌ ERROR sending to " + email + ": " + error.message);
    }
  }
  
  Logger.log("🎉 REMINDER BATCH COMPLETE!");
  Logger.log("✅ Successful: " + successCount + " reminders");
  Logger.log("❌ Errors: " + errorCount + " reminders");
  Logger.log("📧 Total processed: " + (successCount + errorCount) + " volunteers");
}

// Function to send individual meeting reminder
function sendMeetingReminder(email, fullName) {
  // Basic email format validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Logger.log("Invalid email format: " + email);
    return;
  }

  var subject = "Soft Reminder: AWS UG Mississauga - Community Volunteer Meeting Tomorrow";
  
  // Plain text version
  var textBody = "Hi " + fullName + ",\n\n" +
                 "This is a soft reminder for our upcoming community volunteer meeting.\n\n" +
                 "📅 BI-WEEKLY VOLUNTEER MEETINGS\n" +
                 "Aug 9, 2025 Saturday at 10:00 AM EST\n\n" +
                 "✅ Calendar invite sent to your email\n\n" +
                 "🎥 MEETING LINK\n" +
                 "https://meet.google.com/xqc-ajfi-kqv\n\n" +
                 "Looking forward to seeing you there!\n\n" +
                 "Best regards,\n" +
                 "AWS User Group Mississauga\n" +
                 "Community Organizing Team\n" +
                 "awsusergroup.mississauga@gmail.com";

  // HTML version
  var htmlBody = 
    '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">' +
      '<div style="background-color: #232F3E; color: white; padding: 20px; text-align: center;">' +
        '<h1 style="margin: 0;">AWS User Group Mississauga</h1>' +
        '<h2 style="margin: 10px 0 0 0; font-weight: normal;">Meeting Reminder</h2>' +
      '</div>' +
      
      '<div style="padding: 20px; background-color: #f9f9f9;">' +
        '<p>Hi <strong>' + fullName + '</strong>,</p>' +
        
        '<p>This is a soft reminder for our upcoming community volunteer meeting.</p>' +
        
        '<div style="background-color: #28a745; color: white; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center;">' +
          '<h3 style="margin: 0;">📅 BI-WEEKLY VOLUNTEER MEETINGS</h3>' +
          '<p style="margin: 10px 0 0 0; font-size: 18px;"><strong>Aug 9, 2025 Saturday at 10:00 AM EST</strong></p>' +
          '<p style="margin: 5px 0 0 0;">✅ Calendar invite sent to your email</p>' +
        '</div>' +
        
        '<div style="background-color: #FF9900; color: white; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center;">' +
          '<h3 style="margin: 0;">🎥 MEETING LINK</h3>' +
          '<p style="margin: 10px 0 0 0; font-size: 18px;"><strong>https://meet.google.com/xqc-ajfi-kqv</strong></p>' +
        '</div>' +
        
        '<p>Looking forward to seeing you there!</p>' +
        
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

    Logger.log("Meeting reminder sent to: " + email);
    
    // Send confirmation to admin
    sendAdminNotification(fullName, email);
    
  } catch (error) {
    Logger.log("Failed to send reminder to: " + email + " — " + error.message);
    throw error;
  }
}

function sendAdminNotification(name, email) {
  var adminEmail = "awsusergroup.mississauga@gmail.com";
  var subject = "Meeting Reminder Sent to Community Volunteer";
  var body = "Meeting reminder successfully sent to community volunteer:\n\n" +
             "Name: " + name + "\n" +
             "Email: " + email + "\n\n" +
             "✅ Reminder sent for Aug 9, 2025 meeting\n" +
             "✅ Meeting link included: https://meet.google.com/xqc-ajfi-kqv\n" +
             "✅ AWS branding applied";

  try {
    MailApp.sendEmail(adminEmail, subject, body);
  } catch (adminError) {
    Logger.log("Could not send admin notification: " + adminError.message);
  }
}

/**
 * MEETING REMINDER SETUP INSTRUCTIONS:
 * 
 * 1. MANUAL SEND:
 *    - Run sendMeetingReminderToAll() function
 *    - This will send reminders to all volunteers in your sheet
 * 
 * 2. FEATURES:
 *    - Simple meeting reminder email
 *    - Meeting date: Aug 9, 2025 Saturday 10:00 AM EST
 *    - Google Meet link: https://meet.google.com/xqc-ajfi-kqv
 *    - Professional AWS branding
 *    - Admin notifications
 * 
 * 3. MONITORING:
 *    - Check awsusergroup.mississauga@gmail.com for admin notifications
 *    - Monitor Google Apps Script logs for any errors
 * 
 * NOTE: This script reads from the same Google Sheet as your production file.
 * Column B = Email Address, Column C = Full Name
 */
