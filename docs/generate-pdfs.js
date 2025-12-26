const fs = require("fs");
const path = require("path");

function escapePdfText(str) {
  return str.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function buildPdfContent(lines) {
  const contentLines = [];
  const title = lines[0];
  const bodyLines = lines.slice(1);

  contentLines.push("BT");
  contentLines.push("/F1 20 Tf");
  contentLines.push("72 800 Td");
  contentLines.push(`(${escapePdfText(title)}) Tj`);
  contentLines.push("/F1 12 Tf");

  bodyLines.forEach((line, index) => {
    const spacing = index === 0 ? -28 : -18;
    contentLines.push(`0 ${spacing} Td`);
    contentLines.push(`(${escapePdfText(line)}) Tj`);
  });

  contentLines.push("ET");

  return contentLines.join("\n");
}

function createPdf(filePath, lines) {
  const content = buildPdfContent(lines);
  const contentLength = Buffer.byteLength(content, "utf8");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${contentLength} >>\nstream\n${content}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];

  const header = "%PDF-1.4\n";
  let body = "";
  const offsets = [0];

  objects.forEach((object, index) => {
    const objectId = index + 1;
    const offset = Buffer.byteLength(header + body, "utf8");
    offsets.push(offset);
    body += `${objectId} 0 obj\n${object}\nendobj\n`;
  });

  let xref = `xref\n0 ${objects.length + 1}\n`;
  xref += "0000000000 65535 f \n";
  for (let i = 1; i < offsets.length; i++) {
    xref += `${offsets[i].toString().padStart(10, "0")} 00000 n \n`;
  }

  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  const startXref = header.length + Buffer.byteLength(body, "utf8");

  const pdf =
    header +
    body +
    xref +
    trailer +
    `startxref\n${startXref}\n%%EOF`;

  fs.writeFileSync(filePath, pdf, "binary");
}

const docsDir = __dirname;

createPdf(
  path.join(docsDir, "privacy-policy.pdf"),
  [
    "Burrah Privacy Policy",
    "Effective Date: 14 November 2025",
    "This Privacy Policy explains how Bharat ka Burrah (\"Burrah\") collects, uses, and protects personal data across sipburrah.com and related channels.",
    "1. Information We Collect",
    "- Contact details you submit through footer forms or distributor inquiries.",
    "- Business information shared for partnership evaluation.",
    "- Usage analytics collected via essential cookies and third-party tools.",
    "2. How We Use Information",
    "- Respond to queries, deliver product updates, and manage distributor onboarding.",
    "- Improve website performance, personalize experiences, and measure campaign effectiveness.",
    "- Meet legal obligations and prevent fraudulent or abusive activity.",
    "3. Sharing & Disclosure",
    "- We share data with vetted service providers for hosting, analytics, logistics, and CRM support.",
    "- We may disclose information if required by law or during corporate transactions.",
    "4. Data Retention & Security",
    "- We retain data only as long as needed for the purpose collected.",
    "- We apply encryption, access controls, and vendor due diligence to protect information.",
    "5. Your Rights",
    "- Request access, updates, or deletion by emailing privacy@sipburrah.com.",
    "- Opt out of marketing communications at any time via included links.",
    "6. International Transfers",
    "- When data travels outside India, we ensure safeguards aligned with applicable laws.",
    "7. Updates to This Policy",
    "- We will post revisions with a new effective date when practices change.",
    "8. Contact Us",
    "- privacy@sipburrah.com | +91 99888 77665 | 51DigitalMedia LLP, Punjab, India."
  ]
);

createPdf(
  path.join(docsDir, "terms-and-conditions.pdf"),
  [
    "Burrah Terms and Conditions",
    "Effective Date: 14 November 2025",
    "These Terms govern your use of sipburrah.com, Burrah product information, and related digital experiences operated by 51DigitalMedia LLP.",
    "1. Acceptance of Terms",
    "- Accessing the site or submitting information signifies acceptance of these Terms.",
    "- If you disagree, please discontinue use immediately.",
    "2. Product Information",
    "- Burrah beverages are described for general informational purposes; availability may vary by region.",
    "- Pricing, promotions, flavours, and pack shots are subject to change without prior notice.",
    "3. User Responsibilities",
    "- Provide accurate details in enquiry or distributor forms.",
    "- Do not misuse the site, introduce malware, or attempt to access restricted systems.",
    "4. Intellectual Property",
    "- Logos, visuals, copy, and motion assets are proprietary to Burrah and 51DigitalMedia LLP.",
    "- You may not reproduce or redistribute materials without written consent.",
    "5. Distributor & Partner Submissions",
    "- Information shared for partnership evaluation must be truthful and lawful.",
    "- Acceptance into the Burrah network is at our sole discretion.",
    "6. Limitation of Liability",
    "- We provide the site \"as is\" and disclaim warranties to the fullest extent permitted by law.",
    "- Burrah is not liable for indirect, incidental, or consequential damages arising from site use.",
    "7. Third-Party Services",
    "- Embedded content and outbound links follow their own policies; review them before engagement.",
    "- We are not responsible for external service performance or availability.",
    "8. Governing Law",
    "- These Terms are governed by the laws of India and the courts of Punjab have exclusive jurisdiction.",
    "9. Changes to Terms",
    "- We may update these Terms as offerings evolve; continued use signifies acceptance of revisions.",
    "10. Contact",
    "- support@sipburrah.com | +91 99888 77665 | 51DigitalMedia LLP, Punjab, India."
  ]
);
