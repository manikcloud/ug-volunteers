/**
 * AWS User Group Mississauga - Simple Meeting Reminder
 * Basic reminder for today's volunteer meeting
 */

// SEND TODAY'S MEETING REMINDER - Run this function
function sendTodaysMeetingReminder() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  Logger.log("📧 Sending today's meeting reminders...");
  
  // Skip header row, start from row 2
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    
    if (!row[1] || !row[2]) continue; // Skip empty rows
    
    var email = row[1].toString().trim(); // Email Address (Column B)
    var fullName = row[2].toString(); // Full Name (Column C)
    
    Logger.log("📧 Sending to: " + fullName + " (" + email + ")");
    
    try {
      sendSimpleReminder(email, fullName);
      Logger.log("✅ Sent to " + email);
      Utilities.sleep(2000); // 2 second delay
    } catch (error) {
      Logger.log("❌ Error: " + email + " - " + error.message);
    }
  }
  
  Logger.log("🎉 All reminders sent!");
}

function sendSimpleReminder(email, fullName) {
  var subject = "Reminder: AWS UG Mississauga Meeting Today - 10:00 AM EST";
  
  var textBody = "Hi " + fullName + ",\n\n" +
                 "Quick reminder - we have our volunteer meeting today!\n\n" +
                 "📅 TODAY - Saturday at 10:00 AM EST\n\n" +
                 "🎥 MEETING LINK:\n" +
                 "https://meet.google.com/xqc-ajfi-kqv\n\n" +
                 "See you there!\n\n" +
                 "AWS User Group Mississauga Team";

  var htmlBody = 
    '<div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">' +
      '<div style="background-color: #232F3E; color: white; padding: 15px; text-align: center;">' +
        '<h2 style="margin: 0;">Meeting Reminder</h2>' +
      '</div>' +
      
      '<div style="padding: 20px; background-color: #f9f9f9;">' +
        '<p>Hi <strong>' + fullName + '</strong>,</p>' +
        '<p>Quick reminder - we have our volunteer meeting today!</p>' +
        
        '<div style="background-color: #28a745; color: white; padding: 15px; border-radius: 5px; text-align: center; margin: 15px 0;">' +
          '<h3 style="margin: 0;">📅 TODAY - Saturday at 10:00 AM EST</h3>' +
        '</div>' +
        
        '<div style="background-color: #FF9900; color: white; padding: 15px; border-radius: 5px; text-align: center; margin: 15px 0;">' +
          '<h3 style="margin: 0;">🎥 MEETING LINK</h3>' +
          '<p style="margin: 5px 0 0 0; font-size: 16px;"><strong>https://meet.google.com/xqc-ajfi-kqv</strong></p>' +
        '</div>' +
        
        '<p>See you there!</p>' +
        '<p><strong>AWS User Group Mississauga Team</strong></p>' +
      '</div>' +
    '</div>';

  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: textBody,
    htmlBody: htmlBody
  });
}

/**
 * SIMPLE REMINDER INSTRUCTIONS:
 * 
 * 1. Run: sendTodaysMeetingReminder()
 * 2. That's it!
 * 
 * Features:
 * - Simple reminder for today's meeting
 * - No calendar invite mentions
 * - Just meeting link and time
 * - Clean and quick
 */
