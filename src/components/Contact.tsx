"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Loader2, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import confetti from "canvas-confetti";
import { personalInfo } from "@/config/portfolio";

export function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formState.message.length < 10) {
      newErrors.message = "Message should be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    // Simulate sending email (Resend/EmailJS template mock)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
      
      // Trigger canvas-confetti for success wow factor!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#8b5cf6", "#ffffff"]
      });
      
      // Reset success status after a delay
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[350px] bg-gradient-to-t from-blue-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-3">
            06. Connect
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Get In Touch
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Socials and Context */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white">Let's build something epic.</h4>
              <p className="text-sm font-light text-zinc-400 leading-relaxed max-w-sm">
                Have a question, a project idea, or just want to talk about AI, systems engineering, or code? Send me a message and let's connect.
              </p>
            </div>

            <div className="flex items-center gap-3 text-zinc-400">
              <Mail className="h-4.5 w-4.5 text-blue-500" />
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-sm font-mono hover:text-white transition-colors clickable"
              >
                {personalInfo.email}
              </a>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h5 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                Follow Me
              </h5>
              <div className="flex gap-3">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-white/5 bg-zinc-950/40 text-zinc-400 hover:text-white hover:border-white/15 transition-all clickable"
                  aria-label="GitHub Profile"
                >
                  <FaGithub className="h-5 w-5" />
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-white/5 bg-zinc-950/40 text-zinc-400 hover:text-white hover:border-white/15 transition-all clickable"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
                <a
                  href={personalInfo.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-white/5 bg-zinc-950/40 text-zinc-400 hover:text-white hover:border-white/15 transition-all clickable"
                  aria-label="Twitter Profile"
                >
                  <FaTwitter className="h-5 w-5" />
                </a>
                <a
                  href={personalInfo.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-white/5 bg-zinc-950/40 text-zinc-400 hover:text-white hover:border-white/15 transition-all clickable"
                  aria-label="Instagram Profile"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-8 rounded-2xl border border-white/5 bg-zinc-950/30 backdrop-blur-md"
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono text-zinc-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    disabled={status === "sending"}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-xl border bg-black text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/10 transition-colors ${
                      errors.name ? "border-red-500/50" : "border-white/5"
                    }`}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500/80 font-mono block">{errors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-mono text-zinc-400">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    disabled={status === "sending"}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 rounded-xl border bg-black text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/10 transition-colors ${
                      errors.email ? "border-red-500/50" : "border-white/5"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500/80 font-mono block">{errors.email}</span>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-mono text-zinc-400">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleInputChange}
                    disabled={status === "sending"}
                    placeholder="Hey Aditya, I'd love to chat about a new project..."
                    className={`w-full px-4 py-3 rounded-xl border bg-black text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/10 transition-colors resize-none ${
                      errors.message ? "border-red-500/50" : "border-white/5"
                    }`}
                  />
                  {errors.message && (
                    <span className="text-xs text-red-500/80 font-mono block">{errors.message}</span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors disabled:opacity-50 text-sm clickable"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : status === "success" ? (
                    <>
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      <span>Message Sent Successfully!</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
