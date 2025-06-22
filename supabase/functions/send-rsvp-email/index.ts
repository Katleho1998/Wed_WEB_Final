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

    // Your direct Imgur image URL
    const flowerImageUrl = "https://i.imgur.com/FvNfTKL.png";

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
        <body style="margin: 0; padding: 20px; font-family: 'Inter', sans-serif; background-color: #f8f9fa; min-height: 100vh;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(85, 92, 120, 0.15); border: 1px solid rgba(85, 92, 120, 0.1);">
            
            <!-- Header with Flower -->
            <div style="background: linear-gradient(135deg, #555c78 0%, #4a5068 100%); padding: 40px 20px; text-align: center; position: relative;">
              <!-- Wedding Flower Image -->
              <div style="margin-bottom: 16px; text-align: center;">
                <img src="${flowerImageUrl}" 
                     alt="Wedding Flowers" 
                     style="height: 140px; filter: brightness(1.1) contrast(1.05);"
                     onerror="this.style.display='none';">
              </div>
              
              <h1 style="color: #ffffff; font-family: 'Playfair Display', serif; font-size: 32px; margin: 0; font-weight: 700; text-shadow: 0 2px 8px rgba(0,0,0,0.2); letter-spacing: -0.5px; text-align: center;">
                Thank You for Your RSVP!
              </h1>
              <div style="width: 80px; height: 3px; background: linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%); margin: 20px auto; border-radius: 2px;"></div>
            </div>
            
            <!-- Main content -->
            <div style="padding: 45px 35px; background-color: #ffffff; text-align: center;">
              <p style="color: #555c78; font-size: 20px; line-height: 1.6; margin-bottom: 25px; font-weight: 600; font-family: 'Playfair Display', serif; text-align: center;">
                Dear ${guestNames},
              </p>
              
              <p style="color: #666; font-size: 17px; line-height: 1.7; margin-bottom: 30px; font-weight: 400; text-align: center;">
                We're absolutely thrilled that you'll be joining us on our special day! Your presence will make our celebration even more meaningful and joyful.
              </p>
              
              <!-- RSVP Details Box -->
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f4 100%); padding: 30px; border-radius: 16px; margin: 30px 0; border-left: 5px solid #555c78; border: 1px solid #e9ecef; box-shadow: 0 4px 15px rgba(85, 92, 120, 0.08); text-align: center;">
                <h3 style="color: #555c78; margin-top: 0; margin-bottom: 20px; font-size: 20px; font-family: 'Playfair Display', serif; font-weight: 700; text-align: center;">RSVP Confirmation Details:</h3>
                <div style="space-y: 12px; text-align: center;">
                  <p style="color: #333; margin: 12px 0; font-size: 16px; font-weight: 500; text-align: center;"><strong style="color: #555c78;">Guest(s):</strong> ${guestNames}</p>
                  <p style="color: #333; margin: 12px 0; font-size: 16px; font-weight: 500; text-align: center;"><strong style="color: #555c78;">Party Size:</strong> ${guestCount} ${guestCount === 1 ? 'person' : 'people'}</p>
                  <p style="color: #333; margin: 12px 0; font-size: 16px; font-weight: 500; text-align: center;"><strong style="color: #555c78;">Status:</strong> <span style="color: #28a745; font-weight: bold; background-color: #d4edda; padding: 4px 12px; border-radius: 20px; font-size: 14px;">Attending ✓</span></p>
                  ${body.message ? `<p style="color: #333; margin: 12px 0; font-size: 16px; font-weight: 500; text-align: center;"><strong style="color: #555c78;">Your Message:</strong><br><em style="color: #666; background-color: #f8f9fa; padding: 8px 12px; border-radius: 8px; display: inline-block; margin-top: 4px;">"${body.message}"</em></p>` : ''}
                </div>
              </div>
              
              <!-- Wedding Details -->
              <div style="background: linear-gradient(135deg, #555c78 0%, #4a5068 100%); color: white; padding: 30px; border-radius: 16px; margin: 30px 0; box-shadow: 0 8px 25px rgba(85, 92, 120, 0.25); text-align: center;">
                <h3 style="color: #ffffff; margin-top: 0; margin-bottom: 20px; font-size: 22px; font-family: 'Playfair Display', serif; font-weight: 700; text-shadow: 0 1px 3px rgba(0,0,0,0.2); text-align: center;">Wedding Details Reminder:</h3>
                
                <div style="margin-bottom: 20px; background-color: rgba(255,255,255,0.1); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); text-align: center;">
                  <p style="color: #ffffff; margin: 0 0 12px 0; font-size: 18px; font-weight: bold; font-family: 'Playfair Display', serif; text-align: center;">Saturday, September 27th, 2025</p>
                  <div style="text-align: center;">
                    <p style="color: rgba(255,255,255,0.95); margin: 8px 0; font-size: 15px; line-height: 1.5; text-align: center;">• <strong>Matrimony:</strong> 10:00 AM at Allen Temple<br>188 Ingedezi Street, Zone 7, Meadowlands</p>
                    <p style="color: rgba(255,255,255,0.95); margin: 8px 0; font-size: 15px; line-height: 1.5; text-align: center;">• <strong>Reception:</strong> 12:30 PM<br>12278, Zone 9, Meadowlands</p>
                  </div>
                </div>
                
                <div style="margin-bottom: 20px; background-color: rgba(255,255,255,0.1); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); text-align: center;">
                  <p style="color: #ffffff; margin: 0 0 12px 0; font-size: 18px; font-weight: bold; font-family: 'Playfair Display', serif; text-align: center;">Sunday, September 28th, 2025</p>
                  <div style="text-align: center;">
                    <p style="color: rgba(255,255,255,0.95); margin: 8px 0; font-size: 15px; line-height: 1.5; text-align: center;">• <strong>Celebration continues:</strong> 12:30 PM at Molapo Park</p>
                  </div>
                </div>
                
                <div style="background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%); padding: 18px; border-radius: 12px; margin-top: 20px; text-align: center; border: 2px solid rgba(255,255,255,0.3); box-shadow: inset 0 1px 3px rgba(255,255,255,0.2);">
                  <p style="margin: 0; font-size: 16px; font-weight: bold; color: #ffffff; font-family: 'Playfair Display', serif; text-shadow: 0 1px 2px rgba(0,0,0,0.2); text-align: center;">Weekend Theme: Shades of Blue and Brown</p>
                </div>
              </div>
             
              <p style="color: #666; font-size: 17px; line-height: 1.7; margin-bottom: 35px; text-align: center;">
                If you have any questions or need to make changes to your RSVP, please don't hesitate to reach out to us directly.
              </p>
              
              <!-- Footer -->
              <div style="text-align: center; margin-top: 45px; padding-top: 30px; border-top: 2px solid #f0f0f0;">
                <p style="color: #999; font-size: 24px; font-style: italic; margin-bottom: 15px; font-family: 'Great Vibes', cursive; color: #555c78; text-align: center;">
                  With love and excitement,
                </p>
                <p style="color: #555c78; font-size: 28px; font-weight: bold; margin: 0; font-family: 'Playfair Display', serif; text-shadow: 0 1px 3px rgba(85, 92, 120, 0.1); text-align: center;">
                  Thabi & Trevor
                </p>
                <p style="color: #aaa; font-size: 13px; margin-top: 25px; line-height: 1.4; text-align: center;">
                  This email was sent because you RSVP'd for our wedding.<br>We can't wait to celebrate with you!
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
        <body style="margin: 0; padding: 20px; font-family: 'Inter', sans-serif; background-color: #f8f9fa; min-height: 100vh;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(85, 92, 120, 0.15); border: 1px solid rgba(85, 92, 120, 0.1);">
            
            <!-- Header with Flower -->
            <div style="background: linear-gradient(135deg, #555c78 0%, #4a5068 100%); padding: 40px 20px; text-align: center; position: relative;">
              <!-- Wedding Flower Image -->
              <div style="margin-bottom: 20px; text-align: center;">
                <img src="${flowerImageUrl}" 
                     alt="Wedding Flowers" 
                     style="height: 140px; filter: brightness(1.1) contrast(1.05);"
                     onerror="this.style.display='none';">
              </div>
              
              <h1 style="color: #ffffff; font-family: 'Playfair Display', serif; font-size: 32px; margin: 0; font-weight: 700; text-shadow: 0 2px 8px rgba(0,0,0,0.2); letter-spacing: -0.5px; text-align: center;">
                Thank You for Your Response
              </h1>
              <div style="width: 80px; height: 3px; background: linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%); margin: 20px auto; border-radius: 2px;"></div>
            </div>
            
            <!-- Main content -->
            <div style="padding: 45px 35px; background-color: #ffffff; text-align: center;">
              <p style="color: #555c78; font-size: 20px; line-height: 1.6; margin-bottom: 25px; font-weight: 600; font-family: 'Playfair Display', serif; text-align: center;">
                Dear ${body.name},
              </p>
              
              <p style="color: #666; font-size: 17px; line-height: 1.7; margin-bottom: 30px; text-align: center;">
                Thank you for taking the time to respond to our wedding invitation. We completely understand that you won't be able to join us on our special day.
              </p>
              
              <!-- RSVP Details Box -->
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f4 100%); padding: 30px; border-radius: 16px; margin: 30px 0; border-left: 5px solid #555c78; border: 1px solid #e9ecef; box-shadow: 0 4px 15px rgba(85, 92, 120, 0.08); text-align: center;">
                <h3 style="color: #555c78; margin-top: 0; margin-bottom: 20px; font-size: 20px; font-family: 'Playfair Display', serif; font-weight: 700; text-align: center;">RSVP Response Details:</h3>
                <div style="space-y: 12px; text-align: center;">
                  <p style="color: #333; margin: 12px 0; font-size: 16px; font-weight: 500; text-align: center;"><strong style="color: #555c78;">Guest:</strong> ${body.name}</p>
                  <p style="color: #333; margin: 12px 0; font-size: 16px; font-weight: 500; text-align: center;"><strong style="color: #555c78;">Status:</strong> <span style="color: #6c757d; font-weight: bold; background-color: #f8f9fa; padding: 4px 12px; border-radius: 20px; font-size: 14px; border: 1px solid #dee2e6;">Unable to attend</span></p>
                  ${body.message ? `<p style="color: #333; margin: 12px 0; font-size: 16px; font-weight: 500; text-align: center;"><strong style="color: #555c78;">Your Message:</strong><br><em style="color: #666; background-color: #f8f9fa; padding: 8px 12px; border-radius: 8px; display: inline-block; margin-top: 4px;">"${body.message}"</em></p>` : ''}
                </div>
              </div>
              
              <p style="color: #666; font-size: 17px; line-height: 1.7; margin-bottom: 25px; text-align: center;">
                While we'll miss having you there to celebrate with us, we truly appreciate your thoughtful response. Your friendship means the world to us.
              </p>
              
              <p style="color: #666; font-size: 17px; line-height: 1.7; margin-bottom: 35px; text-align: center;">
                We hope to catch up with you soon after our big day and share some photos and stories from the celebration!
              </p>
              
              <!-- Footer -->
              <div style="text-align: center; margin-top: 45px; padding-top: 30px; border-top: 2px solid #f0f0f0;">
                <p style="color: #999; font-size: 24px; font-style: italic; margin-bottom: 15px; font-family: 'Great Vibes', cursive; color: #555c78; text-align: center;">
                  With love and understanding,
                </p>
                <p style="color: #555c78; font-size: 28px; font-weight: bold; margin: 0; font-family: 'Playfair Display', serif; text-shadow: 0 1px 3px rgba(85, 92, 120, 0.1); text-align: center;">
                  Thabi & Trevor
                </p>
                <p style="color: #aaa; font-size: 13px; margin-top: 25px; line-height: 1.4; text-align: center;">
                  This email was sent because you responded to our wedding invitation.<br>Thank you for letting us know!
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
        reply_to: 'matsaseng17@gmail.com', // Replace with your actual contact email
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