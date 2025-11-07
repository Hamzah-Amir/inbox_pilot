export function parseEmailOutput(email) {
  const isTemplate = email.emailType === "TEMPLATE";
  let subject = "";
  let intro = "";
  let body = "";
  let closing = "";

  try {
    const parsed = JSON.parse(email.output || "{}");
    if (isTemplate) {
      subject = parsed.subject || "";
      intro = parsed.intro || "";
      body = parsed.body || "";
      closing = parsed.closing || "";
    } else {
      body = email.output || "";
    }
  } catch {
    body = email.output || "";
  }

  return { subject, intro, body, closing, isTemplate };
}
