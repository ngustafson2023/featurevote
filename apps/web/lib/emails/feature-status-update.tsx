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

interface FeatureStatusUpdateProps {
  postTitle: string;
  newStatus: string;
  boardName: string;
  boardSlug: string;
}

const STATUS_LABELS: Record<string, string> = {
  open: "Open for voting",
  planned: "Planned",
  in_progress: "In Progress",
  completed: "Done! 🎉",
  closed: "Closed",
};

export default function FeatureStatusUpdate({
  postTitle = "Example feature",
  newStatus = "planned",
  boardName = "My Board",
  boardSlug = "my-board",
}: FeatureStatusUpdateProps) {
  const label = STATUS_LABELS[newStatus] || newStatus;
  const boardUrl = `https://featurevote.bootstrapquant.com/b/${boardSlug}`;

  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Text style={heading}>Status Update</Text>
          <Text style={text}>
            A feature you voted for has a new status:
          </Text>
          <Section style={statusBox}>
            <Text style={featureTitle}>&ldquo;{postTitle}&rdquo;</Text>
            <Text style={statusText}>{label}</Text>
          </Section>
          <Text style={text}>
            This update is from the <strong>{boardName}</strong> board.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={boardUrl}>
              View Board
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            FeatureVote — You received this because you voted on this feature.
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
const statusBox = { backgroundColor: "#f4f4f5", borderRadius: "8px", padding: "16px", marginBottom: "16px", textAlign: "center" as const };
const featureTitle = { fontSize: "18px", fontWeight: "600", color: "#18181b", marginBottom: "4px" };
const statusText = { fontSize: "20px", fontWeight: "700", color: "#4f46e5", marginBottom: "0" };
const buttonContainer = { textAlign: "center" as const, marginTop: "24px", marginBottom: "24px" };
const button = { backgroundColor: "#4f46e5", color: "#ffffff", padding: "12px 24px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", textDecoration: "none" };
const hr = { borderColor: "#e4e4e7", margin: "24px 0" };
const footer = { fontSize: "12px", color: "#a1a1aa" };
