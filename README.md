# AWS User Group Mississauga - Community Volunteer Welcome Email System

This system automatically sends welcome emails to new community volunteers who sign up through your Google Form.

## Files
- `test-version.gs` - For testing with a single email address (varunmanik1@gmail.com)
- `production-version.gs` - For real deployment with Google Form integration
- `README.md` - This documentation file

## Features
- ✅ Bi-weekly Saturday meetings (13 meetings over 6 months)
- ✅ Single Google Meet link (https://meet.google.com/xqc-ajfi-kqv)
- ✅ Automatic calendar invites (prevents Google auto-generation issues)
- ✅ LinkedIn sharing request prominently featured
- ✅ Professional AWS branding
- ✅ Error handling and admin notifications
- ✅ Email validation
- ✅ Image attachment support
- ✅ Batch processing for existing responses

## Quick Start

### For Testing:
1. Copy code from `test-version.gs` to Google Apps Script
2. Run `testSingleEmail()` function
3. Check varunmanik1@gmail.com for test email
4. Verify calendar invite and Meet link work correctly

### For Production:
1. Copy code from `production-version.gs` to Google Apps Script
2. Set up Google Form trigger (see setup instructions below)
3. Optionally run batch function for existing responses

## Setup Instructions

### 1. Create Google Apps Script Project
1. Go to https://script.google.com/home
2. Click "New Project"
3. Replace default code with content from appropriate .gs file

### 2. Configure for Production
1. **Set Up Form Trigger**:
   - Go to Triggers in Google Apps Script
   - Click "+ Add Trigger"
   - Function: `sendWelcomeEmailWithImages`
   - Event source: "From form"
   - Event type: "On form submit"
   - Save and authorize permissions

2. **Send to Existing Volunteers** (Optional):
   - Add "Email Sent" column to your Google Sheet (column E)
   - Run `sendWelcomeEmailsToExistingResponses()` function
   - Script processes all existing responses
   - Marks each as "SENT" to avoid duplicates

### 3. Form Structure Expected
The script expects Google Form responses in this order:
- Column A: Timestamp
- Column B: Full Name
- Column C: Email Address
- Column D: (Other form fields)
- Column E: Email Sent Status (for tracking)

## Email Content Includes
- Welcome message for community volunteer program
- Bi-weekly Saturday meeting details (10 AM EST)
- Google Meet link: https://meet.google.com/xqc-ajfi-kqv
- LinkedIn sharing request (share ALL posts)
- Links to Meetup, LinkedIn, and website
- Next steps for new volunteers
- Professional AWS branding

## Meeting Schedule
- **Frequency**: Every other Saturday (bi-weekly)
- **Time**: 10:00 AM - 11:00 AM EST
- **Duration**: 6 months (13 total meetings)
- **Platform**: Google Meet
- **Link**: https://meet.google.com/xqc-ajfi-kqv

## Admin Notifications
- Success confirmations sent to `awsusergroup.mississauga@gmail.com`
- Error notifications with volunteer details
- Processing logs available in Google Apps Script

## Troubleshooting

### Common Issues:
1. **Multiple Meet Links**: Script prevents Google from auto-generating Meet links
2. **Email Validation**: Invalid emails are logged and reported to admin
3. **Image Attachment**: Script continues if image fails to load
4. **Rate Limiting**: Batch processing includes delays to avoid Gmail limits

### Monitoring:
- Check admin email for notifications
- Monitor Google Apps Script execution logs
- Track "Email Sent" column in spreadsheet

## Customization
You can modify:
- Email subject and body content
- Meeting time and frequency
- Admin email addresses
- Image attachments
- Form column mappings

## Support
For issues or questions, contact the AWS User Group Mississauga organizing team at `awsusergroup.mississauga@gmail.com`.
