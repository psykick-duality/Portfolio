import Link from 'next/link';
import Image from 'next/image';

// Images (place these files in the same folder as this page)
import loginImg from './login.jpg';
import loginOTP from './loginOTP.jpg';
import reqIntercept from './reqintercept.jpg';
import leakingVictimData from './leakingvictimdata.jpg';
import completeVictimData from './completevictimdata.jpg';
import confirmBankAcc from './confirmbankacc.jpg';
import fullFakeLoan from './fullfakeloan.jpg';
import victimLoanOffer from './victimloanoffer.jpg';

export default function OtpBypassLoanFraud() {
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
                CVSS 9.1
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                CRITICAL
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
              OTP Bypass to Full Data Exfiltration & Loan Fraud — A Full Writeup
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {['OTP Bypass', 'Business Logic', 'IDOR', 'Financial Fraud'].map((tag) => (
                <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20">
                  #{tag}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground">
              Published: February 10, 2025
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">

            <h2 className="text-2xl font-bold text-primary mt-8">🧠 TL;DR</h2>
            <p className="italic text-lg">A backend trust boundary failure allowed an attacker to replace PAN/mobile in requests after OTP verification and access or submit another user's loan data — resulting in full data exfiltration and the ability to create fraudulent loans.</p>

            <h2 className="text-2xl font-bold text-primary mt-8">🎯 Vulnerability Overview</h2>
            <p>
              The application used PAN + mobile OTP verification to authenticate users. After OTP verification, the frontend continued sending PAN/mobile in request bodies to load loan offers and submit applications.
              The backend trusted those client-supplied identifiers instead of binding actions to the server-side session user id. By swapping PAN/mobile mid-session (via an intercepted request), an attacker could load victim data and submit loans on their behalf.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-8">🔍 Discovery — How I found it</h2>
            <p>
              While testing loan endpoints on staging, I observed that the loan offer API accepted PAN/mobile in the JSON body. That raised a red flag — post-auth requests should use the session identity, not client-supplied primary keys.
            </p>

            <h3 className="text-xl font-semibold mt-6">Observed login flow</h3>
            <p>
              I performed a standard login + OTP verify flow using my test account and intercepted the subsequent requests.
            </p>

            <div className="rounded border border-border p-3">
              <Image
                src={loginImg}
                alt="Login screen"
                width={900}
                height={500}
                style={{ objectFit: 'contain' }}
                className="rounded"
              />
              <p className="text-xs mt-2">Login screen (PAN + mobile) — initial authentication uses OTP.</p>
            </div>

            <div className="rounded border border-border p-3">
              <Image
                src={loginOTP}
                alt="OTP verify"
                width={900}
                height={420}
                style={{ objectFit: 'contain' }}
                className="rounded"
              />
              <p className="text-xs mt-2">OTP verification step — after this the frontend proceeds to fetch loan offers.</p>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-8">🧑‍💻 Proof: Intercept & Replace</h2>
            <p>
              I intercepted the loan-offer API call and edited the JSON body to use a victim's PAN & mobile. The backend returned the victim's loan dashboard without any further authentication.
            </p>

            <div className="rounded border border-border p-3">
              <Image
                src={reqIntercept}
                alt="Intercepted request"
                width={900}
                height={420}
                style={{ objectFit: 'contain' }}
                className="rounded"
              />
              <p className="text-xs mt-2">Intercepted POST to loans/getOffer showing PAN & mobile in body (edited in Burp).</p>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-8">🕵️ Victim Data Returned</h2>
            <p>
              The server returned full PII and loan details for the victim. No re-OTP, no additional checks.
            </p>

            <div className="rounded border border-border p-3">
              <Image
                src={leakingVictimData}
                alt="Leaking victim data"
                width={900}
                height={520}
                style={{ objectFit: 'contain' }}
                className="rounded"
              />
              <p className="text-xs mt-2">API response showing victim loan and personal data returned to the attacker-controlled session.</p>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-8">💸 From Viewing to Abusing: Loan Submission</h2>
            <p>
              With the victim's loan context loaded, I intercepted the loan submission request. I changed the destination account and increased loan amount; the server accepted it and produced a valid sanction document.
            </p>

            <div className="rounded border border-border p-3">
              <Image
                src={completeVictimData}
                alt="Complete victim data"
                width={900}
                height={520}
                style={{ objectFit: 'contain' }}
                className="rounded"
              />
              <p className="text-xs mt-2">Complete victim profile — personal info + bank details visible in the response.</p>
            </div>

            <div className="rounded border border-border p-3">
              <Image
                src={confirmBankAcc}
                alt="Confirm bank account"
                width={900}
                height={420}
                style={{ objectFit: 'contain' }}
                className="rounded"
              />
              <p className="text-xs mt-2">Intercepted submission where the destination account is visible and changeable.</p>
            </div>

            <div className="rounded border border-border p-3">
              <Image
                src={fullFakeLoan}
                alt="Fake loan submission"
                width={900}
                height={420}
                style={{ objectFit: 'contain' }}
                className="rounded"
              />
              <p className="text-xs mt-2">Modified submission payload — attacker increased loan and replaced destination account.</p>
            </div>

            <div className="rounded border border-border p-3">
              <Image
                src={victimLoanOffer}
                alt="Loan sanction document"
                width={900}
                height={520}
                style={{ objectFit: 'contain' }}
                className="rounded"
              />
              <p className="text-xs mt-2">Server returned a formal loan sanction letter — generated without verifying the session owner matched the PAN in the payload.</p>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-8">⚠️ Impact Summary</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Massive PII exposure (PAN, bank accounts, salary & employer data)</li>
              <li>Ability to generate legitimate loan sanction documents in victims' names</li>
              <li>High-risk financial fraud at scale with low attacker effort</li>
              <li>Regulatory & reputational consequences for the platform</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-8">🛠 Remediation & Hardening</h2>
            <div className="space-y-4">
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">🔒 Bind OTP to server session</p>
                <p className="text-sm">When OTP is verified, map it to an internal server-side user_id and never accept a different PAN/mobile for that session.</p>
              </div>
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">🔁 Use server-side user scoping</p>
                <p className="text-sm">For any data fetch or action, use the session's user id as the authoritative key — do not rely on client-supplied PAN/mobile.</p>
              </div>
              <div className="bg-background p-4 rounded border border-border">
                <p className="font-bold text-primary">🧾 Require step-up auth for sensitive changes</p>
                <p className="text-sm">Changes to bank details, large loan submissions, or PAN changes should require re-OTP or manual review.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-primary mt-8">🔎 Detection & Monitoring</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Alert when Authorization user != request body PAN/MOBILE</li>
              <li>Flag loan submissions where destination account is new/unverified</li>
              <li>Log & monitor unusual loan amount jumps and rapid account target changes</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary mt-8">🏁 Final Thoughts</h2>
            <p>
              This case is a reminder that authentication primitives (OTP) must be coupled with strict server-side session scoping. Business logic mistakes are easy to miss and catastrophic in financial systems.
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
