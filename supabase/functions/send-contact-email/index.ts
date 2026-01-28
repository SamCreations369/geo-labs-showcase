import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(RESEND_API_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const extractResendId = (resp: unknown): string | null => {
  const r = resp as any;
  return (r?.data?.id ?? r?.id ?? null) as string | null;
};

// Helper to normalize URLs - adds https:// if missing
const normalizeUrl = (url: string): string => {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
};

// Server-side validation schema
const contactSchema = z.object({
  businessName: z.string().trim().min(1, "Business name is required").max(100),
  website: z.string().trim().transform(normalizeUrl).pipe(
    z.string().url().max(255).or(z.literal(""))
  ),
  city: z.string().trim().min(1, "City is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
});

// Simple in-memory rate limiter
const rateLimiter = new Map<string, number[]>();
const RATE_LIMIT = 5; // requests
const RATE_WINDOW_MS = 60 * 1000; // 1 minute

const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const requests = rateLimiter.get(identifier) || [];
  const recentRequests = requests.filter((time) => now - time < RATE_WINDOW_MS);

  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }

  recentRequests.push(now);
  rateLimiter.set(identifier, recentRequests);
  return true;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY secret");
      return new Response(
        JSON.stringify({ error: "Email service is not configured." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Rate limiting by IP
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    
    if (!checkRateLimit(clientIP)) {
      console.warn("Rate limit exceeded:", { ip: clientIP, timestamp: new Date().toISOString() });
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again in a few minutes." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Server-side validation
    const body = await req.json();
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      console.warn("Validation failed:", { errors: validationResult.error.issues });
      return new Response(
        JSON.stringify({ error: "Invalid form data. Please check your inputs." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { businessName, website, city, email } = validationResult.data;

    console.log("Processing contact form:", { businessName, city, timestamp: new Date().toISOString() });

    // Send confirmation email to the user
    const userEmailResponse = await resend.emails.send({
      from: "Eudaimonia <noreply@eudaimonia.website>",
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

    if ((userEmailResponse as any)?.error) {
      console.error("Resend user email send failed", { error: (userEmailResponse as any).error });
      throw new Error("EMAIL_SEND_FAILED");
    }

    const userEmailId = extractResendId(userEmailResponse);
    console.log("User confirmation email sent successfully", { id: userEmailId });

    // Send notification email to the owner
    const ownerEmailResponse = await resend.emails.send({
      from: "Eudaimonia Contact Form <noreply@eudaimonia.website>",
      to: ["eudaimoniaseo@outlook.com"],
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

    if ((ownerEmailResponse as any)?.error) {
      console.error("Resend owner email send failed", { error: (ownerEmailResponse as any).error });
      throw new Error("EMAIL_SEND_FAILED");
    }

    const ownerEmailId = extractResendId(ownerEmailResponse);
    console.log("Owner notification email sent successfully", { id: ownerEmailId });

    // Return minimal success response
    return new Response(
      JSON.stringify({
        success: true,
        userEmailId,
        ownerEmailId,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    // Log detailed error server-side only
    console.error("Contact form error:", {
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
    });

    // Return generic error message to client
    return new Response(
      JSON.stringify({ error: "Unable to process your request. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
