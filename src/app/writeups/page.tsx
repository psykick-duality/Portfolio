// app/writeups/page.tsx
import Link from "next/link";

const writeups = [
  {
    id: "blind-sqli-image-upload-superadmin",
    title: "Image Upload Gone Wild: Blind SQLi to Superadmin in Disguise",
    severity: "Critical",
    cvss: "9.8",
    date: "2024-11-20",
    description:
      "Discovered blind SQL injection hidden in a filename through file upload, leveraged via second-order logic to escalate privileges to superadmin. Combined creativity, SQL trickery, and business logic abuse to achieve full compromise.",
    tags: [
      "Blind SQL Injection",
      "Second-Order Injection",
      "Privilege Escalation",
      "Business Logic",
    ],
  },

  // --- NEW WRITEUP ---
  {
    id: "header-to-superadmin",
    title: '"checkuserlogin: yes" — The Header That Gave Me SuperAdmin Powers',
    severity: "Critical",
    cvss: "9.8",
    date: "2025-02-20",
    description:
      "A forgotten developer header left active in production allowed global authentication bypass. Simply adding 'checkuserlogin: yes' to any request granted full SuperAdmin privileges and unrestricted PII access.",
    tags: [
      "Broken Access Control",
      "Design Flaw",
      "Auth Bypass",
      "Account Takeover",
      "PII Exposure",
    ],
  },

  // legacy entry (kept)
  {
    id: "otp-bypass-loan-fraud",
    title:
      "OTP Bypass to Full Data Exfiltration: How One Endpoint Gave Up the Goods",
    severity: "Critical",
    cvss: "9.1",
    date: "2025-01-01",
    description:
      "Credential leakage via a Base64 response and an unscoped admin token allowed OTP bypass, enumeration of numeric application IDs, and exfiltration of full loan/PII records. High impact with low effort required.",
    tags: [
      "Auth Bypass",
      "Credential Leakage",
      "IDOR",
      "Bruteforce",
      "API Misconfiguration",
    ],
  },

{
  id: "leakedcreds-dumploans",
  title: "Leaked Creds to Full Data Exfiltration: How One Endpoint Gave Up the Goods",
  severity: "Critical",
  cvss: "9.1",
  date: "2025-03-01",
  description:
    "A single leaked Base64 credential chain led to full data exfiltration of loan records via misconfigured APIs and missing auth checks.",
  tags: [
    "Auth Bypass",
    "Credential Leakage",
    "IDOR",
    "Bruteforce",
    "API Misconfiguration",
  ],
},

{
  id: "oauth-acctakeover",
  title: "OAuth Misconfiguration in EdTech App: From Low Privilege to Full Account Takeover",
  severity: "High",
  cvss: "8.1",
  date: "2025-03-02",
  description:
    "An OAuth misconfiguration allowed arbitrary identity linking and privilege escalation via unvalidated account association, enabling student-to-instructor takeovers.",
  tags: [
    "OAuth",
    "Session Misbinding",
    "Federated Identity",
    "Account Takeover",
    "Privilege Escalation",
  ],
},

{
  id: "business-logic-subs",
  title: "From Remote IDs to Free Rides: Unauthorized Subscription Extensions in [Redacted Student App]",
  severity: "Critical",
  cvss: "9.5",
  date: "2025-03-05",
  description:
    "Exploited a predictable remote registration endpoint with no rate limits or identity binding to stack free premium subscriptions — a business logic flaw with direct monetary impact.",
  tags: [
    "Business Logic Flaw",
    "IDOR",
    "Authorization Bypass",
    "Brute Force",
    "Subscription Fraud",
  ],
},

{
  id: "business-logic-bypass",
  title: "Flipping the Switch: Business Logic Bypass in [Redacted Legal Search Platform]",
  severity: "High",
  cvss: "8.0",
  date: "2025-04-02",
  description:
    "A query parameter tweak (`searchMode=PROMODE`) unlocked full premium search functionality with no auth or role checks, revealing a classic backend authorization gap.",
  tags: [
    "Business Logic",
    "Access Control Bypass",
    "Feature Abuse",
    "Unauthorized Access",
    "Freemium Misuse",
  ],
},

];

export default function Writeups() {
  return (
    <div className="min-h-screen grid-pattern py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <span className="text-primary">$</span>
            <span className="font-mono text-sm">ls -la writeups/</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
            Bug Bounty Writeups
          </h1>
          <p className="text-muted-foreground text-lg">
            Detailed technical writeups of vulnerabilities discovered during
            security research and bug bounty hunting.
          </p>
        </div>

        <div className="space-y-6">
          {writeups.map((writeup) => (
            <article
              key={writeup.id + writeup.date}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {writeup.title}
                </h2>
                <div className="flex gap-2">
                  {writeup.cvss && (
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                      CVSS {writeup.cvss}
                    </span>
                  )}
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-bold ${
                      writeup.severity === "Critical"
                        ? "bg-red-500/10 text-red-500 border border-red-500/20"
                        : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                    }`}
                  >
                    {writeup.severity}
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{writeup.description}</p>

              <div className="flex flex-wrap gap-2 mb-4 mt-4">
                {writeup.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="text-muted-foreground">
                  <span>{writeup.date}</span>
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    href={`/writeups/${writeup.id}`}
                    className="text-primary hover:underline font-medium"
                  >
                    Read Full Writeup →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
