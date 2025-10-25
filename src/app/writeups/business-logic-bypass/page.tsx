import Link from "next/link";
import Image from "next/image";

// Import local images
import login from "./lp-login.jpg";
import proSearchDisabled from "./prosearchdisabled.jpg";
import subs from "./subs.jpg";
import bypassing from "./bypassing.jpg";

export default function BusinessLogicBypass() {
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
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20">
                High Severity
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
              Flipping the Switch: Business Logic Bypass in [Redacted Legal Search Platform]
            </h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {[
                "Business Logic",
                "Access Control Bypass",
                "Feature Abuse",
                "Unauthorized Access",
                "Freemium Misuse",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground">Published: April 2025</p>
          </div>

          {/* Body */}
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <h2 className="text-2xl font-bold text-primary">🧠 TL;DR</h2>
            <p>
              In [Redacted Legal Platform], I discovered a simple yet powerful
              logic flaw that allowed full access to Pro-level search features —
              without a subscription, login, or authorization. All it took was
              changing a single query parameter:
            </p>
            <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
              searchMode=PROMODE
            </pre>
            <p>
              The app trusted the frontend UI to restrict Pro features, but the
              backend never validated the user’s subscription or role.
            </p>

            <h2 className="text-2xl font-bold text-primary">🔢 Why This Was Serious</h2>
            <p>
              The Pro plan was a paid tier with features like:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Advanced municipal law search</li>
              <li>Jurisdiction-wide coverage</li>
              <li>Saved searches and analytics tools</li>
            </ul>
            <p>
              By flipping a single parameter, all these became freely available
              — representing both financial loss and exposure of premium content.
            </p>

            <h2 className="text-2xl font-bold text-primary">🔍 Exploit Breakdown</h2>

            <h3 className="text-xl font-bold text-primary">✅ Step 1: Basic User Login</h3>
            <p>
              Logged in as a regular (free) user. The UI clearly disabled Pro
              search features and greyed-out premium tabs.
            </p>

            <div className="rounded border border-border p-3">
              <Image
                src={login}
                alt="Login interface of the platform"
                width={900}
                height={480}
                className="rounded"
              />
              <p className="text-xs mt-2">
                Logged in as a free-tier user. “Pro” features visibly disabled.
              </p>
            </div>

            <div className="rounded border border-border p-3">
              <Image
                src={proSearchDisabled}
                alt="Pro search disabled interface"
                width={900}
                height={480}
                className="rounded"
              />
              <p className="text-xs mt-2">
                The Pro Search option was grayed out for non-paying users.
              </p>
            </div>

            <h3 className="text-xl font-bold text-primary">✅ Step 2: Modify the Query</h3>
            <p>
              Observed normal search requests such as:
            </p>
            <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
              https://library.[redacted].com/search?searchMode=MUNICIPAL&searchText=zoning
            </pre>
            <p>
              Changed <code>searchMode=MUNICIPAL</code> to{" "}
              <code>searchMode=PROMODE</code>:
            </p>
            <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
              https://library.[redacted].com/search?searchMode=PROMODE&searchText=law
            </pre>
            <p>
              Instantly, the Pro search interface unlocked — returning extended
              results, premium datasets, and saved search tools.
            </p>

            <div className="rounded border border-border p-3">
              <Image
                src={bypassing}
                alt="Bypassing parameter to enable Pro mode"
                width={900}
                height={480}
                className="rounded"
              />
              <p className="text-xs mt-2">
                Switching the query parameter unlocked full Pro functionality.
              </p>
            </div>

            <h3 className="text-xl font-bold text-primary">✅ Step 3: Confirm Full Access</h3>
            <p>
              Verified that advanced search tools, Pro-only filters, and data
              visualizations were fully functional. Even account-level features
              like saved searches became accessible.
            </p>

            <div className="rounded border border-border p-3">
              <Image
                src={subs}
                alt="Subscription page showing Pro-level access"
                width={900}
                height={480}
                className="rounded"
              />
              <p className="text-xs mt-2">
                Pro-tier tools available without valid subscription.
              </p>
            </div>

            <h3 className="text-xl font-bold text-primary">🚪 Bonus Exploit: No Login Required</h3>
            <p>
              Tested the same endpoint in incognito mode (no session cookie).
              The backend responded identically — Pro search results returned
              even for anonymous users.
            </p>
            <p>
              No authentication. No validation. Just one unguarded query flag.
            </p>

            <h2 className="text-2xl font-bold text-primary">🚥 Business Impact</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>💰 Direct revenue loss from premium access leakage</li>
              <li>🔓 Full bypass of access control logic</li>
              <li>📊 Exposure of paid subscriber features</li>
              <li>⚖️ Potential legal exposure from content misuse</li>
              <li>⏳ Highly scriptable and scalable for abuse</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary">🧠 Root Cause</h2>
            <p>
              This wasn’t a traditional vulnerability — it was a business logic
              oversight:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>UI enforced restrictions visually</li>
              <li>Backend lacked authorization checks</li>
              <li>Assumed “hidden = protected”</li>
            </ul>
            <blockquote className="border-l-4 border-primary pl-4 italic">
              “The door was hidden… but not locked.”
            </blockquote>

            <h2 className="text-2xl font-bold text-primary">🛠️ Recommended Fixes</h2>
            <div className="space-y-4">
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">🔐 1. Enforce Role-Based Access</p>
                <p className="text-sm">
                  Validate user entitlements server-side before granting Pro
                  features or results.
                </p>
              </div>
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">🚫 2. Don’t Trust the UI</p>
                <p className="text-sm">
                  Frontend visibility controls must never substitute backend
                  permission checks.
                </p>
              </div>
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">📊 3. Monitor Feature Access</p>
                <p className="text-sm">
                  Implement telemetry to detect non-subscribed accounts using
                  Pro features.
                </p>
              </div>
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">🔄 4. Validate Query Params</p>
                <p className="text-sm">
                  Reject or sanitize unauthorized feature parameters like{" "}
                  <code>searchMode=PROMODE</code> for unentitled users.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-primary">🧠 Final Thoughts</h2>
            <p>
              The best vulnerabilities often don’t require breaking code — just
              breaking assumptions. When systems rely on frontend logic to
              enforce privilege, a single URL parameter can become the key to
              everything.
            </p>
            <p>
              This was a reminder that access control is not a visual feature —
              it’s a backend responsibility.
            </p>
          </div>

          {/* Footer */}
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
