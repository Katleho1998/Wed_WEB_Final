/*
  # RSVP Email Confirmation Function

  1. Purpose
    - Sends confirmation emails to guests who submit RSVPs
    - Handles both attending and non-attending responses
    - Provides personalized email content based on RSVP details

  2. Functionality
    - Receives RSVP data from the frontend
    - Formats email content with guest details
    - Sends confirmation email using Resend email service
    - Returns success/error status to the frontend

  3. Security
    - CORS headers configured for frontend access
    - Input validation for required fields
    - Error handling for email delivery failures
*/

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface RSVPEmailData {
  email: string;
  name: string;
  attending: boolean;
  partnerName?: string;
  message?: string;
}

serve(async (req: Request) => {
  try {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse request body
    const body: RSVPEmailData = await req.json();
    
    // Validate required fields
    if (!body.email || !body.name) {
      return new Response(
        JSON.stringify({ error: "Email and name are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create email content based on attendance
    const guestCount = body.partnerName ? 2 : 1;
    const guestNames = body.partnerName ? `${body.name} and ${body.partnerName}` : body.name;
    
    let emailSubject: string;
    let emailContent: string;

    if (body.attending) {
      emailSubject = "RSVP Confirmed - We Can't Wait to Celebrate with You! 💕";
      emailContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>RSVP Confirmation</title>
        </head>
        <body style="margin: 0; padding: 20px; font-family: Georgia, serif; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header with floral design -->
            <div style="background: linear-gradient(135deg, #f4a5a5 0%, #b6c4a2 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 32px; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                Thank You for Your RSVP!
              </h1>
              <div style="width: 60px; height: 2px; background-color: #ffffff; margin: 15px auto; opacity: 0.8;"></div>
            </div>
            
            <!-- Main content -->
            <div style="padding: 40px 30px;">
              <p style="color: #374151; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
                Dear ${guestNames},
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                We're absolutely thrilled that you'll be joining us on our special day! Your presence will make our celebration even more meaningful and joyful.
              </p>
              
              <!-- RSVP Details Box -->
              <div style="background-color: #f9fafb; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 4px solid #f4a5a5;">
                <h3 style="color: #6b7280; margin-top: 0; margin-bottom: 15px; font-size: 18px;">RSVP Confirmation Details:</h3>
                <p style="color: #374151; margin: 8px 0; font-size: 15px;"><strong>Guest(s):</strong> ${guestNames}</p>
                <p style="color: #374151; margin: 8px 0; font-size: 15px;"><strong>Party Size:</strong> ${guestCount} ${guestCount === 1 ? 'person' : 'people'}</p>
                <p style="color: #374151; margin: 8px 0; font-size: 15px;"><strong>Status:</strong> <span style="color: #059669; font-weight: bold;">Attending ✓</span></p>
                ${body.message ? `<p style="color: #374151; margin: 8px 0; font-size: 15px;"><strong>Your Message:</strong> "${body.message}"</p>` : ''}
              </div>
              
              <!-- Wedding Details -->
              <div style="background: linear-gradient(135deg, #f0f9ff 0%, #fef3f2 100%); padding: 25px; border-radius: 12px; margin: 25px 0;">
                <h3 style="color: #374151; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Wedding Details Reminder:</h3>
                <div style="margin-bottom: 15px;">
                  <p style="color: #374151; margin: 5px 0; font-size: 15px; font-weight: bold;">Saturday, September 27th, 2025</p>
                  <p style="color: #6b7280; margin: 5px 0; font-size: 14px;">• Matrimony: 10:00 AM at Allen Temple, 188 Ingedezi Street, Zone 7, Meadowlands</p>
                  <p style="color: #6b7280; margin: 5px 0; font-size: 14px;">• Reception: 12:30 PM at 12278, Zone 9, Meadowlands</p>
                </div>
                <div>
                  <p style="color: #374151; margin: 5px 0; font-size: 15px; font-weight: bold;">Sunday, September 28th, 2025</p>
                  <p style="color: #6b7280; margin: 5px 0; font-size: 14px;">• Celebration continues: 12:30 PM at Molapo Park</p>
                </div>
                <p style="color: #7c3aed; margin: 15px 0 5px 0; font-size: 14px; font-weight: bold;">Theme: Shades of Blue and Brown</p>
              </div>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                We'll be sending out more details about parking, directions, and other important information as we get closer to the date. Keep an eye on your inbox!
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                If you have any questions or need to make changes to your RSVP, please don't hesitate to reach out to us directly.
              </p>
              
              <!-- Footer -->
              <div style="text-align: center; margin-top: 40px; padding-top: 25px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 20px; font-style: italic; margin-bottom: 10px;">
                  With love and excitement,
                </p>
                <p style="color: #374151; font-size: 24px; font-weight: bold; margin: 0;">
                  Thabi & Trevor
                </p>
                <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
                  This email was sent because you RSVP'd for our wedding. We can't wait to celebrate with you!
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      emailSubject = "Thank You for Your RSVP Response 💕";
      emailContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>RSVP Response</title>
        </head>
        <body style="margin: 0; padding: 20px; font-family: Georgia, serif; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 32px; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                Thank You for Your Response
              </h1>
              <div style="width: 60px; height: 2px; background-color: #ffffff; margin: 15px auto; opacity: 0.8;"></div>
            </div>
            
            <!-- Main content -->
            <div style="padding: 40px 30px;">
              <p style="color: #374151; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
                Dear ${body.name},
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                Thank you for taking the time to respond to our wedding invitation. We completely understand that you won't be able to join us on our special day.
              </p>
              
              <!-- RSVP Details Box -->
              <div style="background-color: #f9fafb; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 4px solid #9ca3af;">
                <h3 style="color: #6b7280; margin-top: 0; margin-bottom: 15px; font-size: 18px;">RSVP Response Details:</h3>
                <p style="color: #374151; margin: 8px 0; font-size: 15px;"><strong>Guest:</strong> ${body.name}</p>
                <p style="color: #374151; margin: 8px 0; font-size: 15px;"><strong>Status:</strong> <span style="color: #dc2626;">Unable to attend</span></p>
                ${body.message ? `<p style="color: #374151; margin: 8px 0; font-size: 15px;"><strong>Your Message:</strong> "${body.message}"</p>` : ''}
              </div>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                While we'll miss having you there to celebrate with us, we truly appreciate your thoughtful response. Your friendship means the world to us.
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                We hope to catch up with you soon after our big day and share some photos and stories from the celebration!
              </p>
              
              <!-- Footer -->
              <div style="text-align: center; margin-top: 40px; padding-top: 25px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 20px; font-style: italic; margin-bottom: 10px;">
                  With love and understanding,
                </p>
                <p style="color: #374151; font-size: 24px; font-weight: bold; margin: 0;">
                  Thabi & Trevor
                </p>
                <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
                  This email was sent because you responded to our wedding invitation. Thank you for letting us know!
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    // Get Resend API key from environment variables
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    
    if (!RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not found. Email will be simulated.');
      
      // Simulate successful email sending for development
      console.log(`[SIMULATED EMAIL]`);
      console.log(`To: ${body.email}`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`Content: HTML email with RSVP confirmation`);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "RSVP confirmation email simulated successfully (no API key configured)",
          recipient: body.email,
          attending: body.attending,
          simulated: true
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Send email using Resend API
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Thabi & Trevor <noreply@thabitrevor.com>', // Replace with your verified domain
        to: [body.email],
        subject: emailSubject,
        html: emailContent,
        reply_to: 'thabitrevor@gmail.com', // Replace with actual contact email
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error('Resend API error:', errorData);
      throw new Error(`Email service error: ${emailResponse.status} - ${errorData}`);
    }

    const emailResult = await emailResponse.json();
    console.log('Email sent successfully:', emailResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "RSVP confirmation email sent successfully",
        recipient: body.email,
        attending: body.attending,
        emailId: emailResult.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error in send-rsvp-email function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to process RSVP email",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});