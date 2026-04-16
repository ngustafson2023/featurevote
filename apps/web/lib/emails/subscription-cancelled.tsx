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

interface SubscriptionCancelledProps {
  appName: string;
  endDate: string;
  billingUrl: string;
}

export default function SubscriptionCancelled({
  appName = "__APP_NAME__",
  endDate = "April 30, 2026",
  billingUrl = "__APP_URL__/billing",
}: SubscriptionCancelledProps) {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Text style={heading}>Your subscription has been cancelled</Text>
          <Text style={text}>
            Your {appName} Pro subscription has been cancelled. You'll still
            have access to Pro features until {endDate}.
          </Text>
          <Text style={text}>
            After that, your account will switch to the Free plan. Your data
            will be kept — you can resubscribe anytime to get Pro back.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={billingUrl}>
              Resubscribe
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            We'd love to know why you cancelled — reply to this email with
            feedback.
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
