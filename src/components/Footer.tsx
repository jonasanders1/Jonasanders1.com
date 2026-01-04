import { Github, Linkedin, Mail, Twitter, Heart } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/jonasanders1", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/jonas-andersen-65a335262/",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="py-12 border-t border-border bg-secondary/20">
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          {/* Logo/Name */}
          <a
            href="#home"
            className="text-2xl font-display font-bold text-primary"
          >
            <Image
              src="/logo.png"
              alt="Jonas Andersen Logo"
              width={35}
              height={35}
            />
          </a>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#home" className="hover:text-foreground transition-colors">
              Home
            </a>
            <a
              href="#projects"
              className="hover:text-foreground transition-colors"
            >
              Projects
            </a>
            <a
              href="#qualifications"
              className="hover:text-foreground transition-colors"
            >
              Qualifications
            </a>
          </nav>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-border" />

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made by Jonas Andersen © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
