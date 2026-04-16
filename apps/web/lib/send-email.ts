import { render } from "@react-email/render";
import { getResend, FROM_EMAIL } from "./resend";
import WelcomeEmail from "./emails/welcome";
import UpgradeConfirmation from "./emails/upgrade-confirmation";
import TrialExpiring from "./emails/trial-expiring";
import SubscriptionCancelled from "./emails/subscription-cancelled";

const APP_NAME = "__APP_NAME__";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "__APP_URL__";

export async function sendWelcomeEmail(to: string) {
  try {
    const html = await render(
      WelcomeEmail({
        appName: APP_NAME,
        dashboardUrl: `${APP_URL}/dashboard`,
      })
    );
    await getResend().emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Welcome to ${APP_NAME}!`,
      html,
    });
  } catch (err) {
    console.error("Failed to send welcome email:", err);
  }
}

export async function sendUpgradeConfirmation(
  to: string,
  amount: string
) {
  try {
    const html = await render(
      UpgradeConfirmation({
        appName: APP_NAME,
        planName: "Pro",
        amount,
        dashboardUrl: `${APP_URL}/dashboard`,
      })
    );
    await getResend().emails.send({
      from: FROM_EMAIL,
      to,
      subject: `You're now on ${APP_NAME} Pro!`,
      html,
    });
  } catch (err) {
    console.error("Failed to send upgrade confirmation:", err);
  }
}

export async function sendTrialExpiringEmail(
  to: string,
  daysLeft: number
) {
  try {
    const html = await render(
      TrialExpiring({
        appName: APP_NAME,
        daysLeft,
        billingUrl: `${APP_URL}/billing`,
      })
    );
    await getResend().emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Your ${APP_NAME} trial ends in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}`,
      html,
    });
  } catch (err) {
    console.error("Failed to send trial expiring email:", err);
  }
}

export async function sendSubscriptionCancelledEmail(
  to: string,
  endDate: string
) {
  try {
    const html = await render(
      SubscriptionCancelled({
        appName: APP_NAME,
        endDate,
        billingUrl: `${APP_URL}/billing`,
      })
    );
    await getResend().emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Your ${APP_NAME} Pro subscription has been cancelled`,
      html,
    });
  } catch (err) {
    console.error("Failed to send cancellation email:", err);
  }
}
