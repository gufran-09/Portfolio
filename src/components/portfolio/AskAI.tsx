import { motion } from "framer-motion";
import {
  ArrowUp,
  ExternalLink,
  Github,
  Hand,
  MessageCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IDENTITY, PROJECTS } from "@/lib/portfolio/data";
import { SectionWatermark } from "./SectionWatermark";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type AnthropicMessage = {
  role: "user" | "assistant";
  content: string;
};

const exampleQuestions = [
  "What's your strongest technical skill?",
  "Tell me about your most impactful project.",
  "Are you available for freelance work?",
];

const features = [
  "Trained on my actual projects and career",
  "Knows my tech stack, experience, and philosophy",
  "Fast, direct, honest answers",
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const chatVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1, ease: "easeOut" },
  },
};

function buildSystemPrompt() {
  const projectNames = PROJECTS.map((project) => project.name).join(", ");

  return `You are Gufran-AI, an AI assistant embedded in Gufran Ahmed's portfolio website. Answer questions about Gufran concisely, professionally, and in first person as if you are representing him.

FACTS ABOUT GUFRAN AHMED:
- Full Stack Software Engineer, 3+ years experience
- Based in Hyderabad, India
- Specializes in: React, Next.js, Node.js, TypeScript, Python, PostgreSQL, MongoDB, Docker, AWS
- 1000+ LeetCode problems solved, top competitive programmer
- 300+ day coding streak on Codolio
- Built 50+ projects including production applications
- Projects listed in this portfolio include: ${projectNames}
- Contributed to open source
- Available for full-time roles and freelance projects
- Passionate about clean code, system design, and great UX
- Currently seeking exciting opportunities
- Email: ${IDENTITY.email}
- GitHub: ${IDENTITY.github}

RULES:
- Keep responses under 3 sentences
- Be friendly, direct, and professional
- Never make up specific numbers or project names not listed above
- If asked about something not in the facts, say "I don't have that specific detail, but you can reach Gufran directly at ${IDENTITY.email}"
- Always encourage the visitor to get in touch`;
}

