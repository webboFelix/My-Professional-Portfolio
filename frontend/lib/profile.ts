/** Webbo Felix — portfolio profile (override via .env.local) */

export const profile = {
  name: process.env.NEXT_PUBLIC_AUTHOR_NAME || 'Webbo Felix',
  handle: process.env.NEXT_PUBLIC_AUTHOR_HANDLE || 'webboFelix',
  headline: process.env.NEXT_PUBLIC_AUTHOR_HEADLINE || 'CYBERSECURITY ANALYST | ASPIRING VAPT ENGINEER',
  bio:
    process.env.NEXT_PUBLIC_AUTHOR_BIO ||
    'Passionate about offensive security and finding vulnerabilities before attackers do. I focus on securing systems, networks, cloud environments and web applications through ethical hacking, automation and proactive assessments.',
  location: process.env.NEXT_PUBLIC_LOCATION || 'Nairobi, Kenya',
  phone: process.env.NEXT_PUBLIC_PHONE || '',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'webbofelix@example.com',
  github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/webboFelix',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/in/webbofelix',
  statusLine: 'Always learning. Always securing.',
  footerLeft: 'Securing today, automating the future, empowering tomorrow.',
  footerRight: '> Keep Learning. Keep Hacking. Keep Building. </>',
};

export const aboutBullets = [
  'Vulnerability assessments & penetration testing',
  'Web, network & cloud security assessments',
  'Ethical hacking with OWASP-aligned methodology',
  'Automation with Python, Bash & PowerShell',
];

export const skillGroups = [
  {
    title: 'Offensive Security',
    color: 'border-cyber-green text-cyber-green',
    skills: ['Ethical Hacking', 'Penetration Testing', 'OWASP Top 10'],
  },
  {
    title: 'Web Security',
    color: 'border-cyber-cyan text-cyber-cyan',
    skills: ['Burp Suite', 'SQLi', 'XSS', 'SSRF', 'CSRF'],
  },
  {
    title: 'Network Security',
    color: 'border-cyber-amber text-cyber-amber',
    skills: ['Nmap', 'Wireshark', 'Netcat', 'Metasploit'],
  },
  {
    title: 'Cloud Security',
    color: 'border-blue-400 text-blue-400',
    skills: ['AWS', 'Azure', 'GCP', 'IAM'],
  },
  {
    title: 'Automation',
    color: 'border-purple-400 text-purple-400',
    skills: ['Python', 'Bash', 'PowerShell', 'Scripting'],
  },
];

export const focusAreas = [
  { icon: '🎯', label: 'Vulnerability Assessments' },
  { icon: '🌐', label: 'Web App Testing' },
  { icon: '📡', label: 'Network Recon' },
  { icon: '☁️', label: 'Cloud Security' },
  { icon: '⚙️', label: 'Automation' },
  { icon: '🛡️', label: 'Risk Mitigation' },
];

export const tools = [
  'Kali Linux',
  'Nmap',
  'Burp Suite',
  'Wireshark',
  'Metasploit',
  'Bash',
  'Python',
  'AWS',
];

export const githubStats = {
  repositories: '15+',
  projects: '10+',
  commits: '250+',
  stars: '50+',
};
