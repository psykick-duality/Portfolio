'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function About() {
  const [text, setText] = useState('Dilip Prasad aka psykick');
  const fullText = 'Dilip Prasad aka psykick';

  useEffect(() => {
    let i = 0;
    setText('');
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50);

    return () => clearInterval(typing);
  }, [fullText]);

  return (
    <div className="min-h-screen grid-pattern">
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="text-primary text-3xl md:text-4xl font-mono font-bold">
              $ whoami<span className="terminal-cursor"></span>
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent"
            suppressHydrationWarning
          >
            {text}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground/90 mb-6 font-medium">
            CRT, OSCP & CPSA-Certified Penetration Tester
          </p>

          <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
            Delivering web, API, internal, cloud and Active Directory assessments for enterprise clients across the UK, EU and US — with a focus on full attack-chain exploitation, domain compromise and adversary simulation.
          </p>

          <p className="text-base md:text-lg text-muted-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Specialising in recon automation, privilege escalation, pivoting/tunneling and high-impact reporting that translates technical findings into clear business risk, remediation guidance and measurable security improvements.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/writeups"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors border border-primary"
            >
              View Writeups
            </Link>
            <Link
              href="/resume"
              className="px-8 py-3 bg-card text-foreground rounded-md font-medium hover:bg-muted transition-colors border border-border"
            >
              Resume
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
          <div className="text-primary text-3xl mb-4">{'>'}_</div>
          <h3 className="text-xl font-bold mb-2">Enterprise Penetration Testing</h3>
          <p className="text-muted-foreground">
            Web, API, internal, cloud and mobile assessments for enterprise clients using CREST/PTES methodologies, with end-to-end coverage from scoping to reporting.
          </p>
        </div>

        <div className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
          <div className="text-primary text-3xl mb-4">{'{AD}'}</div>
          <h3 className="text-xl font-bold mb-2">Active Directory & Internal Ops</h3>
          <p className="text-muted-foreground">
            25+ full domain compromises, multi-stage AD attack paths (Kerberoasting, AS-REP, delegation, ADCS, ACL abuse) and realistic lateral movement, pivoting and tunneling.
          </p>
        </div>

        <div className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
          <div className="text-primary text-3xl mb-4">{'{...}'}</div>
          <h3 className="text-xl font-bold mb-2">Automation & Research</h3>
          <p className="text-muted-foreground">
            Built Pentest Assistant and internal Python/PowerShell tooling to automate recon, enumeration and reporting, plus published exploit chains and privesc research at psykick.uk.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 mb-16">
        <div className="bg-card border border-border rounded-lg p-8">
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
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
              <div className="text-4xl font-bold text-primary mb-2">3+ </div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                CRT • OSCP+ • CPSA
              </div>
              <div className="text-sm text-muted-foreground">Certified</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
