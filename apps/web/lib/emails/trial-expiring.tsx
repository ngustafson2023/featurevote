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

interface TrialExpiringProps {
  appName: string;
  daysLeft: number;
  billingUrl: string;
}

export default function TrialExpiring({
  appName = "__APP_NAME__",
  daysLeft = 3,
  billingUrl = "__APP_URL__/billing",
}: TrialExpiringProps) {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Text style={heading}>
            Your trial ends in {daysLeft} day{daysLeft !== 1 ? "s" : ""}
          </Text>
          <Text style={text}>
            Your {appName} Pro trial is ending soon. To keep access to all
            premium features, upgrade before your trial expires.
          </Text>
          <Text style={text}>
            If you don't upgrade, you'll be moved to the Free plan — no
            charge, but some features will be limited.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={billingUrl}>
              Upgrade Now
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Questions? Reply to this email or contact support@bootstrapquant.com.
            <br />
            You're receiving this because you signed up for {appName}.
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
