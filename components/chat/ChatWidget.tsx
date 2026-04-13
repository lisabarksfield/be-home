"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  showForm?: boolean;
}

interface LeadForm {
  name: string;
  email: string;
  message: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, welcome to Be Home! I'm here to help with questions about our spaces, classes, treatments, or anything else. What can I help you with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadForm>({ name: "", email: "", message: "" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMessage: Message = { role: "user", content: input };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("Chat error");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value);
        setMessages((m) => {
          const updated = [...m];
          updated[updated.length - 1] = { role: "assistant", content: assistantText };
          return updated;
        });
      }

      // Detect lead capture trigger
      const hasForm = assistantText.includes("[ENQUIRY_FORM]");
      setMessages((m) => {
        const updated = [...m];
        updated[updated.length - 1] = {
          role: "assistant",
          content: assistantText.replace("[ENQUIRY_FORM]", "").trim(),
          showForm: hasForm,
        };
        return updated;
      });
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble right now. Please try again or email us at hello@behomecascais.com",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email || !leadForm.message) return;

    // Find the last user message to use as context
    const lastUserMsg = [...messages].reverse().find(m => m.role === "user")?.content ?? "";

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: leadForm.name,
        email: leadForm.email,
        subject: "Chat enquiry",
        message: `Via chat assistant.\n\nOriginal question: ${lastUserMsg}\n\nMessage: ${leadForm.message}`,
      }),
    });

    setLeadSubmitted(true);
    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        content: `Thanks ${leadForm.name}! We've got your details and will be in touch at ${leadForm.email} shortly.`,
      },
    ]);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl hover:opacity-90 transition-opacity"
        aria-label="Chat with Be Home"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ backgroundColor: "var(--color-cream)", border: "1px solid var(--color-stone)" }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 flex items-center gap-3"
            style={{ backgroundColor: "var(--color-charcoal)" }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
              style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
            >
              BH
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--color-cream)" }}>
                Be Home Assistant
              </p>
              <p className="text-xs" style={{ color: "var(--color-stone)" }}>
                Ask me anything
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-96">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[90%] space-y-3">
                  <div
                    className="rounded-xl px-4 py-2.5 text-sm leading-relaxed"
                    style={
                      msg.role === "user"
                        ? { backgroundColor: "var(--color-charcoal)", color: "var(--color-cream)" }
                        : { backgroundColor: "var(--color-stone-warm)", color: "var(--color-charcoal)" }
                    }
                  >
                    {msg.content || (loading && i === messages.length - 1 ? "..." : "")}
                  </div>

                  {/* Inline lead capture form */}
                  {msg.showForm && !leadSubmitted && (
                    <form
                      onSubmit={submitLead}
                      className="rounded-xl p-4 space-y-2.5 text-sm"
                      style={{ backgroundColor: "var(--color-stone-warm)", border: "1px solid var(--color-stone)" }}
                    >
                      <p className="font-medium text-xs uppercase tracking-wider" style={{ color: "var(--color-stone-deep)" }}>
                        Leave your details
                      </p>
                      <input
                        required
                        placeholder="Your name"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                        style={{ backgroundColor: "var(--color-cream)", color: "var(--color-charcoal)" }}
                      />
                      <input
                        required
                        type="email"
                        placeholder="Your email"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                        style={{ backgroundColor: "var(--color-cream)", color: "var(--color-charcoal)" }}
                      />
                      <textarea
                        required
                        placeholder="Your question or message"
                        value={leadForm.message}
                        onChange={(e) => setLeadForm((f) => ({ ...f, message: e.target.value }))}
                        rows={3}
                        className="w-full rounded-lg px-3 py-2 text-sm outline-none resize-none"
                        style={{ backgroundColor: "var(--color-cream)", color: "var(--color-charcoal)" }}
                      />
                      <button
                        type="submit"
                        className="w-full py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
                      >
                        Send message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="p-3 flex gap-2 border-t"
            style={{ borderColor: "var(--color-stone)" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
              style={{ backgroundColor: "var(--color-stone-warm)", color: "var(--color-charcoal)" }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40 transition-opacity"
              style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
