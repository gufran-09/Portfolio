import { motion, type Variants } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { IDENTITY } from "@/lib/portfolio/data";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

// ─── Eye-tracking character ──────────────────────────────────────────────────
type CharPose = "default" | "thumbsup" | "wave";

function ContactCharacter({ pose }: { pose: CharPose }) {
  // Pupil positions (lerped toward cursor)
  const leftPupilRef = useRef({ x: 0, y: 0 });
  const rightPupilRef = useRef({ x: 0, y: 0 });
  const targetLeft = useRef({ x: 0, y: 0 });
  const targetRight = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [leftPupil, setLeftPupil] = useState({ x: 0, y: 0 });
  const [rightPupil, setRightPupil] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  // Eye centers in SVG coords (viewBox 0 0 380 430)
  const LEFT_EYE = { x: 110.3, y: 148.8 };
  const RIGHT_EYE = { x: 161.5, y: 139.7 };
  const MAX_DIST = 4.5;

  const updatePupils = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = 380 / rect.width;
    const scaleY = 430 / rect.height;
    const svgX = (clientX - rect.left) * scaleX;
    const svgY = (clientY - rect.top) * scaleY;

    const calcOffset = (eye: { x: number; y: number }) => {
      const dx = svgX - eye.x;
      const dy = svgY - eye.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const clamped = Math.min(MAX_DIST, dist / 12);
      const angle = Math.atan2(dy, dx);
      return { x: Math.cos(angle) * clamped, y: Math.sin(angle) * clamped };
    };

    targetLeft.current = calcOffset(LEFT_EYE);
    targetRight.current = calcOffset(RIGHT_EYE);
  }, []);

  // RAF lerp loop
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      leftPupilRef.current = {
        x: lerp(leftPupilRef.current.x, targetLeft.current.x, 0.15),
        y: lerp(leftPupilRef.current.y, targetLeft.current.y, 0.15),
      };
      rightPupilRef.current = {
        x: lerp(rightPupilRef.current.x, targetRight.current.x, 0.15),
        y: lerp(rightPupilRef.current.y, targetRight.current.y, 0.15),
      };
      setLeftPupil({ ...leftPupilRef.current });
      setRightPupil({ ...rightPupilRef.current });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Global mousemove
  useEffect(() => {
    const handler = (e: MouseEvent) => updatePupils(e.clientX, e.clientY);
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [updatePupils]);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", paddingTop: "8px" }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 380 430"
        width="160"
        height="181"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <style>{`
          @keyframes char-wave-sway {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(2.5deg); }
          }
        `}</style>
        <defs>
          {/* Shadows */}
          <filter id="char-shadow-contact" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.4" />
          </filter>

          {/* Eye Gradients */}
          <radialGradient id="iris-grad-contact" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6e4224" />
            <stop offset="80%" stopColor="#2c170b" />
          </radialGradient>
        </defs>

        <g
          filter="url(#char-shadow-contact)"
          style={{
            transformOrigin: "190px 430px",
            animation: pose === "wave" ? "char-wave-sway 0.5s ease-in-out infinite" : "none",
          }}
        >
          {/* Waving 3D Character image */}
          <image
            href="/assets/avatar-contact-cropped.png"
            x="0"
            y="0"
            width="380"
            height="430"
          />

          {/* Eyes White Base Overlay to hide original pupils */}
          <ellipse cx={LEFT_EYE.x} cy={LEFT_EYE.y} rx="10.5" ry="8.5" fill="white" />
          <ellipse cx={RIGHT_EYE.x} cy={RIGHT_EYE.y} rx="10.5" ry="8.5" fill="white" />

          {/* Tracking Pupils */}
          {/* Left Eye */}
          <circle
            cx={LEFT_EYE.x + leftPupil.x}
            cy={LEFT_EYE.y + leftPupil.y}
            r="6.2"
            fill="url(#iris-grad-contact)"
          />
          <circle
            cx={LEFT_EYE.x + leftPupil.x}
            cy={LEFT_EYE.y + leftPupil.y}
            r="3.2"
            fill="#0c0c0f"
          />
          <circle
            cx={LEFT_EYE.x + leftPupil.x + 1.2}
            cy={LEFT_EYE.y + leftPupil.y - 1.2}
            r="1.4"
            fill="white"
          />

          {/* Right Eye */}
          <circle
            cx={RIGHT_EYE.x + rightPupil.x}
            cy={RIGHT_EYE.y + rightPupil.y}
            r="6.2"
            fill="url(#iris-grad-contact)"
          />
          <circle
            cx={RIGHT_EYE.x + rightPupil.x}
            cy={RIGHT_EYE.y + rightPupil.y}
            r="3.2"
            fill="#0c0c0f"
          />
          <circle
            cx={RIGHT_EYE.x + rightPupil.x + 1.2}
            cy={RIGHT_EYE.y + rightPupil.y - 1.2}
            r="1.4"
            fill="white"
          />
        </g>
      </svg>
    </div>
  );
}

