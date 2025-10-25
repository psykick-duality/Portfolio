import Link from "next/link";
import Image from "next/image";

// import local images (ensure filenames match exactly)
import login from "./login.jpg";
import enterpan from "./enterpan.jpg";
import leakedCredsReq from "./leakedcredsreq.jpg";
import b64decodeLeaked from "./b64decodeleaked.jpg";
import authTokenUsingLeakCreds from "./authtokenusingleakcreds.jpg";
import bruteForceLoanDetails from "./bruteforceloandetails.jpg";
import loanDetailsAPI from "./loandetailsapi.jpg";

export default function LeakedCredsDumpLoans() {
  return (
    <div className="min-h-screen grid-pattern py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/writeups"
          className="text-primary hover:underline inline-flex items-center gap-2"
        >
          ← Back to Writeups
        </Link>

        <article className="mt-6">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                CVSS 9.1
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                CRITICAL
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
              Leaked Creds to Full Data Exfiltration: How One Endpoint Gave Up
              the Goods
            </h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {[
                "Auth Bypass",
                "Credential Leakage",
                "IDOR",
                "Bruteforce",
                "API Misconfiguration",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground">Published: March 2025</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <h2 className="text-2xl font-bold text-primary">🧠 Quick Context</h2>
            <p>
              Imagine uploading your PAN, mobile number, and personal details to
              apply for a loan — trusting that it’s safe behind OTP verification
              and firewalls. Now imagine all that data being accessible to
              anyone with a Burp Suite and a few minutes.
            </p>
            <p>
              This wasn’t a single-user issue. It was a full-scale exposure of
              all users’ loan information due to poor authentication design and
              insecure API logic.
            </p>

            <h2 className="text-2xl font-bold text-primary">
              🛣️ The Road to Total Pwnage
            </h2>
            <p>
              This wasn’t luck. It took methodical testing and patient analysis.
              Let’s walk through the discovery — from login to complete backend
              compromise.
            </p>

            <h2 className="text-2xl font-bold text-primary">
              🧩 Step 1: OTP Auth? More Like Optional-Trouble Protocol
            </h2>
            <p>
              The application used PAN + mobile for login and OTP verification
              for access. During a login test, I intercepted the flow in Burp
              Suite and inspected the traffic closely.
            </p>

            <div className="rounded border border-border p-3">
              <Image
                src={login}
                alt="Login interface"
                width={900}
                height={480}
                className="rounded"
              />
              <p className="text-xs mt-2">
                Initial login — PAN + mobile number with OTP-based flow.
              </p>
            </div>

            <div className="rounded border border-border p-3">
              <Image
                src={enterpan}
                alt="PAN entry request"
                width={900}
                height={420}
                className="rounded"
              />
              <p className="text-xs mt-2">
                PAN submission request captured via Burp Proxy.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary">🫣 Step 2: The Base64 Blunder</h2>
            <p>
              While analyzing OTP submission responses, I noticed one endpoint
              returning a suspicious Base64-encoded string.
            </p>
            <p>
              Decoding it revealed hardcoded credentials for an internal support
              account — including a plaintext email and password. This was a
              direct credential leakage vulnerability.
            </p>

            <div className="rounded border border-border p-3">
              <Image
                src={leakedCredsReq}
                alt="Leaked creds request"
                width={900}
                height={420}
                className="rounded"
              />
              <p className="text-xs mt-2">
                The request revealing encoded credentials in the response body.
              </p>
            </div>

            <div className="rounded border border-border p-3">
              <Image
                src={b64decodeLeaked}
                alt="Base64 decode leak"
                width={900}
                height={400}
                className="rounded"
              />
              <p className="text-xs mt-2">
                Decoding Base64 revealed hardcoded credentials (never do this).
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary">
              🔓 Step 3: Turning Credentials into Gold (or PII)
            </h2>
            <p>
              Using those leaked credentials, I logged into the internal admin
              API and received a valid <code>AuthToken</code>. The token had:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>No session binding</li>
              <li>No scope</li>
              <li>No tenant isolation</li>
            </ul>
            <p>
              By altering user IDs in the requests, I could impersonate any user
              and access their loan information.
            </p>

            <div className="rounded border border-border p-3">
              <Image
                src={authTokenUsingLeakCreds}
                alt="Auth token obtained from leaked credentials"
                width={900}
                height={420}
                className="rounded"
              />
              <p className="text-xs mt-2">
                Auth token retrieved using leaked credentials — totally valid.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary">
              🔁 Step 4: Brute Forcing Like It’s 1999
            </h2>
            <p>
              The loan retrieval API accepted numeric application IDs. No
              CAPTCHA. No rate limit. No IP throttling.
            </p>
            <p>
              Using a simple Python loop, I enumerated IDs and retrieved full
              records — complete with PAN, phone number, loan amount, and
              application status.
            </p>

            <div className="rounded border border-border p-3">
              <Image
                src={bruteForceLoanDetails}
                alt="Bruteforced loan records"
                width={900}
                height={520}
                className="rounded"
              />
              <p className="text-xs mt-2">
                Burp Intruder results showing successful brute-forced loan IDs.
              </p>
            </div>

            <div className="rounded border border-border p-3">
              <Image
                src={loanDetailsAPI}
                alt="Loan details API response"
                width={900}
                height={520}
                className="rounded"
              />
              <p className="text-xs mt-2">
                API response exposing full loan details with personal data.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary">🎯 Real-World Impact</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Mass PII and financial data exposure</li>
              <li>Unrestricted data exfiltration using public endpoints</li>
              <li>High fraud potential via impersonation and loan manipulation</li>
              <li>Loss of user trust and compliance violations</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary">🧰 Tools Used</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Burp Suite Pro – for interception and replay</li>
              <li>Python Scripts – for ID enumeration & brute-forcing</li>
              <li>Base64 Decoder – for quick inspection of encoded payloads</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary">🛠 Recommendations</h2>
            <div className="space-y-4">
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">🔒 Don’t Embed Credentials</p>
                <p className="text-sm">
                  Never hardcode internal accounts or credentials in API
                  responses — use secure service accounts or environment vars.
                </p>
              </div>

              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">🚧 Enforce Auth Scoping</p>
                <p className="text-sm">
                  Bind AuthTokens to user sessions and enforce tenant isolation
                  on backend endpoints.
                </p>
              </div>

              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">🧱 Add Rate Limiting</p>
                <p className="text-sm">
                  Brute-force prevention via CAPTCHA, rate limits, and WAF
                  throttling is essential for public-facing APIs.
                </p>
              </div>

              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">📊 Audit Logging</p>
                <p className="text-sm">
                  Track abnormal API usage patterns — flag repeated sequential
                  requests that indicate enumeration.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-primary">🧠 Final Thoughts</h2>
            <p>
              This case reinforces a core truth: security failures often hide in
              plain sight. A single overlooked header, a misplaced token, or a
              careless Base64 string can compromise an entire ecosystem. Always
              validate assumptions — and never trust the client.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/writeups"
              className="text-primary hover:underline inline-flex items-center gap-2"
            >
              ← Back to all writeups
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
