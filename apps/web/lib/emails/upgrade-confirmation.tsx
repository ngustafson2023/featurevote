import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Button,
  Section,
  Hr,
} from "@react-email/components";

interface UpgradeConfirmationProps {
  appName: string;
  planName: string;
  amount: string;
  dashboardUrl: string;
}

export default function UpgradeConfirmation({
  appName = "__APP_NAME__",
  planName = "Pro",
  amount = "$__PRO_PRICE__/mo",
  dashboardUrl = "__APP_URL__/dashboard",
}: UpgradeConfirmationProps) {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Text style={heading}>You're on {planName}!</Text>
          <Text style={text}>
            Thanks for upgrading to {appName} {planName} ({amount}). You now
            have access to all premium features.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={dashboardUrl}>
              Explore Pro Features
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Manage your subscription anytime from Settings &gt; Billing.
            <br />
            {appName} — support@bootstrapquant.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = { backgroundColor: "#fafafa", fontFamily: "system-ui, sans-serif" };
const container = { margin: "0 auto", padding: "40px 20px", maxWidth: "560px" };
const heading = { fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#18181b" };
const text = { fontSize: "16px", lineHeight: "24px", color: "#3f3f46", marginBottom: "8px" };
const buttonContainer = { textAlign: "center" as const, marginTop: "24px", marginBottom: "24px" };
const button = { backgroundColor: "#f59e0b", color: "#18181b", padding: "12px 24px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", textDecoration: "none" };
const hr = { borderColor: "#e4e4e7", margin: "24px 0" };
const footer = { fontSize: "12px", color: "#a1a1aa" };
