"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { GlassCard } from "@/components/UI/GlassCard";
import { Matrix3D } from "@/components/Effects/Matrix3D";
import { GlitchEffect } from "@/components/Effects/GlitchEffect";
import { Cyber3DInput } from "@/components/Effects/Cyber3DInput";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      await api.post("/api/contacts", formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setErrorMessage((error as Error).message || "Failed to send message");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Matrix3D />
      <div className="relative z-10 px-4 py-8 lg:px-10 lg:py-12 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlitchEffect intensity="low">
            <h1 className="text-4xl font-bold text-cyber-green tracking-wider mb-2">
              $ get_in_touch()
            </h1>
          </GlitchEffect>
          <p className="text-gray-400">
            Reach out for collaborations, opportunities, or just to chat
          </p>
        </motion.div>

        <div className="mx-auto max-w-2xl grid gap-8 md:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <GlassCard title="Contact Info">
              <div className="space-y-6">
                <div>
                  <p className="text-cyber-green font-mono text-sm mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:felixwebbo.fw@gmail.com"
                    className="text-gray-400 hover:text-cyber-green transition-colors break-all"
                  >
                    felixwebbo.fw@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-cyber-green font-mono text-sm mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+254702803400"
                    className="text-gray-400 hover:text-cyber-green transition-colors"
                  >
                    +254 702 803 400
                  </a>
                </div>
                <div>
                  <p className="text-cyber-green font-mono text-sm mb-1">
                    Location
                  </p>
                  <p className="text-gray-400">Nairobi, Kenya</p>
                </div>
                <div>
                  <p className="text-cyber-green font-mono text-sm mb-1">
                    Social
                  </p>
                  <div className="space-y-2">
                    <a
                      href="https://github.com/webboFelix"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-gray-400 hover:text-cyber-green transition-colors text-sm"
                    >
                      → GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/webbofelix"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-gray-400 hover:text-cyber-green transition-colors text-sm"
                    >
                      → LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard title="Send Message">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Cyber3DInput
                  label="Your Name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <Cyber3DInput
                  label="Your Email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <Cyber3DInput
                  label="Message"
                  name="message"
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={5}
                  required
                />

                {/* Status Messages */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-500/20 border border-green-500/50 rounded-sm text-green-400 text-sm font-mono"
                  >
                    ✓ Message sent successfully!
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/20 border border-red-500/50 rounded-sm text-red-400 text-sm font-mono"
                  >
                    ✗ Error: {errorMessage}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === "loading"}
                  type="submit"
                  className="w-full px-4 py-2 bg-cyber-green/20 border-2 border-cyber-green text-cyber-green font-mono text-sm rounded-sm hover:bg-cyber-green/30 disabled:opacity-50 transition-all duration-300"
                >
                  {status === "loading" ? "[ SENDING... ]" : "[ SEND MESSAGE ]"}
                </motion.button>
              </form>
            </GlassCard>
          </motion.div>
        </div>

        {/* Response Time Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-2xl"
        >
          <GlassCard>
            <div className="font-mono text-sm text-gray-400 space-y-2">
              <p className="text-cyber-green">$ cat response_time.txt</p>
              <p>I typically respond to messages within 24 hours.</p>
              <p>
                For urgent matters, feel free to reach out directly via phone.
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
