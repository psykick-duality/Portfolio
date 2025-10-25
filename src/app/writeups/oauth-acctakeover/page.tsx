import Link from "next/link";
import Image from "next/image";

// Import your local images (filenames must match exactly)
import accBeforeAssociation from "./acc-b4-association.jpg";
import afterAssociation from "./after-association.jpg";
import linkedFedReefAcc from "./linked-fed-reef-acc.jpg";
import validAccNotAssociated from "./validacc-notassociated.jpg";

export default function OAuthAccountTakeover() {
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
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20">
                CVSS 8.1
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20">
                HIGH
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
              OAuth Misconfiguration in EdTech App: From Low Privilege to Full
              Account Takeover
            </h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {[
                "OAuth",
                "Session Misbinding",
                "Federated Identity",
                "Account Takeover",
                "Privilege Escalation",
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
            <h2 className="text-2xl font-bold text-primary">🧠 TL;DR</h2>
            <p>
              A subtle OAuth misconfiguration turned a basic student account
              into a full instructor-level takeover vector. Through session
              misbinding, trust flaws in federated linking, and blind endpoint
              trust, I escalated privileges silently — without phishing,
              password resets, or brute force.
            </p>
            <p>
              The exploit chain allowed enumeration of unlinked federated
              accounts and arbitrary account association — leading to complete
              privilege escalation.
            </p>

            <h2 className="text-2xl font-bold text-primary">🗺️ Target Application</h2>
            <p>
              The target was an EdTech cloud platform supporting both standard
              email/password accounts and federated campus logins via OAuth.
              Users could link their campus identity to the main platform
              account — and that’s where the issue lived.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Standard app users (email/password)</li>
              <li>Federated OAuth users (campus logins)</li>
              <li>Loose account-linking mechanism</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary">🔓 Vulnerability Breakdown</h2>
            <p>Affected endpoints:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <code>/federation/account/association/check</code>
              </li>
              <li>
                <code>/student/federated/associate</code>
              </li>
            </ul>
            <p>
              These endpoints failed to enforce proper session validation,
              trusted origin headers, and lacked mutual consent verification.
              Together, they created a perfect storm for OAuth misbinding and
              silent privilege escalation.
            </p>

            <h2 className="text-2xl font-bold text-primary">
              🔢 Exploit Chain Walkthrough
            </h2>

            <h3 className="text-xl font-bold text-primary">
              ✅ Step 1: Auth as a Basic User
            </h3>
            <p>
              I logged in as a normal student user, capturing my active session
              cookie for later use. The goal: abuse this valid session to bind
              it to another account.
            </p>

            <div className="rounded border border-border p-3">
              <Image
                src={validAccNotAssociated}
                alt="Valid account not yet federated"
                width={900}
                height={480}
                className="rounded"
              />
              <p className="text-xs mt-2">
                My standard student account prior to federation linking.
              </p>
            </div>

            <h3 className="text-xl font-bold text-primary">
              🔍 Step 2: Account Enumeration
            </h3>
            <p>
              The endpoint <code>/federation/account/association/check</code>{" "}
              was accessible anonymously. By sending POST requests with identity
              parameters, I could determine which federated identities were
              already linked — and which were still “available”.
            </p>
            <p>This effectively became an oracle for valid identity IDs.</p>

            <div className="rounded border border-border p-3">
              <Image
                src={accBeforeAssociation}
                alt="Federation account association check"
                width={900}
                height={480}
                className="rounded"
              />
              <p className="text-xs mt-2">
                Checking account association status via open federation API.
              </p>
            </div>

            <h3 className="text-xl font-bold text-primary">🔄 Step 3: Link the Accounts</h3>
            <p>
              I crafted a POST request to{" "}
              <code>/student/federated/associate</code>:
            </p>

            <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
              {`{
  "victim_identity_id": "X",
  "attacker_account_id": "Y"
}`}
            </pre>

            <p>Headers:</p>
            <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
              Cookie: session=[student_session]
            </pre>

            <p>
              No verification occurred to confirm that I owned either the
              attacker or victim identity. The server simply linked them.
            </p>

            <div className="rounded border border-border p-3">
              <Image
                src={linkedFedReefAcc}
                alt="Federation link request result"
                width={900}
                height={480}
                className="rounded"
              />
              <p className="text-xs mt-2">
                Federation successfully linked without any ownership validation.
              </p>
            </div>

            <h3 className="text-xl font-bold text-primary">💥 Step 4: Full Takeover</h3>
            <p>
              Once associated, my student session gained access to the victim’s
              account — including instructor tools, class data, and personally
              identifiable information (PII).
            </p>

            <div className="rounded border border-border p-3">
              <Image
                src={afterAssociation}
                alt="After association account view"
                width={900}
                height={480}
                className="rounded"
              />
              <p className="text-xs mt-2">
                My session post-association: now operating under instructor-level privileges.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary">📦 Real-World Fallout</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Instructor accounts hijacked silently</li>
              <li>Full access to courses, grades, and user data</li>
              <li>Privilege escalation from student to teacher</li>
              <li>Potential for automation and mass exploitation</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary">🛠 Techniques & Approach</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Deep understanding of OAuth and session-binding logic</li>
              <li>Manual probing of federation endpoints</li>
              <li>Creative chaining of passive and active responses</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary">
              🔒 Remediation Strategies
            </h2>
            <div className="space-y-4">
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">1️⃣ Session Binding</p>
                <p className="text-sm">
                  Link actions must verify active ownership of both the
                  initiating and target accounts.
                </p>
              </div>
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">2️⃣ Rate Limiting</p>
                <p className="text-sm">
                  Protect association-check endpoints from enumeration via brute
                  force or batching.
                </p>
              </div>
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">3️⃣ Explicit Consent</p>
                <p className="text-sm">
                  Require user confirmation before linking accounts or merging
                  identities.
                </p>
              </div>
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">4️⃣ Notifications</p>
                <p className="text-sm">
                  Notify users of new or removed federation associations in real
                  time.
                </p>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-primary">🧠 Final Thoughts</h2>
            <p>
              OAuth depends on trust — but trust must always be verified. This
              bug didn’t break crypto or require social engineering. It simply
              exploited misplaced confidence in session state and linking
              assumptions.
            </p>
            <p>
              In federated systems, assuming “identity equals ownership” is
              dangerous. One missing session check can mean total compromise.
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
