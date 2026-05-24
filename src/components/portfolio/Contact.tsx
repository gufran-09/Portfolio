import { motion, type Variants } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Mail, Github, Linkedin, Twitter, Loader2, CheckCircle } from "lucide-react";
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

  // Eye centers in SVG coords (viewBox 0 0 120 120)
  const LEFT_EYE = { x: 44, y: 52 };
  const RIGHT_EYE = { x: 76, y: 52 };
  const MAX_DIST = 4;

  const updatePupils = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = 120 / rect.width;
    const scaleY = 120 / rect.height;
    const svgX = (clientX - rect.left) * scaleX;
    const svgY = (clientY - rect.top) * scaleY;

    const calcOffset = (eye: { x: number; y: number }) => {
      const dx = svgX - eye.x;
      const dy = svgY - eye.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const clamped = Math.min(MAX_DIST, dist / 10);
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
      leftPupilRef.current = { x: lerp(leftPupilRef.current.x, targetLeft.current.x, 0.15), y: lerp(leftPupilRef.current.y, targetLeft.current.y, 0.15) };
      rightPupilRef.current = { x: lerp(rightPupilRef.current.x, targetRight.current.x, 0.15), y: lerp(rightPupilRef.current.y, targetRight.current.y, 0.15) };
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
    <div style={{ display: "flex", justifyContent: "center", paddingTop: "8px" }}>
      <svg
        ref={svgRef}
        viewBox="0 0 120 120"
        width="120"
        height="120"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* Shoulders */}
        <path d="M10 115 Q10 90 30 85 L45 82 L60 80 L75 82 L90 85 Q110 90 110 115 Z" fill="var(--color-surface-2)" />
        {/* Hoodie collar */}
        <path d="M45 82 Q60 88 75 82" fill="none" stroke="#222" strokeWidth="2" />

        {/* Neck */}
        <rect x="54" y="68" width="12" height="14" rx="4" fill="#c8956c" />

        {/* Head */}
        <ellipse cx="60" cy="52" rx="28" ry="30" fill="#c8956c" />

        {/* Ears */}
        <ellipse cx="32" cy="52" rx="5" ry="7" fill="#c8956c" />
        <ellipse cx="32" cy="52" rx="3" ry="5" fill="#b8855c" />
        <ellipse cx="88" cy="52" rx="5" ry="7" fill="#c8956c" />
        <ellipse cx="88" cy="52" rx="3" ry="5" fill="#b8855c" />

        {/* Hair */}
        <ellipse cx="60" cy="28" rx="28" ry="14" fill="#1a1008" />
        <ellipse cx="34" cy="38" rx="8" ry="12" fill="#1a1008" />
        <ellipse cx="86" cy="38" rx="8" ry="12" fill="#1a1008" />
        <path d="M50 24 Q55 16 60 22" stroke="#241508" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M60 22 Q65 14 70 21" stroke="#241508" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Eyebrows */}
        <path d="M36 44 Q44 41 50 43" stroke="#1a1008" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M70 43 Q76 41 84 44" stroke="#1a1008" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Eye whites */}
        <circle cx={LEFT_EYE.x} cy={LEFT_EYE.y} r="8" fill="white" />
        <circle cx={RIGHT_EYE.x} cy={RIGHT_EYE.y} r="8" fill="white" />

        {/* Pupils — tracking */}
        <circle cx={LEFT_EYE.x + leftPupil.x} cy={LEFT_EYE.y + leftPupil.y} r="3.5" fill="#1a1a1a" />
        <circle cx={RIGHT_EYE.x + rightPupil.x} cy={RIGHT_EYE.y + rightPupil.y} r="3.5" fill="#1a1a1a" />
        {/* Pupil shine */}
        <circle cx={LEFT_EYE.x + leftPupil.x + 1} cy={LEFT_EYE.y + leftPupil.y - 1} r="1" fill="rgba(255,255,255,0.7)" />
        <circle cx={RIGHT_EYE.x + rightPupil.x + 1} cy={RIGHT_EYE.y + rightPupil.y - 1} r="1" fill="rgba(255,255,255,0.7)" />

        {/* Nose */}
        <path d="M57 57 Q60 61 63 57" stroke="#b8855c" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Expression by pose */}
        {pose === "default" && (
          <path d="M52 65 Q60 70 68 65" stroke="#a07050" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        )}
        {pose === "thumbsup" && (
          <>
            {/* Big smile */}
            <path d="M50 64 Q60 72 70 64" stroke="#a07050" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Thumbs up arm */}
            <path d="M95 95 Q105 80 100 70 Q98 65 94 68 Q90 62 86 66 L88 80 Z" fill="#c8956c" />
            <rect x="84" y="60" width="10" height="14" rx="5" fill="#c8956c" transform="rotate(-15 89 67)" />
          </>
        )}
        {pose === "wave" && (
          <>
            <path d="M50 64 Q60 72 70 64" stroke="#a07050" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Waving arm */}
            <path
              d="M90 90 Q105 75 108 60"
              stroke="#c8956c"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              style={{ animation: "char-wave 0.4s ease-in-out 3" }}
            />
            {/* Hand */}
            <ellipse cx="108" cy="58" rx="8" ry="6" fill="#c8956c" transform="rotate(-20 108 58)" />
          </>
        )}
      </svg>
    </div>
  );
}