export function AskAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationHistory, setConversationHistory] = useState<
    AnthropicMessage[]
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      console.warn(
        "⚠️ VITE_ANTHROPIC_API_KEY not set. Gufran-AI will not function.",
      );
    }
  }, [apiKey]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const submitQuestion = async (question?: string) => {
    const userMessage = (question ?? input).trim();
    if (!userMessage || isLoading) return;

    setInput("");
    setIsLoading(true);
    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: userMessage },
    ];
    setMessages(nextMessages);

    try {
      if (!apiKey) {
        throw new Error("Missing Anthropic API key");
      }

      const nextHistory: AnthropicMessage[] = [
        ...conversationHistory,
        { role: "user", content: userMessage },
      ].slice(-10);

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5",
          max_tokens: 200,
          system: buildSystemPrompt(),
          messages: nextHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Anthropic API request failed");
      }

      const data = await response.json();
      const aiReply =
        data.content?.[0]?.text ??
        `I don't have that specific detail, but you can reach Gufran directly at ${IDENTITY.email}`;
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: aiReply,
      };
      setMessages([...nextMessages, assistantMessage]);
      setConversationHistory([...nextHistory, assistantMessage].slice(-10));
    } catch {
      const fallback = `Sorry, I'm having trouble connecting right now. You can reach Gufran directly at ${IDENTITY.email}`;
      setMessages([...nextMessages, { role: "assistant", content: fallback }]);
      setConversationHistory((history) =>
        [...history, { role: "user", content: userMessage }].slice(-10),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="ask-ai"
      className="section surface-section"
      style={{ position: "relative", overflow: "hidden", padding: "128px 0" }}
    >
      <SectionWatermark text="ASK AI" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="section-label">09 / ASK ME ANYTHING</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="flex items-center justify-between gap-6">
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    fontWeight: 400,
                    color: "var(--color-text-3)",
                  }}
                >
                  Ask
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "3rem",
                    fontWeight: 800,
                    color: "var(--color-text-1)",
                    lineHeight: 1.05,
                  }}
                >
                  Gufran-<span style={{ color: "var(--color-accent)" }}>AI</span>
                  <sup
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.7rem",
                      fontWeight: 400,
                      color: "var(--color-text-3)",
                      verticalAlign: "super",
                      marginLeft: 4,
                    }}
                  >
                    ™
                  </sup>
                </div>
              </div>
              <div
                style={{
                  width: 80,
                  height: 80,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "-5px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(0, 191, 255, 0.25) 0%, transparent 70%)",
                    filter: "blur(4px)",
                    animation: "pulse-ring 2.5s ease-out infinite",
                  }}
                />
                <img
                  src="/assets/avatar-ai.png"
                  alt="Gufran AI Holographic Avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    position: "relative",
                    zIndex: 1,
                    filter: "drop-shadow(0 0 10px rgba(0, 191, 255, 0.75))",
                    animation: "character-float 4s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                height: 1,
                width: "100%",
                background: "var(--color-border)",
                margin: "20px 0",
              }}
            />

            <h2
              className="flex items-center gap-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                fontWeight: 700,
                color: "var(--color-text-1)",
                lineHeight: 1.25,
              }}
            >
              <MessageCircle
                size={20}
                style={{ color: "var(--color-accent)", flexShrink: 0 }}
              />
              Ask me anything about my work
            </h2>

            <p className="body" style={{ marginTop: 12, fontSize: 15 }}>
              Curious about my projects, tech stack choices, or how I approach
              problems?
            </p>
            <p className="body" style={{ marginTop: 8, fontSize: 15 }}>
              Drop a question and Gufran-AI will answer based on my real
              experience, projects, and skills.
            </p>

            <div className="flex flex-col" style={{ gap: 12, marginTop: 28 }}>
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center"
                  style={{ gap: 12 }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "var(--color-accent)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      fontWeight: 400,
                      color: "var(--color-text-2)",
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 12,
                fontWeight: 400,
                color: "var(--color-text-3)",
                lineHeight: 1.65,
                marginTop: 32,
              }}
            >
              Built using the Anthropic Claude API. Responses are generated
              based on my career context and may not be perfect.
            </p>
            <a
              href="https://github.com/gufranahmed/gufran-ai"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center transition-colors"
              style={{
                gap: 6,
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                borderRadius: 6,
                padding: "6px 12px",
                fontFamily: "var(--font-sans)",
                fontSize: 12,
                fontWeight: 500,
                color: "var(--color-text-3)",
                marginTop: 14,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-text-1)";
                e.currentTarget.style.borderColor = "var(--color-border-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-3)";
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            >
              <Github size={14} />
              gufranahmed/gufran-ai
              <ExternalLink size={12} />
            </a>
          </motion.div>

          <motion.div
            variants={chatVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            style={{
              background: "var(--color-bg)",
              border: "1px solid var(--color-border)",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="relative flex items-center justify-between"
              style={{
                height: 44,
                background: "var(--color-surface-2)",
                borderBottom: "1px solid var(--color-border)",
                padding: "0 16px",
              }}
            >
              <div className="flex items-center" style={{ gap: 6 }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
                  <span
                    key={color}
                    className="ask-ai-traffic-dot"
                    style={{ background: color }}
                  />
                ))}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--color-text-3)",
                }}
              >
                Gufran-AI
              </div>
              <div
                className="flex items-center"
                style={{
                  gap: 6,
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  fontWeight: 400,
                  color: "var(--color-success)",
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)]"
                    style={{ animation: "pulse-ring 2s ease-out infinite" }}
                  />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
                </span>
                Online
              </div>
            </div>

            <div
              className="flex items-start"
              style={{
                gap: 14,
                padding: 20,
                background: "var(--color-surface)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <div
                className="flex items-center justify-center relative overflow-hidden"
                style={{
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                  background: "rgba(0, 191, 255, 0.1)",
                  border: "1px solid rgba(0, 191, 255, 0.35)",
                  borderRadius: "50%",
                  boxShadow: "0 0 10px rgba(0, 191, 255, 0.25)",
                }}
              >
                <img
                  src="/assets/avatar-ai.png"
                  alt="AI Avatar"
                  style={{
                    width: "120%",
                    height: "120%",
                    objectFit: "contain",
                    marginTop: "-2px",
                  }}
                />
              </div>
              <div>
                <div
                  className="flex items-center"
                  style={{
                    gap: 6,
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--color-text-1)",
                  }}
                >
                  <Hand size={14} style={{ color: "var(--color-accent)" }} />
                  Hi, I'm Gufran-AI,
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    fontWeight: 400,
                    color: "var(--color-text-2)",
                    lineHeight: 1.6,
                    marginTop: 6,
                  }}
                >
                  I'm an AI assistant that knows everything about{" "}
                  <strong
                    style={{ fontWeight: 600, color: "var(--color-text-1)" }}
                  >
                    Gufran Ahmed (Full Stack Engineer).
                  </strong>
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    fontWeight: 400,
                    color: "var(--color-text-2)",
                    lineHeight: 1.6,
                    marginTop: 4,
                  }}
                >
                  Ask me about his career, skills, experience, or projects.
                </p>
              </div>
            </div>

            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 10,
                  fontWeight: 600,
                  color: "var(--color-text-3)",
                  letterSpacing: "0.1em",
                  marginBottom: 10,
                }}
              >
                EXAMPLE QUESTIONS
              </div>
              {exampleQuestions.map((question, index) => (
                <button
                  key={question}
                  type="button"
                  className="ask-ai-question"
                  style={{
                    marginBottom: index === exampleQuestions.length - 1 ? 0 : 8,
                  }}
                  onClick={() => submitQuestion(question)}
                  disabled={isLoading}
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="ask-ai-messages">
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.role}-${index}-${message.content}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={
                    message.role === "user"
                      ? "ask-ai-message-user"
                      : "ask-ai-message-assistant"
                  }
                >
                  {message.role === "assistant" && (
                    <span
                      className="ask-ai-tag inline-flex items-center justify-center relative overflow-hidden align-middle"
                      style={{
                        width: 20,
                        height: 20,
                        background: "rgba(0, 191, 255, 0.1)",
                        border: "1px solid rgba(0, 191, 255, 0.35)",
                        borderRadius: "50%",
                        marginRight: 6,
                        verticalAlign: "text-bottom",
                      }}
                    >
                      <img
                        src="/assets/avatar-ai.png"
                        alt="AI"
                        style={{
                          width: "140%",
                          height: "140%",
                          objectFit: "contain",
                          marginTop: "-1px",
                        }}
                      />
                    </span>
                  )}
                  {message.content}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="ask-ai-message-assistant"
                  aria-label="Gufran-AI is typing"
                >
                  <span
                    className="ask-ai-tag inline-flex items-center justify-center relative overflow-hidden align-middle"
                    style={{
                      width: 20,
                      height: 20,
                      background: "rgba(0, 191, 255, 0.1)",
                      border: "1px solid rgba(0, 191, 255, 0.35)",
                      borderRadius: "50%",
                      marginRight: 6,
                      verticalAlign: "text-bottom",
                    }}
                  >
                    <img
                      src="/assets/avatar-ai.png"
                      alt="AI"
                      style={{
                        width: "140%",
                        height: "140%",
                        objectFit: "contain",
                        marginTop: "-1px",
                      }}
                    />
                  </span>
                  <span className="ask-ai-typing-dot" />
                  <span
                    className="ask-ai-typing-dot"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <span
                    className="ask-ai-typing-dot"
                    style={{ animationDelay: "0.3s" }}
                  />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div
              className="flex items-center"
              style={{
                gap: 8,
                padding: "14px 16px",
                borderTop: "1px solid var(--color-border)",
                background: "var(--color-surface)",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitQuestion();
                }}
                placeholder="Ask about my projects, skills, or experience..."
                className="ask-ai-input"
                disabled={isLoading}
              />
              <button
                type="button"
                className="ask-ai-send"
                onClick={() => submitQuestion()}
                disabled={!input.trim() || isLoading}
                aria-label="Send question"
              >
                <ArrowUp size={16} />
              </button>
            </div>

            <div
              style={{
                padding: "10px 16px",
                borderTop: "1px solid var(--color-border)",
                background: "var(--color-surface-2)",
                textAlign: "center",
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                fontWeight: 400,
                color: "var(--color-text-3)",
              }}
            >
              Gufran-AI™ — Powered by real experience.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
