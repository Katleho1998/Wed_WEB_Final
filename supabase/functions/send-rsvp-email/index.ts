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
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>RSVP Confirmation</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
        </head>
        <body style="margin: 0; padding: 20px; font-family: 'Inter', sans-serif; background: linear-gradient(135deg, #F5F7FA 0%, #FAF7F5 50%, #FDFCFA 100%); min-height: 100vh;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 8px 32px rgba(85, 92, 120, 0.15); border: 1px solid rgba(230, 164, 180, 0.2);">
            
            <!-- Floral Header -->
            <div style="background: linear-gradient(135deg, #E6A4B4 0%, #B6C4A2 50%, #D9C3AC 100%); padding: 40px 20px; text-align: center; position: relative;">
              <!-- Flower Image -->
              <div style="margin-bottom: 20px;">
                <img src="https://raw.githubusercontent.com/your-repo/wedding-site/main/src/assets/Flowers-for-website.png" 
                     alt="Wedding Flowers" 
                     style="max-width: 180px; height: auto; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));"
                     onerror="this.style.display='none'">
              </div>
              
              <h1 style="color: #555c78; font-family: 'Playfair Display', serif; font-size: 32px; margin: 0; text-shadow: 0 2px 4px rgba(255,255,255,0.3); font-weight: 600;">
                Thank You for Your RSVP!
              </h1>
              <div style="width: 60px; height: 2px; background-color: #555c78; margin: 15px auto; opacity: 0.8; border-radius: 1px;"></div>
            </div>
            
            <!-- Main content -->
            <div style="padding: 40px 30px; background-color: #ffffff;">
              <p style="color: #2C3B55; font-size: 18px; line-height: 1.6; margin-bottom: 20px; font-weight: 500;">
                Dear ${guestNames},
              </p>
              
              <p style="color: #3D5275; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                We're absolutely thrilled that you'll be joining us on our special day! Your presence will make our celebration even more meaningful and joyful.
              </p>
              
              <!-- RSVP Details Box -->
              <div style="background: linear-gradient(135deg, #FDFCFA 0%, #FAF7F5 100%); padding: 25px; border-radius: 16px; margin: 25px 0; border-left: 4px solid #E6A4B4; border: 1px solid rgba(230, 164, 180, 0.2);">
                <h3 style="color: #555c78; margin-top: 0; margin-bottom: 15px; font-size: 18px; font-family: 'Playfair Display', serif; font-weight: 600;">RSVP Confirmation Details:</h3>
                <p style="color: #2C3B55; margin: 8px 0; font-size: 15px;"><strong>Guest(s):</strong> ${guestNames}</p>
                <p style="color: #2C3B55; margin: 8px 0; font-size: 15px;"><strong>Party Size:</strong> ${guestCount} ${guestCount === 1 ? 'person' : 'people'}</p>
                <p style="color: #2C3B55; margin: 8px 0; font-size: 15px;"><strong>Status:</strong> <span style="color: #B6C4A2; font-weight: bold;">Attending ✓</span></p>
                ${body.message ? `<p style="color: #2C3B55; margin: 8px 0; font-size: 15px;"><strong>Your Message:</strong> "${body.message}"</p>` : ''}
              </div>
              
              <!-- Wedding Details -->
              <div style="background: linear-gradient(135deg, #F5F7FA 0%, #FDFCFA 100%); padding: 25px; border-radius: 16px; margin: 25px 0; border: 1px solid rgba(182, 196, 162, 0.3);">
                <h3 style="color: #555c78; margin-top: 0; margin-bottom: 15px; font-size: 18px; font-family: 'Playfair Display', serif; font-weight: 600;">Wedding Details Reminder:</h3>
                <div style="margin-bottom: 15px;">
                  <p style="color: #2C3B55; margin: 5px 0; font-size: 15px; font-weight: bold;">Saturday, September 27th, 2025</p>
                  <p style="color: #3D5275; margin: 5px 0; font-size: 14px;">• Matrimony: 10:00 AM at Allen Temple, 188 Ingedezi Street, Zone 7, Meadowlands</p>
                  <p style="color: #3D5275; margin: 5px 0; font-size: 14px;">• Reception: 12:30 PM at 12278, Zone 9, Meadowlands</p>
                </div>
                <div>
                  <p style="color: #2C3B55; margin: 5px 0; font-size: 15px; font-weight: bold;">Sunday, September 28th, 2025</p>
                  <p style="color: #3D5275; margin: 5px 0; font-size: 14px;">• Celebration continues: 12:30 PM at Molapo Park</p>
                </div>
                <div style="background-color: #555c78; color: white; padding: 12px; border-radius: 8px; margin-top: 15px; text-align: center;">
                  <p style="margin: 0; font-size: 14px; font-weight: bold;">Theme: Shades of Blue and Brown</p>
                </div>
              </div>
              
              <p style="color: #3D5275; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                We'll be sending out more details about parking, directions, and other important information as we get closer to the date. Keep an eye on your inbox!
              </p>
              
              <p style="color: #3D5275; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                If you have any questions or need to make changes to your RSVP, please don't hesitate to reach out to us directly.
              </p>
              
              <!-- Footer -->
              <div style="text-align: center; margin-top: 40px; padding-top: 25px; border-top: 1px solid rgba(230, 164, 180, 0.3);">
                <p style="color: #B08465; font-size: 20px; font-style: italic; margin-bottom: 10px; font-family: 'Great Vibes', cursive;">
                  With love and excitement,
                </p>
                <p style="color: #555c78; font-size: 24px; font-weight: bold; margin: 0; font-family: 'Playfair Display', serif;">
                  Thabi & Trevor
                </p>
                <p style="color: #A8BCD5; font-size: 12px; margin-top: 20px;">
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
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
        </head>
        <body style="margin: 0; padding: 20px; font-family: 'Inter', sans-serif; background: linear-gradient(135deg, #F5F7FA 0%, #FAF7F5 50%, #FDFCFA 100%); min-height: 100vh;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 8px 32px rgba(85, 92, 120, 0.15); border: 1px solid rgba(168, 188, 213, 0.3);">
            
            <!-- Floral Header -->
            <div style="background: linear-gradient(135deg, #A8BCD5 0%, #B08465 50%, #D9C3AC 100%); padding: 40px 20px; text-align: center; position: relative;">
              <!-- Flower Image -->
              <div style="margin-bottom: 20px;">
                <img src="https://raw.githubusercontent.com/your-repo/wedding-site/main/src/assets/Flowers-for-website.png" 
                     alt="Wedding Flowers" 
                     style="max-width: 180px; height: auto; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));"
                     onerror="this.style.display='none'">
              </div>
              
              <h1 style="color: #555c78; font-family: 'Playfair Display', serif; font-size: 32px; margin: 0; text-shadow: 0 2px 4px rgba(255,255,255,0.3); font-weight: 600;">
                Thank You for Your Response
              </h1>
              <div style="width: 60px; height: 2px; background-color: #555c78; margin: 15px auto; opacity: 0.8; border-radius: 1px;"></div>
            </div>
            
            <!-- Main content -->
            <div style="padding: 40px 30px; background-color: #ffffff;">
              <p style="color: #2C3B55; font-size: 18px; line-height: 1.6; margin-bottom: 20px; font-weight: 500;">
                Dear ${body.name},
              </p>
              
              <p style="color: #3D5275; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                Thank you for taking the time to respond to our wedding invitation. We completely understand that you won't be able to join us on our special day.
              </p>
              
              <!-- RSVP Details Box -->
              <div style="background: linear-gradient(135deg, #FDFCFA 0%, #FAF7F5 100%); padding: 25px; border-radius: 16px; margin: 25px 0; border-left: 4px solid #A8BCD5; border: 1px solid rgba(168, 188, 213, 0.2);">
                <h3 style="color: #555c78; margin-top: 0; margin-bottom: 15px; font-size: 18px; font-family: 'Playfair Display', serif; font-weight: 600;">RSVP Response Details:</h3>
                <p style="color: #2C3B55; margin: 8px 0; font-size: 15px;"><strong>Guest:</strong> ${body.name}</p>
                <p style="color: #2C3B55; margin: 8px 0; font-size: 15px;"><strong>Status:</strong> <span style="color: #B08465;">Unable to attend</span></p>
                ${body.message ? `<p style="color: #2C3B55; margin: 8px 0; font-size: 15px;"><strong>Your Message:</strong> "${body.message}"</p>` : ''}
              </div>
              
              <p style="color: #3D5275; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                While we'll miss having you there to celebrate with us, we truly appreciate your thoughtful response. Your friendship means the world to us.
              </p>
              
              <p style="color: #3D5275; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                We hope to catch up with you soon after our big day and share some photos and stories from the celebration!
              </p>
              
              <!-- Footer -->
              <div style="text-align: center; margin-top: 40px; padding-top: 25px; border-top: 1px solid rgba(168, 188, 213, 0.3);">
                <p style="color: #B08465; font-size: 20px; font-style: italic; margin-bottom: 10px; font-family: 'Great Vibes', cursive;">
                  With love and understanding,
                </p>
                <p style="color: #555c78; font-size: 24px; font-weight: bold; margin: 0; font-family: 'Playfair Display', serif;">
                  Thabi & Trevor
                </p>
                <p style="color: #A8BCD5; font-size: 12px; margin-top: 20px;">
                  This email was sent because you responded to our wedding invitation. Thank you for letting us know!
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    // Use the provided Resend API key
    const RESEND_API_KEY = 're_ZBxzXKYV_L751fMLiH6YJzaGzSc6AiMTe';
    
    console.log(`[EMAIL] Sending to: ${body.email}`);
    console.log(`[EMAIL] Subject: ${emailSubject}`);
    console.log(`[EMAIL] Guest Count: ${guestCount}`);
    console.log(`[EMAIL] Attending: ${body.attending}`);

    // Send email using Resend API
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Thabi & Trevor <onboarding@resend.dev>', // Using Resend's default domain for now
        to: [body.email],
        subject: emailSubject,
        html: emailContent,
        reply_to: 'thabisomokone@gmail.com', // Replace with your actual contact email
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error('Resend API error:', errorData);
      
      // Don't fail the entire request if email fails - log it but return success
      console.warn(`Email sending failed but RSVP was saved: ${errorData}`);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "RSVP saved successfully, but email notification failed to send",
          recipient: body.email,
          attending: body.attending,
          emailError: `Email service error: ${emailResponse.status}`
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailResult = await emailResponse.json();
    console.log('Email sent successfully via Resend:', emailResult);

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