// ─── Contact section ─────────────────────────────────────────────────────────
export function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pose, setPose] = useState<CharPose>("default");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
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
          <div className="section-label">08 / CONTACT</div>
          <h2 className="h1 mb-3">Let's build something.</h2>
          <p className="body mb-16 max-w-2xl">
            Available for full-time roles, freelance projects, and interesting conversations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* ── Left — Contact info + character ── */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-8"
          >
            {/* Contact rows */}
            {[
              { Icon: Mail, label: "Email", value: IDENTITY.email, href: `mailto:${IDENTITY.email}` },
              { Icon: Github, label: "GitHub", value: IDENTITY.githubUser, href: IDENTITY.github },
              { Icon: Linkedin, label: "LinkedIn", value: "gufran-ahmed21", href: IDENTITY.linkedin },
            ].map(({ Icon, label, value, href }, i) => (
              <motion.a key={i} variants={itemVariants} href={href} target="_blank" rel="noreferrer" className="flex items-start gap-3 group">
                <Icon size={16} style={{ color: "var(--color-accent)", marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <p className="label mb-1">{label}</p>
                  <p className="small font-medium transition-colors group-hover:underline" style={{ color: "var(--color-text-1)" }}>{value}</p>
                </div>
              </motion.a>
            ))}

            {/* Availability block */}
            <motion.div variants={itemVariants} className="card" style={{ background: "var(--color-success-dim)", border: "1px solid var(--color-success-border)" }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)]" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
                  <span className="relative h-2 w-2 rounded-full bg-[var(--color-success)]" />
                </span>
                <p className="h3" style={{ color: "var(--color-success)" }}>Currently available</p>
              </div>
              <p className="small">Open to full-time · freelance · consulting</p>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="space-y-0">
              {[
                { Icon: Github, label: "GitHub", href: IDENTITY.github },
                { Icon: Linkedin, label: "LinkedIn", href: IDENTITY.linkedin },
                { Icon: Twitter, label: "Twitter", href: IDENTITY.twitter },
              ].map(({ Icon, label, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 py-3 border-b transition-all group"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <Icon size={16} style={{ color: "var(--color-text-2)" }} />
                  <span className="small font-medium" style={{ color: "var(--color-text-2)" }}>{label}</span>
                  <span className="ml-auto text-xs transition-transform group-hover:translate-x-0.5" style={{ color: "var(--color-text-3)" }}>↗</span>
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
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            onSubmit={handleSubmit}
            onMouseEnter={handleFormEnter}
            className="space-y-4"
          >
            {[
              { name: "name", label: "Name", type: "text", placeholder: "Your name" },
              { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              { name: "subject", label: "Subject", type: "text", placeholder: "What's this about?" },
            ].map(({ name, label, type, placeholder }) => (
              <motion.div key={name} variants={itemVariants}>
                <label className="mb-1.5 block" style={{ color: "var(--color-text-2)", fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500 }}>{label}</label>
                <input
                  type={type} name={name} placeholder={placeholder}
                  value={formData[name as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                  className="input w-full" required
                />
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <label className="mb-1.5 block" style={{ color: "var(--color-text-2)", fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500 }}>Message</label>
              <textarea
                name="message" placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input w-full resize-none" rows={5} required
              />
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={loading || success}
              className="btn-accent w-full mt-6 flex items-center justify-center gap-2"
              onMouseEnter={() => { if (!loading && !success) setPose("thumbsup"); }}
              onMouseLeave={() => { if (!success) setPose("default"); }}
            >
              {success ? (
                <><CheckCircle size={16} /> Message sent!</>
              ) : loading ? (
                <><Loader2 size={16} className="animate-spin" /> Sending...</>
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
