import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { IDENTITY } from "@/lib/portfolio/data";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-4 md:grid-cols-3">
          <div className="font-display text-[0.95rem] font-semibold text-white">
            {IDENTITY.name}
          </div>
          <div className="text-center text-[0.8rem] text-[#444]">
            Designed & built with <span className="text-[#ef4444]">❤</span>{" "}
            using React + Framer Motion
          </div>
          <div className="flex items-center gap-4 md:justify-end">
            {[
              { Icon: Github, href: IDENTITY.github },
              { Icon: Linkedin, href: IDENTITY.linkedin },
              { Icon: Twitter, href: IDENTITY.twitter },
              { Icon: Mail, href: `mailto:${IDENTITY.email}` },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-[#555] transition-colors hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-6 text-center text-[0.75rem] text-[#333]">
          © {new Date().getFullYear()} {IDENTITY.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
