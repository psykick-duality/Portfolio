import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-primary font-bold text-lg mb-3">
              <span className="text-muted-foreground">~/</span>psykick
            </h3>
            <p className="text-sm text-muted-foreground">
              OSCP-certified Penetration Tester specializing in infrastructure, web applications, mobile applications, and AI integration and automation.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/writeups" className="text-muted-foreground hover:text-primary transition-colors">
                  Writeups
                </Link>
              </li>
              <li>
                <Link href="/resume" className="text-muted-foreground hover:text-primary transition-colors">
                  Resume
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.linkedin.com/in/dilip-prasad" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://app.hackthebox.com/profile/psykick" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  HackTheBox
                </a>
              </li>
              <li>
                <a href="https://hackerone.com/psykick" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  HackerOne
                </a>
              </li>
              <li>
                <a href="https://bugcrowd.com/psykick" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  Bugcrowd
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary">$</span> echo "Hack responsibly. Report vulnerabilities ethically."
          </p>
          <p className="text-xs text-muted-foreground mt-2" suppressHydrationWarning>
            © {new Date().getFullYear()} Dilip Prasad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
