import { envServer } from "@/config/server.env";
import { getCookieValue } from "@/utils/get-cookie-value";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { Resend } from "resend";

import { db } from "@/server/db";
import { authSchema } from "@/server/db/schemas/auth.schema";

import { serverTranslator } from "@/i18n/server-translator";

import { ResetPasswordEmail } from "@/components/emails/reset-password-email";
import { VerifyEmail } from "@/components/emails/verify-email";

const resend = new Resend(envServer.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }, request) => {
      const cookieHeader = request?.headers.get("cookie");
      const locale = getCookieValue({ cookieHeader, name: "NEXT_LOCALE" });

      const t = serverTranslator(locale || "en");

      const { data, error } = await resend.emails.send({
        // Resend email domain needs to be configured/verified in https://resend.com/domains
        // For demo purposes use onboarding@resend.dev, and fill in the form with the email that is used to create a Resend account
        from: `${envServer.EMAIL_SENDER_NAME} <${envServer.EMAIL_SENDER_EMAIL}>`,
        to: [user.email],
        subject: t("emailTemplates.resetPassword.subject"),
        react: ResetPasswordEmail({ username: user.name, resetUrl: url, locale, userEmail: user.email }),
      });

      if (error) {
        return console.error({ error });
      }

      console.log({ data });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: false,
    sendVerificationEmail: async ({ user, url }, request) => {
      const cookieHeader = request?.headers.get("cookie");
      const locale = getCookieValue({ cookieHeader, name: "NEXT_LOCALE" });

      const t = serverTranslator(locale || "en");

      const { data, error } = await resend.emails.send({
        // Resend email domain needs to be configured/verified in https://resend.com/domains
        // For demo purposes use onboarding@resend.dev, and fill in the form with the email that is used to create a Resend account
        from: `${envServer.EMAIL_SENDER_NAME} <${envServer.EMAIL_SENDER_EMAIL}>`,
        to: [user.email],
        subject: t("emailTemplates.verifyEmail.subject"),
        react: VerifyEmail({ username: user.name, verifyUrl: url, locale }),
      });

      if (error) {
        return console.error({ error });
      }

      console.log({ data });
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: envServer.GOOGLE_CLIENT_ID,
      clientSecret: envServer.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: envServer.GITHUB_CLIENT_ID,
      clientSecret: envServer.GITHUB_CLIENT_SECRET,
    },
  },
  trustedOrigins: [envServer.NEXT_PUBLIC_CLIENT_URL],
  plugins: [openAPI()],
});
