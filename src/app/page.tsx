import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen grid-pattern">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="text-primary text-5xl md:text-7xl font-mono font-bold">
              ~/psykick
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Penetration Tester & Security Researcher
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            CRT, OSCP & CPSA-certified penetration tester delivering web, API, internal, cloud and Active Directory
            assessments for enterprise clients across the UK, EU and US — with a focus on full attack-chain
            exploitation, domain compromise and adversary simulation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors border border-primary"
            >
              About Me
            </Link>
            <Link
              href="/writeups"
              className="px-8 py-3 bg-card text-foreground rounded-md font-medium hover:bg-muted transition-colors border border-border"
            >
              View Writeups
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center gap-2 mb-6 text-muted-foreground">
          <span className="text-primary">$</span>
          <span className="font-mono text-sm">whoami</span>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
            Dilip Prasad aka psykick
          </h2>
          <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
            CRT, OSCP and CPSA-certified Penetration Tester with experience delivering web, API, internal, cloud and
            Active Directory assessments for enterprise clients across UK, EU and US sectors. Achieved 25+ full domain
            compromises and reported 20+ critical vulnerabilities (RCE, SSRF, auth bypass, IDOR), supported by recon
            automation, AD exploitation and high-impact reporting tailored to both engineering and leadership.
          </p>
          <Link href="/about" className="text-primary hover:underline font-medium">
            Learn more about me →
          </Link>
        </div>
      </section>

      {/* Latest Writeups Preview */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center gap-2 mb-6 text-muted-foreground">
          <span className="text-primary">$</span>
          <span className="font-mono text-sm">ls writeups/</span>
        </div>

        <h2 className="text-3xl font-bold mb-6">Latest Writeups</h2>

        <div className="space-y-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold">
                Image Upload Gone Wild: Blind SQLi to Superadmin
              </h3>
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20 whitespace-nowrap ml-2">
                CRITICAL
              </span>
            </div>
            <p className="text-muted-foreground mb-3">
              Discovered blind SQL injection hidden in a filename through file upload, leveraged via second-order logic
              to escalate privileges to superadmin...
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20">
                #Blind SQLi
              </span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20">
                #Privilege Escalation
              </span>
            </div>
          </div>
        </div>

        <Link href="/writeups" className="text-primary hover:underline font-medium">
          View all writeups →
        </Link>
      </section>

      {/* Resume/Experience Preview */}
      <section className="max-w-6xl mx-auto px-4 py-16 mb-16">
        <div className="flex items-center gap-2 mb-6 text-muted-foreground">
          <span className="text-primary">$</span>
          <span className="font-mono text-sm">cat experience.txt</span>
        </div>

        <h2 className="text-3xl font-bold mb-6">Experience & Skills</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-primary">Professional Experience</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Penetration Tester — Securin Inc (2021–2023)</li>
              <li>• Bug Bounty Hunter — Private Programs (2023–Present)</li>
              <li>• Freelance Penetration Tester (2021)</li>
              <li>• 25+ full domain compromises across enterprise AD environments</li>
              <li>• 20+ critical vulnerabilities (RCE, SSRF, auth bypass, IDOR)</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-primary">Certifications & Education</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• CRT — CREST Registered Tester</li>
              <li>• OSCP — Offensive Security Certified Professional</li>
              <li>• CPSA — CREST Practitioner Security Analyst</li>
              <li>• MSc Cybersecurity — University of Birmingham</li>
              <li>• BSc Computer Science — SRM University</li>
            </ul>
          </div>
        </div>

        <Link href="/resume" className="text-primary hover:underline font-medium">
          View full resume →
        </Link>
      </section>

      {/* Stats Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 mb-16">
        <div className="bg-card border border-border rounded-lg p-8">
          <div className="flex items-center gap-2 mb-6 text-muted-foreground">
            <span className="text-primary">$</span>
            <span className="font-mono text-sm">cat stats.txt</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Domain Compromises</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">20+</div>
              <div className="text-sm text-muted-foreground">Critical Vulnerabilities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">3+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                CRT • OSCP • CPSA
              </div>
              <div className="text-sm text-muted-foreground">Certified</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
