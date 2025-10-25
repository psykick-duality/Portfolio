import Link from "next/link";
import Image from "next/image";

// Import local images (must match exact filenames)
import login from "./lp-login.jpg";
import subsOptions from "./subs-options.jpg";
import errorFormat from "./error-shows-format.jpg";
import bruteCode from "./brute-code.jpg";
import addedSubs from "./added-subs-2073.jpg";

export default function BusinessLogicSubs() {
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
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                Critical
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                Impact: $50 per exploit
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
              From Remote IDs to Free Rides: Unauthorized Subscription Extensions
              in [Redacted Student App]
            </h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {[
                "Business Logic Flaw",
                "IDOR",
                "Authorization Bypass",
                "Brute Force",
                "Subscription Fraud",
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

          {/* Main Body */}
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <h2 className="text-2xl font-bold text-primary">🧠 TL;DR</h2>
            <p>
              A single endpoint let me stack premium subscription time without
              paying a cent. By exploiting predictable IDs, verbose validation
              messages, and zero rate-limiting, I extended premium access by
              decades — no injections, no stolen creds, just pure business logic
              abuse.
            </p>

            <h2 className="text-2xl font-bold text-primary">🕵️ Background</h2>
            <p>
              The [Redacted Student App] offers subscription perks when users
              register purchased remotes. The API that handled these
              registrations turned out to be a treasure chest:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Only used client-side format validation</li>
              <li>Leaked format requirements in errors</li>
              <li>Accepted predictable alphanumeric codes</li>
              <li>No CAPTCHA or rate-limiting</li>
            </ul>

            <div className="rounded border border-border p-3">
              <Image
                src={login}
                alt="Login interface for student app"
                width={900}
                height={480}
                className="rounded"
              />
              <p className="text-xs mt-2">
                Initial login flow — standard user account for testing.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary">🔎 Discovery Steps</h2>

            <h3 className="text-xl font-bold text-primary">✅ Step 1: Legit Flow</h3>
            <p>
              Logged in and registered a device via the UI. Observed a
              predictable POST request:
            </p>
            <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
              {`POST /student/remote/register
{
  "remote_id": "ABC1234F"
}`}
            </pre>

            <div className="rounded border border-border p-3">
              <Image
                src={subsOptions}
                alt="Subscription options before exploit"
                width={900}
                height={480}
                className="rounded"
              />
              <p className="text-xs mt-2">
                Normal subscription UI flow before the vulnerability.
              </p>
            </div>

            <h3 className="text-xl font-bold text-primary">🚫 Step 2: Invalid Test</h3>
            <p>
              Sent an invalid payload to test validation behavior:
            </p>
            <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
              {`{
  "remote_id": "NOTVALID"
}`}
            </pre>
            <p>Response:</p>
            <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
              "Remote Code is not a valid ID. IDs are 8 characters long and contain only A-F and 0-9."
            </pre>

            <p>
              The app just leaked its entire regex validation logic in an error
              response — effectively telling me how to craft valid codes.
            </p>

            <div className="rounded border border-border p-3">
              <Image
                src={errorFormat}
                alt="Error message showing ID format"
                width={900}
                height={480}
                className="rounded"
              />
              <p className="text-xs mt-2">
                Validation error revealing format pattern and input rules.
              </p>
            </div>

            <h3 className="text-xl font-bold text-primary">🔍 Step 3: Leaked Valid Codes</h3>
            <p>
              Searching public resources revealed multiple PDFs and articles
              containing test or example remote IDs. These became the base for
              generating valid code candidates.
            </p>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Official documentation samples</li>
              <li>Support forum posts with “example” IDs</li>
              <li>Cached logs on GitHub issues</li>
            </ul>

            <h3 className="text-xl font-bold text-primary">📈 Step 4: Brute-Forcing Begins</h3>
            <p>
              Wrote a small Python script to combine leaked codes and generated
              IDs matching the exposed regex. The endpoint had:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>No CAPTCHA</li>
              <li>No rate limit</li>
              <li>No IP block or account throttling</li>
            </ul>
            <p>
              Result: dozens of <code>200 OK</code> responses. Each valid hit
              extended the subscription.
            </p>

            <div className="rounded border border-border p-3">
              <Image
                src={bruteCode}
                alt="Brute force script results"
                width={900}
                height={480}
                className="rounded"
              />
              <p className="text-xs mt-2">
                Scripted brute-forcing using leaked and generated codes.
              </p>
            </div>

            <h3 className="text-xl font-bold text-primary">🎁 Step 5: Unlimited Subscriptions</h3>
            <p>
              Each valid code added 4 years of premium access. After stacking a
              few dozen, the app proudly displayed:
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic">
              “Subscription valid until 2073.”
            </blockquote>

            <div className="rounded border border-border p-3">
              <Image
                src={addedSubs}
                alt="Added subscription expiration 2073"
                width={900}
                height={480}
                className="rounded"
              />
              <p className="text-xs mt-2">
                Subscription extended decades beyond intended duration.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary">🚨 Impact Snapshot</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Unlimited premium activation ($50/code)</li>
              <li>Potential resale or black-market abuse</li>
              <li>Massive revenue loss risk</li>
              <li>Exploitable by low-skill attackers</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary">🧰 Root Cause</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Business logic trusted user-supplied identifiers</li>
              <li>Error messages revealed internal validation logic</li>
              <li>Codes weren’t unique or identity-bound</li>
              <li>No brute-force or replay defenses</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary">🛠️ Recommendations</h2>
            <div className="space-y-4">
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">1️⃣ Scrub Format Hints</p>
                <p className="text-sm">
                  Don’t expose internal validation logic or regex rules in error
                  responses.
                </p>
              </div>
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">2️⃣ Rate Limiting + CAPTCHA</p>
                <p className="text-sm">
                  Enforce per-user and per-IP restrictions with human
                  verification challenges.
                </p>
              </div>
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">3️⃣ Rotate Leaked Codes</p>
                <p className="text-sm">
                  Purge or disable any exposed remote IDs from public materials.
                </p>
              </div>
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">4️⃣ One-Time Use Tokens</p>
                <p className="text-sm">
                  Each code should be single-use and bound to a verified account
                  or device.
                </p>
              </div>
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">5️⃣ Multi-Factor Validation</p>
                <p className="text-sm">
                  Require device-side verification or purchase receipt before
                  applying credits.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-primary">🧠 Final Thought</h2>
            <p>
              This wasn’t a “loud” exploit — no injections, no crashes, no
              backdoors. Just a quiet business logic flaw that handed out real
              monetary value to anyone paying attention.
            </p>
            <p>
              Sometimes, the most devastating vulnerabilities are the ones that
              simply trust too much.
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
