"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TerminalLine {
  id: string;
  text: string;
  isCommand: boolean;
  isSection?: boolean;
  typed?: boolean;
}

const aboutContent = [
  {
    text: "whoami",
    isCommand: false,
    isSection: true,
  },
  {
    text: "I'm a Security Analyst combining offensive techniques with defensive strategies to forge robust security solutions. My expertise spans network architecture, cloud environments (AWS/Azure), and deep-dive digital forensics.",
    isCommand: false,
  },

  { text: "", isCommand: false },
  {
    text: "cat focus.txt",
    isCommand: false,
    isSection: true,
  },
  {
    text: "Passionate about continuous learning and community contribution through technical writeups and CTF competitions. Currently researching APT detection, AD Security, and Malware Analysis.",
    isCommand: false,
  },

  { text: "", isCommand: false },
  {
    text: "cat expertise.log",
    isCommand: false,
    isSection: true,
  },
  {
    text: "✓ VAPT & Penetration Testing | Kali Linux, Burp Suite, Nmap",
    isCommand: false,
  },
  {
    text: "✓ Network Security Assessment | Wireshark, Packet Tracer",
    isCommand: false,
  },
  {
    text: "✓ Cloud Security | AWS, Azure, IAM Security Best Practices",
    isCommand: false,
  },
  { text: "✓ SIEM Fundamentals & Incident Response", isCommand: false },
  {
    text: "✓ CTF Challenges & Security Labs (HackTheBox, TryHackMe)",
    isCommand: false,
  },

  { text: "", isCommand: false },
  {
    text: "cat skills.sh",
    isCommand: false,
    isSection: true,
  },
  {
    text: "  - Vulnerability Assessments & Penetration Testing",
    isCommand: false,
  },
  {
    text: "  - Web Application Security Testing (OWASP Top 10)",
    isCommand: false,
  },
  { text: "  - Network Security & Cloud Security", isCommand: false },
  {
    text: "  - Linux/Windows Administration & Active Directory",
    isCommand: false,
  },
  { text: "  - SIEM & Threat Analysis", isCommand: false },
];

export function AutoTypingTerminal() {
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let displayBuffer: TerminalLine[] = [];

    const typeInterval = setInterval(() => {
      if (currentLineIndex >= aboutContent.length) {
        setIsTyping(false);
        clearInterval(typeInterval);
        return;
      }

      const currentContent = aboutContent[currentLineIndex];

      // Section headers and empty lines display instantly and stay
      if (currentContent.isSection || currentContent.text === "") {
        displayBuffer.push({
          ...currentContent,
          id: `${currentLineIndex}-final`,
        });
        setDisplayedLines([...displayBuffer]);
        currentLineIndex++;
        currentCharIndex = 0;
        return;
      }

      // Regular lines type character by character but accumulate
      if (currentCharIndex === 0) {
        // First character - add new line
        displayBuffer.push({
          ...currentContent,
          text: currentContent.text.charAt(0),
          id: `${currentLineIndex}-0`,
        });
      } else if (currentCharIndex < currentContent.text.length) {
        // Middle characters - update the last line with more text
        const lastLine = displayBuffer[displayBuffer.length - 1];
        displayBuffer[displayBuffer.length - 1] = {
          ...lastLine,
          text: currentContent.text.substring(0, currentCharIndex + 1),
        };
      } else {
        // Line complete - finalize and move to next
        const lastLine = displayBuffer[displayBuffer.length - 1];
        displayBuffer[displayBuffer.length - 1] = {
          ...lastLine,
          text: currentContent.text,
          id: `${currentLineIndex}-final`,
        };
        currentLineIndex++;
        currentCharIndex = 0;
        setDisplayedLines([...displayBuffer]);
        return;
      }

      setDisplayedLines([...displayBuffer]);
      currentCharIndex++;
    }, 25); // Speed: 25ms per character for smooth typing

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-cyber-green/50 rounded-lg overflow-hidden bg-black/70 backdrop-blur-sm"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 bg-cyber-green/10 px-4 py-2 border-b border-cyber-green/30">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-cyber-green" />
        </div>
        <span className="font-mono text-xs text-cyber-green ml-2">
          root@pentester:~# Webbo_Felix
        </span>
      </div>

      {/* Terminal Content */}
      <div className="p-6 font-mono text-sm space-y-0 min-h-96 max-h-96 overflow-y-auto scrollbar-hide">
        {displayedLines.map((line, index) => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={
              line.isSection
                ? "text-cyan-400 text-base font-bold mt-4 mb-2 flex items-center gap-2"
                : line.text === ""
                  ? "mb-2"
                  : "text-cyber-green leading-relaxed"
            }
          >
            {line.isSection && <span>→</span>}
            {line.text}
            {isTyping &&
              index === displayedLines.length - 1 &&
              !line.isSection && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="ml-1 inline-block"
                >
                  █
                </motion.span>
              )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