// ─── Contact section ─────────────────────────────────────────────────────────
export function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pose, setPose] = useState<CharPose>("default");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  // Detect cursor inside form → character looks right
  const handleFormEnter = () => {
    // Point pupils toward form (right side) — handled by global mousemove naturally
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSuccess(true);
    setLoading(false);
    setPose("wave");
    setTimeout(() => {
      setSuccess(false);
      setPose("default");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" className="section surface-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <div className="section-label">10 / CONTACT</div>
          <h2 className="h1 mb-3">Let's build something.</h2>
          <p className="body mb-16 max-w-2xl">
            Available for full-time roles, freelance projects, and interesting
            conversations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* ── Left — Contact info + character ── */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-8"
          >
            {/* Contact rows */}
            {[
              {
                Icon: Mail,
                label: "Email",
                value: IDENTITY.email,
                href: `mailto:${IDENTITY.email}`,
              },
              {
                Icon: Github,
                label: "GitHub",
                value: IDENTITY.githubUser,
                href: IDENTITY.github,
              },
              {
                Icon: Linkedin,
                label: "LinkedIn",
                value: "gufran-ahmed21",
                href: IDENTITY.linkedin,
              },
            ].map(({ Icon, label, value, href }, i) => (
              <motion.a
                key={i}
                variants={itemVariants}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 group"
              >
                <Icon
                  size={16}
                  style={{
                    color: "var(--color-accent)",
                    marginTop: "2px",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p className="label mb-1">{label}</p>
                  <p
                    className="small font-medium transition-colors group-hover:underline"
                    style={{ color: "var(--color-text-1)" }}
                  >
                    {value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Availability block */}
            <motion.div
              variants={itemVariants}
              className="card"
              style={{
                background: "var(--color-success-dim)",
                border: "1px solid var(--color-success-border)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)]"
                    style={{ animation: "pulse-ring 2s ease-out infinite" }}
                  />
                  <span className="relative h-2 w-2 rounded-full bg-[var(--color-success)]" />
                </span>
                <p className="h3" style={{ color: "var(--color-success)" }}>
                  Currently available
                </p>
              </div>
              <p className="small">
                Open to full-time · freelance · consulting
              </p>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="space-y-0">
              {[
                { Icon: Github, label: "GitHub", href: IDENTITY.github },
                { Icon: Linkedin, label: "LinkedIn", href: IDENTITY.linkedin },
                { Icon: Twitter, label: "Twitter", href: IDENTITY.twitter },
              ].map(({ Icon, label, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 py-3 border-b transition-all group"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <Icon size={16} style={{ color: "var(--color-text-2)" }} />
                  <span
                    className="small font-medium"
                    style={{ color: "var(--color-text-2)" }}
                  >
                    {label}
                  </span>
                  <span
                    className="ml-auto text-xs transition-transform group-hover:translate-x-0.5"
                    style={{ color: "var(--color-text-3)" }}
                  >
                    ↗
                  </span>
                </a>
              ))}
            </motion.div>

            {/* Eye-tracking character — bottom of left column */}
            <motion.div variants={itemVariants}>
              <ContactCharacter pose={pose} />
            </motion.div>
          </motion.div>

          {/* ── Right — Form ── */}
          <motion.form
            ref={formRef}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            onSubmit={handleSubmit}
            onMouseEnter={handleFormEnter}
            className="space-y-4"
          >
            {[
              {
                name: "name",
                label: "Name",
                type: "text",
                placeholder: "Your name",
              },
              {
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "your@email.com",
              },
              {
                name: "subject",
                label: "Subject",
                type: "text",
                placeholder: "What's this about?",
              },
            ].map(({ name, label, type, placeholder }) => (
              <motion.div key={name} variants={itemVariants}>
                <label
                  className="mb-1.5 block"
                  style={{
                    color: "var(--color-text-2)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name as keyof typeof formData]}
                  onChange={(e) =>
                    setFormData({ ...formData, [name]: e.target.value })
                  }
                  className="input w-full"
                  required
                />
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <label
                className="mb-1.5 block"
                style={{
                  color: "var(--color-text-2)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                Message
              </label>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="input w-full resize-none"
                rows={5}
                required
              />
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={loading || success}
              className="btn-accent w-full mt-6 flex items-center justify-center gap-2"
              onMouseEnter={() => {
                if (!loading && !success) setPose("thumbsup");
              }}
              onMouseLeave={() => {
                if (!success) setPose("default");
              }}
            >
              {success ? (
                <>
                  <CheckCircle size={16} /> Message sent!
                </>
              ) : loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : (
                "Send Message →"
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
