import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  businessName: string;
  website: string;
  city: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-contact-email function");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { businessName, website, city, email }: ContactEmailRequest = await req.json();
    
    console.log("Processing contact form submission:", { businessName, city, email, website });

    // Send confirmation email to the user
    const userEmailResponse = await resend.emails.send({
      from: "Eudaimonia <onboarding@resend.dev>",
      to: [email],
      subject: "We received your visibility audit request!",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a1a2e; margin-bottom: 24px;">Thank you for reaching out, ${businessName}!</h1>
          <p style="color: #4a4a68; font-size: 16px; line-height: 1.6;">
            We've received your request for a GEO + SEO visibility audit. Our team will review your information and get back to you shortly.
          </p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 24px 0;">
            <h3 style="color: #1a1a2e; margin-top: 0;">Your submission details:</h3>
            <p style="color: #4a4a68; margin: 8px 0;"><strong>Business:</strong> ${businessName}</p>
            <p style="color: #4a4a68; margin: 8px 0;"><strong>Website:</strong> ${website || 'Not provided'}</p>
            <p style="color: #4a4a68; margin: 8px 0;"><strong>Location:</strong> ${city}</p>
          </div>
          <p style="color: #4a4a68; font-size: 16px; line-height: 1.6;">
            We'll be in touch within 1-2 business days.
          </p>
          <p style="color: #4a4a68; font-size: 16px; line-height: 1.6;">
            Best regards,<br>
            <strong>The Eudaimonia Team</strong>
          </p>
        </div>
      `,
    });

    console.log("User confirmation email sent:", userEmailResponse);

    // Send notification email to the owner
    const ownerEmailResponse = await resend.emails.send({
      from: "Eudaimonia Contact Form <onboarding@resend.dev>",
      to: ["eudaimoniavisiblity@gmail.com"],
      subject: `New Visibility Audit Request: ${businessName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a1a2e; margin-bottom: 24px;">New Contact Form Submission</h1>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 24px 0;">
            <p style="color: #4a4a68; margin: 8px 0;"><strong>Business Name:</strong> ${businessName}</p>
            <p style="color: #4a4a68; margin: 8px 0;"><strong>Email:</strong> ${email}</p>
            <p style="color: #4a4a68; margin: 8px 0;"><strong>Website:</strong> ${website || 'Not provided'}</p>
            <p style="color: #4a4a68; margin: 8px 0;"><strong>City/Neighborhood:</strong> ${city}</p>
          </div>
          <p style="color: #4a4a68; font-size: 14px;">
            Reply to this lead at: <a href="mailto:${email}">${email}</a>
          </p>
        </div>
      `,
    });

    console.log("Owner notification email sent:", ownerEmailResponse);

    return new Response(
      JSON.stringify({ success: true, userEmail: userEmailResponse, ownerEmail: ownerEmailResponse }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
