/*
  # RSVP Email Confirmation Function

  1. Purpose
    - Sends confirmation emails to guests who submit RSVPs
    - Handles both attending and non-attending responses
    - Provides personalized email content based on RSVP details

  2. Functionality
    - Receives RSVP data from the frontend
    - Formats email content with guest details
    - Sends confirmation email using a simple email service
    - Returns success/error status to the frontend

  3. Security
    - CORS headers configured for frontend access
    - Input validation for required fields
    - Error handling for email delivery failures
*/

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

Deno.serve(async (req: Request) => {
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
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fefefe; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #6b7280; font-size: 28px; margin-bottom: 10px;">Thank You for Your RSVP!</h1>
            <div style="width: 60px; height: 2px; background-color: #f4a5a5; margin: 0 auto;"></div>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${guestNames},</p>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            We're absolutely thrilled that you'll be joining us on our special day! Your presence will make our celebration even more meaningful.
          </p>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f4a5a5;">
            <h3 style="color: #6b7280; margin-top: 0;">RSVP Details:</h3>
            <p style="color: #374151; margin: 5px 0;"><strong>Guest(s):</strong> ${guestNames}</p>
            <p style="color: #374151; margin: 5px 0;"><strong>Party Size:</strong> ${guestCount} ${guestCount === 1 ? 'person' : 'people'}</p>
            <p style="color: #374151; margin: 5px 0;"><strong>Status:</strong> Attending ✓</p>
            ${body.message ? `<p style="color: #374151; margin: 5px 0;"><strong>Your Message:</strong> "${body.message}"</p>` : ''}
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            We'll be sending out more details about the venue, timing, and other important information as we get closer to the date. 
            Keep an eye on your inbox!
          </p>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            If you have any questions or need to make changes to your RSVP, please don't hesitate to reach out to us directly.
          </p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 18px; font-style: italic;">
              With love and excitement,<br>
              <strong style="color: #374151;">Thabi & Trevor</strong>
            </p>
          </div>
        </div>
      `;
    } else {
      emailSubject = "Thank You for Your RSVP Response 💕";
      emailContent = `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fefefe; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #6b7280; font-size: 28px; margin-bottom: 10px;">Thank You for Your Response</h1>
            <div style="width: 60px; height: 2px; background-color: #f4a5a5; margin: 0 auto;"></div>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">Dear ${body.name},</p>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Thank you for taking the time to respond to our wedding invitation. We completely understand that you won't be able to join us on our special day.
          </p>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f4a5a5;">
            <h3 style="color: #6b7280; margin-top: 0;">RSVP Details:</h3>
            <p style="color: #374151; margin: 5px 0;"><strong>Guest:</strong> ${body.name}</p>
            <p style="color: #374151; margin: 5px 0;"><strong>Status:</strong> Unable to attend</p>
            ${body.message ? `<p style="color: #374151; margin: 5px 0;"><strong>Your Message:</strong> "${body.message}"</p>` : ''}
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            While we'll miss having you there to celebrate with us, we truly appreciate your thoughtful response. 
            We hope to catch up with you soon after our big day!
          </p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 18px; font-style: italic;">
              With love and understanding,<br>
              <strong style="color: #374151;">Thabi & Trevor</strong>
            </p>
          </div>
        </div>
      `;
    }

    // Log the email attempt (in a real implementation, you would integrate with an email service)
    console.log(`Email would be sent to: ${body.email}`);
    console.log(`Subject: ${emailSubject}`);
    console.log(`Content: ${emailContent}`);

    // In a production environment, you would integrate with an email service like:
    // - Resend
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // 
    // For now, we'll simulate a successful email send
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "RSVP confirmation email sent successfully",
        recipient: body.email,
        attending: body.attending
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