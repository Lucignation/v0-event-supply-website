// /app/api/send-email/route.ts
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import welcomeUserTemplate from "@/email-templates/userWelcome";
import adminUserRegistered from "@/email-templates/adminUserRegistered";
import forgotPassword from "@/email-templates/forgotPassword";
import { generateOTP, OTP_EXPIRY_MINUTES } from "@/lib/otp";

export async function POST(req: Request) {
  const body = await req.json();
  const { action, to, data, user, admin } = body;

  switch (action) {
    case "WELCOME_EMAIL":
      await sendMail({
        to,
        subject: "Welcome to Our Platform",
        html: welcomeUserTemplate(data.name),
      });
      break;

    case "LOGIN_ALERT":
      await sendMail({
        to,
        subject: "New Login Detected",
        html: welcomeUserTemplate(data),
      });
      break;

    case "FORGOT_PASSWORD":
        const otp = generateOTP();
        const expires = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
        const messageData = {
            ...user,
            otp,
            expires,
            resetPasswordLink: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?email=${user.email}&otp=${otp}`,
        }
      await sendMail({
        to,
        subject: "Reset Your Password",
        html: forgotPassword(messageData),
      });
      break;

    case "USER_REGISTERED":
      // Send user email
      await sendMail({
        to: user.email,
        subject: "Welcome " + user.name,
        html: welcomeUserTemplate(user),
      });

      // Send admin email
      await sendMail({
        to: admin.email,
        subject: "New User Registered",
        html: adminUserRegistered(user),
      });
      break;

    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
