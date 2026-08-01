import { SMTP_FROM, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_SECURE, SMTP_USERNAME } from "@/src/props";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE, // true for port 465, false for other ports
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
    }
});

export default async function mail(recepient: string, subject: string, html: string) {
    console.log('Mail', recepient, subject, html);
    return await transporter.sendMail({
        from: SMTP_FROM,
        to: recepient,
        subject: subject,
        html: html,
    });
}