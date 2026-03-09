import { NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/validators/contact";
import { checkRateLimit } from "@/lib/rate-limit";

const provider = process.env.CONTACT_PROVIDER ?? "console";

function getIpAddress(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

async function sendByResend(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    throw new Error("Resend environment variables are missing.");
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from,
    to,
    subject: `[Portfolio] ${payload.subject}`,
    replyTo: payload.email,
    html: `
      <h2>New Portfolio Inquiry</h2>
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Budget:</strong> ${payload.budget || "Not specified"}</p>
      <p><strong>Timeline:</strong> ${payload.timeline || "Not specified"}</p>
      <p><strong>Message:</strong></p>
      <p>${payload.message}</p>
    `,
  });
}

async function sendByNodemailer(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!host || !user || !pass || !to) {
    throw new Error("Nodemailer environment variables are missing.");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: process.env.CONTACT_FROM_EMAIL ?? user,
    to,
    subject: `[Portfolio] ${payload.subject}`,
    replyTo: payload.email,
    text: `Name: ${payload.name}\nEmail: ${payload.email}\nBudget: ${payload.budget || "Not specified"}\nTimeline: ${payload.timeline || "Not specified"}\n\n${payload.message}`,
  });
}

export async function POST(request: Request) {
  const ip = getIpAddress(request);
  const rate = checkRateLimit(ip, 5, 60_000);

  if (!rate.ok) {
    return NextResponse.json({ message: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const json = (await request.json()) as unknown;
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid form data.", errors: parsed.error.flatten() }, { status: 400 });
  }

  const payload = parsed.data;

  if (payload.honeypot) {
    return NextResponse.json({ ok: true });
  }

  try {
    if (provider === "resend") {
      await sendByResend(payload);
    } else if (provider === "nodemailer") {
      await sendByNodemailer(payload);
    } else {
      console.log("[CONTACT_FORM]", {
        ...payload,
        receivedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form send failed", error);
    return NextResponse.json({ message: "Unable to send message right now." }, { status: 500 });
  }
}

