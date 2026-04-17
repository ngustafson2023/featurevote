import { render } from "@react-email/render";
import { getResend, FROM_EMAIL } from "./resend";
import WelcomeEmail from "./emails/welcome";
import UpgradeConfirmation from "./emails/upgrade-confirmation";
import TrialExpiring from "./emails/trial-expiring";
import SubscriptionCancelled from "./emails/subscription-cancelled";

const APP_NAME = "featurevote";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://featurevote.bootstrapquant.com";

export async function sendWelcomeEmail(to: string) {
  try {
    const html = await render(WelcomeEmail());
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

export async function sendProUpgradeEmail(to: string) {
  const html = `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<style>
:root { color-scheme: dark; }
body, .outer { background-color: #09090b !important; }
.card { background-color: #18181b !important; }
</style>
</head>
<body style="margin:0;padding:0;background:#09090b;" bgcolor="#09090b">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#09090b" style="background:#09090b;" class="outer">
<tr><td align="center" style="padding:40px 16px;">
<table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

<tr><td style="padding-bottom:20px;">
  <span style="font-size:20px;font-weight:700;color:#ffffff;font-family:-apple-system,sans-serif;">FeatureVote<span style="color:#4f46e5;">&thinsp;·</span></span>
</td></tr>

<tr>
  <td bgcolor="#18181b" style="background:#18181b;border-radius:12px;padding:36px;" class="card">
    
  <p style="font-size:32px;margin:0 0 12px;">🎉</p>
  <h1 style="font-size:26px;font-weight:700;color:#ffffff;margin:0 0 8px;font-family:-apple-system,sans-serif;">You're now on Pro.</h1>
  <p style="font-size:16px;color:#a1a1aa;margin:0 0 24px;line-height:1.6;font-family:-apple-system,sans-serif;">Here's what just unlocked:</p>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
    <tr><td style="padding-bottom:14px;">
    <table cellpadding="0" cellspacing="0" border="0"><tr>
      <td width="20" valign="top" style="padding-top:1px;font-size:16px;color:#4f46e5;font-weight:700;font-family:-apple-system,sans-serif;">✓</td>
      <td style="padding-left:10px;"><p style="font-size:15px;font-weight:600;color:#ffffff;margin:0 0 2px;font-family:-apple-system,sans-serif;">Unlimited boards</p><p style="font-size:13px;color:#71717a;margin:0;font-family:-apple-system,sans-serif;">One board per product, as many as you want</p></td>
    </tr></table>
  </td></tr><tr><td style="padding-bottom:14px;">
    <table cellpadding="0" cellspacing="0" border="0"><tr>
      <td width="20" valign="top" style="padding-top:1px;font-size:16px;color:#4f46e5;font-weight:700;font-family:-apple-system,sans-serif;">✓</td>
      <td style="padding-left:10px;"><p style="font-size:15px;font-weight:600;color:#ffffff;margin:0 0 2px;font-family:-apple-system,sans-serif;">Priority support</p><p style="font-size:13px;color:#71717a;margin:0;font-family:-apple-system,sans-serif;">Faster responses when you need help</p></td>
    </tr></table>
  </td></tr><tr><td style="padding-bottom:14px;">
    <table cellpadding="0" cellspacing="0" border="0"><tr>
      <td width="20" valign="top" style="padding-top:1px;font-size:16px;color:#4f46e5;font-weight:700;font-family:-apple-system,sans-serif;">✓</td>
      <td style="padding-left:10px;"><p style="font-size:15px;font-weight:600;color:#ffffff;margin:0 0 2px;font-family:-apple-system,sans-serif;">Early access to new features</p><p style="font-size:13px;color:#71717a;margin:0;font-family:-apple-system,sans-serif;">You get new features before free users</p></td>
    </tr></table>
  </td></tr>
  </table>
  <table cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#4f46e5" style="background:#4f46e5;border-radius:8px;"><a href="https://featurevote.bootstrapquant.com/dashboard/new" style="display:block;padding:13px 28px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;font-family:-apple-system,sans-serif;">Create a New Board →</a></td></tr></table>
  <p style="margin:16px 0 0;"><a href="https://featurevote.bootstrapquant.com/billing" style="font-size:13px;color:#52525b;text-decoration:none;font-family:-apple-system,sans-serif;">Manage billing →</a></p>

  </td>
</tr>

<tr><td style="padding-top:20px;text-align:center;">
  <p style="font-size:12px;color:#52525b;margin:0;font-family:-apple-system,sans-serif;">FeatureVote · <a href="mailto:support@bootstrapquant.com" style="color:#52525b;text-decoration:none;">support@bootstrapquant.com</a></p>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`
  try {
    await getResend().emails.send({ from: FROM_EMAIL, to, subject: "You\'re now on FeatureVote Pro 🎉", html })
  } catch (err) { console.error('Pro upgrade email failed:', err) }
}