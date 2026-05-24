import { motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Twitter,
  ArrowRight,
  Loader2,
  Check,
} from "lucide-react";
import { SectionLabel, fadeUp } from "./SectionLabel";
import { IDENTITY } from "@/lib/portfolio/data";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2500);
    }, 1200);
  };

  return (
    <section id="contact" className="py-[120px]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel number="08" label="CONTACT" />
        <motion.h2
          {...fadeUp}
          className="font-display text-[2rem] font-bold text-white"
        >
          Let's build something great.
        </motion.h2>
        <motion.p
          {...fadeUp}
          className="mt-2 max-w-xl text-[0.95rem] text-[#666]"
        >
          Available for full-time roles, freelance projects, and interesting
          conversations.
        </motion.p>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {/* Left */}
          <motion.div {...fadeUp}>
            <div className="text-[0.75rem] font-semibold tracking-[0.15em] text-[#666] uppercase">
              Get in touch
            </div>
            <div className="mt-5 space-y-3">
              <a
                href={`mailto:${IDENTITY.email}`}
                data-cursor="MAIL"
                className="flex items-center gap-3 text-[0.9rem] text-[#888] transition-colors hover:text-white"
              >
                <Mail size={16} className="text-[#6366f1]" />
                {IDENTITY.email}
              </a>
              <div className="flex items-center gap-3 text-[0.9rem] text-[#888]">
                <MapPin size={16} className="text-[#6366f1]" />
                {IDENTITY.location}
              </div>
              <div className="flex items-center gap-3 text-[0.9rem] text-[#888]">
                <Clock size={16} className="text-[#6366f1]" />
                Response time: within 24 hours
              </div>
            </div>

            <div
              className="mt-6 rounded-lg border p-4"
              style={{
                background: "rgba(16,185,129,0.05)",
                borderColor: "rgba(16,185,129,0.15)",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full bg-[#10b981]"
                  style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }}
                />
                <span className="text-[0.85rem] font-semibold text-[#10b981]">
                  Currently available
                </span>
              </div>
              <div className="mt-2 text-[0.8rem] text-[#666]">
                Open to: Full-time · Freelance · Consulting
              </div>
            </div>

            <div className="mt-8 space-y-1">
              {[
                {
                  Icon: Github,
                  label: "GitHub",
                  desc: "Check my code",
                  href: IDENTITY.github,
                  cursor: "GITHUB",
                },
                {
                  Icon: Linkedin,
                  label: "LinkedIn",
                  desc: "Connect professionally",
                  href: IDENTITY.linkedin,
                  cursor: "LINKEDIN",
                },
                {
                  Icon: Twitter,
                  label: "Twitter",
                  desc: "Follow my thoughts",
                  href: IDENTITY.twitter,
                  cursor: "TWITTER",
                },
              ].map(({ Icon, label, desc, href, cursor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor={cursor}
                  className="group flex items-center gap-4 rounded-lg px-3 py-3 transition-all hover:translate-x-1 hover:bg-white/[0.02]"
                >
                  <Icon
                    size={18}
                    className="text-[#666] transition-colors group-hover:text-white"
                  />
                  <div className="flex-1">
                    <div className="text-[0.9rem] font-semibold text-white">
                      {label}
                    </div>
                    <div className="text-[0.75rem] text-[#666]">{desc}</div>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-[#444] transition-colors group-hover:text-white"
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.form {...fadeUp} onSubmit={onSubmit} className="space-y-4">
            <Field label="Name" id="name">
              <input
                id="name"
                required
                placeholder="Your name"
                className="form-input"
              />
            </Field>
            <Field label="Email" id="email">
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                className="form-input"
              />
            </Field>
            <Field label="Subject" id="subject">
              <input
                id="subject"
                required
                placeholder="What's this about?"
                className="form-input"
              />
            </Field>
            <Field label="Message" id="message">
              <textarea
                id="message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="form-input resize-none"
              />
            </Field>

            <button
              type="submit"
              disabled={status !== "idle"}
              className="flex w-full items-center justify-center gap-2 rounded-lg py-3.5 text-[0.9rem] font-semibold text-white transition-colors disabled:opacity-80"
              style={{
                background: status === "success" ? "#10b981" : "#6366f1",
              }}
            >
              {status === "loading" && (
                <Loader2 size={16} className="animate-spin" />
              )}
              {status === "success" && <Check size={16} />}
              {status === "idle" && "Send Message"}
              {status === "loading" && "Sending..."}
              {status === "success" && "Message sent!"}
            </button>

            <style>{`
              .form-input {
                width: 100%;
                background: #111;
                border: 1px solid rgba(255,255,255,0.08);
                border-radius: 8px;
                padding: 12px 16px;
                color: #fff;
                font-family: 'Inter', sans-serif;
                font-size: 0.9rem;
                outline: none;
                transition: border-color 0.2s;
              }
              .form-input::placeholder { color: #333; }
              .form-input:focus { border-color: #6366f1; }
            `}</style>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.75rem] font-semibold tracking-[0.05em] text-[#666] uppercase"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
