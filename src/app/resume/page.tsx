export default function Resume() {
  return (
    <div className="min-h-screen grid-pattern py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <span className="text-primary">$</span>
            <span className="font-mono text-sm">cat resume.json</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
            Dilip Prasad
          </h1>
          <p className="text-xl text-muted-foreground">
            CRT, OSCP & CPSA-Certified Penetration Tester
          </p>
        </div>

        {/* ABOUT */}
        <div className="bg-card border border-border rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">{'{'}</span> About <span className="text-primary">{'}'}</span>
          </h2>

          <p className="text-muted-foreground mb-4">
            CRT, OSCP and CPSA-certified Penetration Tester with experience delivering web, API, internal,
            cloud and Active Directory assessments for enterprise clients across UK, EU and US sectors.
            Skilled in full attack-chain exploitation, domain compromise, adversary simulation, recon automation
            and high-quality reporting tailored for engineering and leadership audiences.
          </p>

          <p className="text-muted-foreground mb-4">
            Adept at articulating business risk, guiding remediation and delivering measurable security 
            improvements across the full engagement lifecycle — from scoping and testing through to evidence 
            collection, reporting and client debriefs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
            <div className="flex items-center gap-2">
              <span className="text-primary">→</span>
              <span className="text-muted-foreground">Location:</span>
              <span>Leicester, England, UK</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">→</span>
              <span className="text-muted-foreground">Email:</span>
              <span>dilipprasad35@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">→</span>
              <span className="text-muted-foreground">LinkedIn:</span>
              <a
                href="https://www.linkedin.com/in/dilip-prasad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                linkedin.com/in/dilip-prasad
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">→</span>
              <span className="text-muted-foreground">Phone:</span>
              <span>+44 7407 004776</span>
            </div>

            {/* GitHub link */}
            <div className="flex items-center gap-2 md:col-span-2">
              <span className="text-primary">→</span>
              <span className="text-muted-foreground">GitHub Project:</span>
              <a
                href="https://github.com/psykick-duality/Pentest-Assistant"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline break-all"
              >
                github.com/psykick-duality/Pentest-Assistant
              </a>
            </div>
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="bg-card border border-border rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-primary">{'<'}</span> Experience <span className="text-primary">{'/>'}</span>
          </h2>

          <div className="space-y-8">

            {/* Securin */}
            <div className="border-l-2 border-primary pl-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <h3 className="text-xl font-bold">Penetration Tester — Securin Inc</h3>
                <span className="text-muted-foreground text-sm">2021 – 2023</span>
              </div>
              <p className="text-muted-foreground mb-2">Chennai, India</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Delivered web, API, internal, cloud and mobile assessments using CREST/PTES methodologies.</li>
                <li>Performed full Active Directory attack paths (Kerberoasting, AS-REP, ADCS, ACL abuse, DCSync).</li>
                <li>Lateral movement, pivoting/tunneling (SSH, Chisel, Ligolo-NG), SOCKS relays, segmentation bypass.</li>
                <li>Developed automation for recon, payload generation and reporting pipelines.</li>
                <li>Produced high-quality reports with evidence, risk impact and executive summaries.</li>
              </ul>
            </div>

            {/* Bug Bounty */}
            <div className="border-l-2 border-primary pl-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <h3 className="text-xl font-bold">Bug Bounty Hunter</h3>
                <span className="text-muted-foreground text-sm">2023 – Present</span>
              </div>
              <p className="text-muted-foreground mb-2">Leicester, UK</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Identified critical vulnerabilities (RCE, SSRF, IDOR, authentication bypass) via private programs.</li>
                <li>Conducted advanced reconnaissance, endpoint analysis, and exploit chaining.</li>
              </ul>
            </div>

            {/* Freelance */}
            <div className="border-l-2 border-primary pl-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <h3 className="text-xl font-bold">Freelance Penetration Tester</h3>
                <span className="text-muted-foreground text-sm">2021</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Performed web, API and infrastructure testing for SME clients.</li>
                <li>Delivered scoping, exploitation, reporting and client debrief end-to-end.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* EDUCATION */}
        <div className="bg-card border border-border rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">🎓</span> Education
          </h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h3 className="text-lg font-bold text-foreground">MSc Cybersecurity — University of Birmingham</h3>
              <p>2023 – 2024</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">BSc Computer Science — SRM University</h3>
              <p>2016 – 2020</p>
            </div>
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="bg-card border border-border rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">#</span> Certifications
          </h2>

          <div className="space-y-4">

            {/* OSCP */}
            <div className="bg-background border border-border rounded p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-primary">
                  OSCP — Offensive Security Certified Professional
                </h3>
                <p className="text-muted-foreground text-sm">Offensive Security</p>
              </div>
              <a
                href="https://credentials.offsec.com/476ca3c6-9c4d-44da-aea7-35d9e40d25fa#acc.SeTc8XGy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                Verify →
              </a>
            </div>

            {/* CRT */}
            <div className="bg-background border border-border rounded p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-primary">CRT — CREST Registered Tester</h3>
                <p className="text-muted-foreground text-sm">CREST</p>
              </div>
              <a
                href="https://www.credly.com/badges/8167d970-5e02-4634-a7d3-3d49fb34ebc4/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                Verify →
              </a>
            </div>

            {/* CPSA */}
            <div className="bg-background border border-border rounded p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-primary">CPSA — CREST Practitioner Security Analyst</h3>
                <p className="text-muted-foreground text-sm">CREST</p>
              </div>
              <a
                href="https://www.credly.com/badges/8181151e-a82f-487d-9227-5b2c6be1fec1/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                Verify →
              </a>
            </div>

          </div>
        </div>

        {/* RESEARCH & CONTRIBUTIONS */}
        <div className="bg-card border border-border rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">🔬</span> Research &amp; Contributions
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>
              Published exploit chains and methodology deep-dives focusing on Active Directory, cloud and
              web exploitation, including privilege escalation, misconfiguration abuse and path chaining.
            </li>
            <li>
              Developed custom tools for recon, enumeration, attack-surface mapping and exploitation workflow
              automation using Python and PowerShell.
            </li>
          </ul>
        </div>

        {/* DOWNLOAD BUTTON */}
        <div className="mt-8 text-center">
          <a
            href="/resume/Dilip_Prasad.pdf"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors border border-primary"
          >
            Download PDF Resume
          </a>
        </div>
      </div>
    </div>
  );
}
