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

export default function ProUpgradeEmail() {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Text style={heading}>You&apos;re now on FeatureVote Pro 🎉</Text>
          <Text style={text}>Thanks for upgrading. Here&apos;s what you&apos;ve unlocked:</Text>
          <Section style={featureBox}>
            <Text style={feature}>✓ Unlimited boards</Text>
            <Text style={feature}>✓ Priority support</Text>
          </Section>
          <Section style={buttonContainer}>
            <Button
              style={button}
              href="https://featurevote.bootstrapquant.com/dashboard/new"
            >
              Create a New Board
            </Button>
          </Section>
          <Text style={text}>
            Manage your subscription anytime from the{" "}
            <a href="https://featurevote.bootstrapquant.com/billing" style={link}>
              billing portal
            </a>
            .
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            FeatureVote · support@bootstrapquant.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#fafafa",
  fontFamily: "system-ui, sans-serif",
};
const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
};
const heading = {
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "16px",
  color: "#18181b",
};
const text = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#3f3f46",
  marginBottom: "8px",
};
const featureBox = {
  backgroundColor: "#f4f4f5",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "16px",
};
const feature = {
  fontSize: "16px",
  lineHeight: "28px",
  color: "#18181b",
  fontWeight: "600",
  marginBottom: "0",
};
const buttonContainer = {
  textAlign: "center" as const,
  marginTop: "24px",
  marginBottom: "24px",
};
const button = {
  backgroundColor: "#4f46e5",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "8px",
  fontWeight: "600",
  fontSize: "14px",
  textDecoration: "none",
};
const link = { color: "#4f46e5", textDecoration: "underline" };
const hr = { borderColor: "#e4e4e7", margin: "24px 0" };
const footer = { fontSize: "12px", color: "#a1a1aa" };
