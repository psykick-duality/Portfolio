import Link from 'next/link';
import Image from 'next/image';

// Images (ensure these files are in the same folder as this page)
import addingAccFail from './addingaccfail.jpg';
import fnameSql from './fnamesql.jpg';
import fullPayload from './fullpayload.jpg';
import req from './req.jpg';
import reqBasicPayloads from './reqbasicpayloads.jpg';
import sqlVers from './sqlvers.jpg';
import superadmin from './superadmin.jpg';
import superadminDashboard from './superadmindashboard.jpg';

export default function BlindSQLiWriteup() {
  return (
    <div className="min-h-screen grid-pattern py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/writeups" className="text-primary hover:underline mb-6 inline-flex items-center gap-2">
          ← Back to Writeups
        </Link>

        <article className="mt-6">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                CVSS 9.8
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                CRITICAL
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
              Image Upload Gone Wild: Blind SQLi to Superadmin in Disguise
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {['Blind SQL Injection', 'Second-Order Injection', 'Privilege Escalation', 'Business Logic'].map((tag) => (
                <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20">
                  #{tag}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground">
              Published: November 20, 2024
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <h2 className="text-2xl font-bold text-primary mt-8">🧠 TL;DR</h2>
            <p className="italic text-lg">"It's just an image upload form. What's the worst that could happen?"</p>
            <p>Turns out: quite a lot. Blind SQL injection through the filename of an uploaded image led to a stored update, which allowed me to take over a superadmin account and exfiltrate DB metadata via a second endpoint.</p>

            <h2 className="text-2xl font-bold text-primary mt-8">🎯 Discovery: Where Curiosity Kicked In</h2>
            <p>I started by fuzzing the image upload endpoints and watching how the server used the filename parameter.</p>

            <p className="font-semibold">Observed request (multipart/form-data; filename param):</p>
            <div className="rounded border border-border p-3">
              <Image
                src={req}
                alt="Request: multipart form-data with filename parameter"
                width={900}
                height={420}
                style={{ objectFit: 'contain' }}
                className="rounded"
              />
              <p className="text-xs mt-2">Request capture showing the filename field inside multipart form-data.</p>
            </div>

            <p>Initial payload attempts and basic variations exposed interesting server behavior (the app tried to treat the filename as SQL-relevant in some DB update flow):</p>
            <div className="rounded border border-border p-3">
              <Image
                src={reqBasicPayloads}
                alt="Initial requests and basic payload attempts"
                width={900}
                height={400}
                style={{ objectFit: 'contain' }}
                className="rounded"
              />
              <p className="text-xs mt-2">A selection of initial attempts — typical filename-based injection strings.</p>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-8">🛑 First Barrier: Forced .jpg Extension</h2>
            <p>The server appended <code>.jpg</code> to filenames, which initially broke naive payloads (they became syntactically invalid in the constructed SQL statements).</p>

            <p>Example of how the forced extension caused malformed SQL:</p>
            <div className="rounded border border-border p-3">
              <Image
                src={fullPayload}
                alt="Full crafted payload and server reaction"
                width={900}
                height={420}
                style={{ objectFit: 'contain' }}
                className="rounded"
              />
              <p className="text-xs mt-2">Server response showing the constructed SQL and how the appended <code>.jpg</code> affected parsing.</p>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-8">🧠 Round Two: Bypass the Extension with SQL Functions</h2>
            <p>The workaround was to use SQL functions: <code>concat()</code> and <code>char()</code> to reconstruct dots and email addresses so the appended <code>.jpg</code> didn't break the payload logic.</p>

            <p className="font-semibold">Filename-based SQL injection example (using <code>char(46)</code> to insert dots):</p>
            <div className="rounded border border-border p-3">
              <Image
                src={fnameSql}
                alt="Filename-based SQL injection using concat and char"
                width={900}
                height={420}
                style={{ objectFit: 'contain' }}
                className="rounded"
              />
              <p className="text-xs mt-2">Screenshot showing the filename field containing concat/char constructs to bypass forced .jpg behavior.</p>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-8">💣 Payload Mechanics (what I injected)</h2>
            <p>The final payload pattern closed the original SQL literal, injected an <code>UPDATE</code> that set the target user's <code>email</code> / <code>fname</code>, and commented out the rest. Example (conceptual):</p>

            <pre className="bg-background p-4 rounded border border-border overflow-x-auto">
              <code>
Rocky', email=concat('dilip',char(46),'prasad@'security,char(46),'io'), fname='dilip' where email=concat('fapatrick1230@gmail',char(46),'com')#
              </code>
            </pre>

            <p>Below is a request snapshot of the crafted payload being sent in the filename parameter and the server response reflecting the <code>UPDATE</code> action.</p>
            <div className="rounded border border-border p-3">
              <Image
                src={fullPayload}
                alt="Full crafted payload and confirmation of update in server response"
                width={900}
                height={420}
                style={{ objectFit: 'contain' }}
                className="rounded"
              />
              <p className="text-xs mt-2">Same capture shown again for emphasis on the actual SQL UPDATE call constructed server-side.</p>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-8">🔁 Adding Account Attempts & Interesting Server Responses</h2>
            <p>Some attempts caused server-side errors or redirects — those responses helped refine where the DB update was happening and what fields were affected.</p>
            <div className="rounded border border-border p-3">
              <Image
                src={addingAccFail}
                alt="Server response showing failure or unusual response"
                width={900}
                height={420}
                style={{ objectFit: 'contain' }}
                className="rounded"
              />
              <p className="text-xs mt-2">Response capture showing a server error/redirect after a particular filename payload.</p>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-8">👣 Step into Superadmin Shoes (post-exploit)</h2>
            <p>After I successfully updated the target user's email to one I control, I authenticated and found the account had escalated privileges.</p>

            <div className="rounded border border-border p-3">
              <Image
                src={superadmin}
                alt="Logged in as the compromised superadmin user - profile"
                width={900}
                height={500}
                style={{ objectFit: 'contain' }}
                className="rounded"
              />
              <p className="text-xs mt-2">Profile page showing the compromised superadmin account details.</p>
            </div>

            <p>Full admin interface and user management were accessible:</p>
            <div className="rounded border border-border p-3">
              <Image
                src={superadminDashboard}
                alt="Superadmin dashboard and user management view"
                width={900}
                height={520}
                style={{ objectFit: 'contain' }}
                className="rounded"
              />
              <p className="text-xs mt-2">Superadmin dashboard & user list demonstrating privileges obtained.</p>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-8">🔍 Second-Order Injection & Data Exfiltration</h2>
            <p>I then planted a value (e.g. <code>(select @@version)</code>) into a field and retrieved it via another endpoint — classic second-order SQLi.</p>
            <div className="rounded border border-border p-3">
              <Image
                src={sqlVers}
                alt="Second-order injection revealing @@version via an endpoint"
                width={900}
                height={420}
                style={{ objectFit: 'contain' }}
                className="rounded"
              />
              <p className="text-xs mt-2">Endpoint response showing DB/server metadata leaked back (version etc.).</p>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-8">🚨 Impact Summary</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>✅ Superadmin account takeover via filename-based stored SQL UPDATE</li>
              <li>✅ Second-order injection allowed metadata exfiltration (DB version, server info)</li>
              <li>✅ Persistent risk — uploaded filenames are stored and used by other flows</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-8">🛠️ Tools & Skills</h2>
            <p>Burp Suite for capturing requests, careful SQL function composition (concat/char) to bypass forced extension, and logic-driven testing to discover second-order sinks.</p>

            <h2 className="text-2xl font-bold text-primary mt-8">🔒 Recommendations</h2>
            <div className="space-y-4">
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">🔐 Use parameterized queries for all DB operations (including filenames)</p>
              </div>
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">🧹 Sanitize & normalize filenames on server-side</p>
              </div>
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">🔁 Audit all places that consume uploaded filenames (second-order sinks)</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-8">🏁 Final Thoughts</h2>
            <p>This exploit is a reminder that even seemingly harmless metadata — filenames — can become powerful attack vectors when they cross application logic boundaries.</p>
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
