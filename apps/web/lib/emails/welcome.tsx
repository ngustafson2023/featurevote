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

interface WelcomeEmailProps {
  appName: string;
  dashboardUrl: string;
}

export default function WelcomeEmail({
  appName = "__APP_NAME__",
  dashboardUrl = "__APP_URL__/dashboard",
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Text style={heading}>Welcome to {appName}!</Text>
          <Text style={text}>
            Your account is set up and ready to go. Here are a few things to get
            started:
          </Text>
          <Section>
            <Text style={text}>1. Explore the dashboard</Text>
            <Text style={text}>2. Set up your first project</Text>
            <Text style={text}>3. Check out the Pro plan for advanced features</Text>
          </Section>
          <Section style={buttonContainer}>
            <Button style={button} href={dashboardUrl}>
              Go to Dashboard
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
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
