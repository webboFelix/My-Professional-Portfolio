/** Webbo Felix — portfolio profile (override via .env.local) */

export const profile = {
  name: process.env.NEXT_PUBLIC_AUTHOR_NAME || "Webbo Felix",
  handle: process.env.NEXT_PUBLIC_AUTHOR_HANDLE || "webboFelix",
  headline:
    process.env.NEXT_PUBLIC_AUTHOR_HEADLINE ||
    "SOC ANALYST | VAPT ENGINEER | Ethical Hacker | Cloud Security Enthusiast",
  bio:
    process.env.NEXT_PUBLIC_AUTHOR_BIO ||
    "SOC Analyst and Cloud Security Engineer with hands-on experience in Vulnerability Assessment, Penetration Testing, Web Application Security, Cloud Security, and Network Security. Skilled in Kali Linux, Burp Suite, Nmap, OWASP Top 10, vulnerability management, and offensive security methodologies, with certifications in Ethical Hacking and Cloud Security. Passionate about identifying vulnerabilities, analyzing threats, strengthening security defenses, and securing cloud and enterprise environments.",
  location: process.env.NEXT_PUBLIC_LOCATION || "Nairobi, Kenya",
  phone: process.env.NEXT_PUBLIC_PHONE || "+254702803400",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "felixwebbo.fw@gmail.com",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/webboFelix",
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ||
    "https://linkedin.com/in/webbofelix",
  statusLine: "Always learning. Always securing.",
  footerLeft: "Securing today, automating the future, empowering tomorrow.",
  footerRight: "> Keep Learning. Keep Hacking. Keep Building. </>",
};

export const aboutBullets = [
  "SOC Analyst & Threat Hunting.",
  "Vulnerability assessments & penetration testing",
  "Web, network & cloud security assessments",
  "Ethical hacking with OWASP-aligned methodology",
  "Automation with Python, Bash & PowerShell",
];

export const skillGroups = [
  {
    title: "Offensive Security",
    color: "border-cyber-green text-cyber-green",
    skills: ["Ethical Hacking", "Penetration Testing", "OWASP Top 10"],
  },
  {
    title: "SOC & Threat Analysis",
    color: "border-cyber-cyan text-cyber-cyan",
    skills: ["SIEM", "Threat Hunting", "Incident Response", "Log Analysis"],
  },
  {
    title: "Web Security",
    color: "border-cyber-cyan text-cyber-cyan",
    skills: ["Burp Suite", "SQLi", "XSS", "SSRF", "CSRF"],
  },
  {
    title: "Network Security",
    color: "border-cyber-amber text-cyber-amber",
    skills: ["Nmap", "Wireshark", "Netcat", "Metasploit"],
  },
  {
    title: "Cloud Security",
    color: "border-blue-400 text-blue-400",
    skills: ["AWS", "Azure", "GCP", "IAM"],
  },
  {
    title: "Automation",
    color: "border-purple-400 text-purple-400",
    skills: ["Python", "Bash", "PowerShell", "Scripting"],
  },
];

export const focusAreas = [
  { icon: "🎯", label: "SOC & Vulnerability Assessments" },
  { icon: "🌐", label: "Web App Testing" },
  { icon: "📡", label: "Network Recon" },
  { icon: "☁️", label: "Cloud Security" },
  { icon: "⚙️", label: "Automation" },
  { icon: "🛡️", label: "Risk Mitigation" },
];

export const tools = [
  "Kali Linux",
  "SIEM Tools",
  "Nmap",
  "Burp Suite",
  "Wireshark",
  "Metasploit",
  "Bash",
  "Python",
  "AWS",
];

export const githubStats = {
  repositories: "15+",
  projects: "10+",
  commits: "250+",
  stars: "50+",
};
