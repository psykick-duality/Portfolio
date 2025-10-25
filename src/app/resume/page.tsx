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
            Security Analyst | Penetration Tester | Bug Bounty Researcher
          </p>
        </div>

        {/* ABOUT */}
        <div className="bg-card border border-border rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">{'{'}</span> About <span className="text-primary">{'}'}</span>
          </h2>
          <p className="text-muted-foreground mb-4">
            OSCP-certified Penetration Tester with hands-on experience in web and network exploitation,
            AI-assisted vulnerability analysis, and automation scripting. Proven success identifying
            and reporting over 50+ high-severity vulnerabilities across enterprise and bug bounty programs.
          </p>
          <p className="text-muted-foreground mb-4">
            Passionate about red teaming, AI-driven exploitation, and developing scalable offensive security frameworks.
            Experienced in communicating complex vulnerabilities clearly for remediation and impact understanding.
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
            {/* Bug Bounty Hunter */}
            <div className="border-l-2 border-primary pl-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <h3 className="text-xl font-bold">Bug Bounty Hunter</h3>
                <span className="text-muted-foreground text-sm">September 2023 – Present</span>
              </div>
              <p className="text-muted-foreground mb-2">
                Independent Security Researcher — Multiple Enterprise Programs
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>
                  Conducted <strong>independent web and API vulnerability research</strong> for enterprise applications.
                </li>
                <li>
                  Discovered and responsibly disclosed <strong>critical vulnerabilities</strong> such as IDOR, SSRF, RCE, and authentication bypasses.
                </li>
                <li>
                  Performed <strong>deep reconnaissance and chain exploitation</strong> to demonstrate real-world business impact.
                </li>
                <li>
                  Developed <strong>custom Python automation tools</strong> for recon, fuzzing, and parameter discovery.
                </li>
                <li>
                  Integrated findings into professional workflows, enhancing <strong>exploit methodology and efficiency</strong>.
                </li>
              </ul>
            </div>

            {/* Penetration Tester */}
            <div className="border-l-2 border-primary pl-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <h3 className="text-xl font-bold">Penetration Tester — Securin Inc.</h3>
                <span className="text-muted-foreground text-sm">Aug 2021 – Aug 2023</span>
              </div>
              <p className="text-muted-foreground mb-2">Chennai, India</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>
                  Conducted web, API, and network penetration testing engagements across healthcare and finance sectors.
                </li>
                <li>
                  Discovered authentication bypasses, business logic flaws, and chained exploits to escalate impact.
                </li>
                <li>
                  Built Python scripts automating enumeration and payload generation, reducing manual workload by 40%.
                </li>
                <li>
                  Delivered detailed reports with clear remediation guidance to technical and executive stakeholders.
                </li>
              </ul>
            </div>

            {/* Freelance */}
            <div className="border-l-2 border-primary pl-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <h3 className="text-xl font-bold">Freelance Penetration Tester</h3>
                <span className="text-muted-foreground text-sm">Jan 2021 – Aug 2021</span>
              </div>
              <p className="text-muted-foreground mb-2">Chennai, India</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Participated in bug bounty programs on HackerOne and Bugcrowd.</li>
                <li>Reported over 20 verified vulnerabilities via private VDP and BBP programs.</li>
                <li>Used TryHackMe and HackTheBox for continuous skill development.</li>
              </ul>
            </div>

            {/* App Developer */}
            <div className="border-l-2 border-primary pl-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <h3 className="text-xl font-bold">App Developer — Sarada Technologies</h3>
                <span className="text-muted-foreground text-sm">Jul 2020 – Dec 2020</span>
              </div>
              <p className="text-muted-foreground mb-2">Chennai, India</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Developed a home automation platform for IoT device control using AWS and GCP.</li>
                <li>Integrated third-party devices securely via RESTful APIs.</li>
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
              <h3 className="text-lg font-bold text-foreground">MSc Cyber Security — University of Birmingham</h3>
              <p>Sep 2023 – Sep 2024</p>
              <p className="italic">
                Thesis: Integrating AI and Traditional Tools for Enhanced Penetration Testing
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">BSc Computer Science — SRM University</h3>
              <p>Jul 2016 – May 2020</p>
              <p className="italic">
                Project: Blood Bank Donation System with Secure Access Controls
              </p>
            </div>
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary">#</span> Certifications
          </h2>
          <div className="bg-background border border-border rounded p-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-primary">OSCP — Offensive Security Certified Professional</h3>
              <p className="text-muted-foreground">Certified: October 2025</p>
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
        </div>

        {/* DOWNLOAD RESUME BUTTON */}
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
