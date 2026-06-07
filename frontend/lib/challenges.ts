export type ChallengeCategory = 'networking' | 'cloud' | 'pentest';

export interface Challenge {
  id: string;
  category: ChallengeCategory;
  prompt: string;
  answers: string[];
}

export const CHALLENGES: Challenge[] = [
  {
    id: 'net-1',
    category: 'networking',
    prompt: 'CMD: Default port for HTTPS?',
    answers: ['443', 'port 443'],
  },
  {
    id: 'net-2',
    category: 'networking',
    prompt: 'CMD: Protocol that maps IP addresses to MAC addresses?',
    answers: ['arp', 'address resolution protocol'],
  },
  {
    id: 'net-3',
    category: 'networking',
    prompt: 'CMD: Tool to capture packets on an interface?',
    answers: ['wireshark', 'tcpdump'],
  },
  {
    id: 'net-4',
    category: 'networking',
    prompt: 'CMD: OSI layer where routing primarily occurs?',
    answers: ['layer 3', 'network layer', '3', 'network'],
  },
  {
    id: 'net-5',
    category: 'networking',
    prompt: 'CMD: Command to trace route to a host (Windows)?',
    answers: ['tracert', 'traceroute'],
  },
  {
    id: 'net-6',
    category: 'networking',
    prompt: 'CMD: Port number for DNS over UDP?',
    answers: ['53', 'port 53'],
  },
  {
    id: 'net-7',
    category: 'networking',
    prompt: 'CMD: Protocol used for secure remote shell?',
    answers: ['ssh', 'secure shell'],
  },
  {
    id: 'net-8',
    category: 'networking',
    prompt: 'CMD: What does VLAN stand for?',
    answers: ['virtual local area network', 'vlan'],
  },
  {
    id: 'cloud-1',
    category: 'cloud',
    prompt: 'CMD: AWS service for object storage?',
    answers: ['s3', 'amazon s3', 'simple storage service'],
  },
  {
    id: 'cloud-2',
    category: 'cloud',
    prompt: 'CMD: Azure identity service (acronym)?',
    answers: ['aad', 'azure ad', 'entra id', 'entra'],
  },
  {
    id: 'cloud-3',
    category: 'cloud',
    prompt: 'CMD: GCP command-line tool name?',
    answers: ['gcloud', 'google cloud sdk'],
  },
  {
    id: 'cloud-4',
    category: 'cloud',
    prompt: 'CMD: IAM stands for?',
    answers: ['identity and access management', 'identity access management'],
  },
  {
    id: 'cloud-5',
    category: 'cloud',
    prompt: 'CMD: Container orchestrator by Kubernetes acronym?',
    answers: ['k8s', 'kubernetes'],
  },
  {
    id: 'cloud-6',
    category: 'cloud',
    prompt: 'CMD: AWS serverless compute service?',
    answers: ['lambda', 'aws lambda'],
  },
  {
    id: 'cloud-7',
    category: 'cloud',
    prompt: 'CMD: Misconfiguration scanner often used for AWS (tool)?',
    answers: ['prowler', 'scout suite', 'scoutsuite'],
  },
  {
    id: 'cloud-8',
    category: 'cloud',
    prompt: 'CMD: Principle of least ___?',
    answers: ['privilege', 'least privilege'],
  },
  {
    id: 'pentest-1',
    category: 'pentest',
    prompt: 'CMD: Administrative superuser command on Linux?',
    answers: ['sudo', 'su'],
  },
  {
    id: 'pentest-2',
    category: 'pentest',
    prompt: 'CMD: Burp Suite is used for testing what?',
    answers: ['web applications', 'web app', 'web', 'http'],
  },
  {
    id: 'pentest-3',
    category: 'pentest',
    prompt: 'CMD: Tool for automated SQL injection?',
    answers: ['sqlmap'],
  },
  {
    id: 'pentest-4',
    category: 'pentest',
    prompt: 'CMD: Metasploit framework language (historically)?',
    answers: ['ruby'],
  },
  {
    id: 'pentest-5',
    category: 'pentest',
    prompt: 'CMD: OWASP Top 10 category for XSS?',
    answers: ['injection', 'cross-site scripting', 'xss'],
  },
  {
    id: 'pentest-6',
    category: 'pentest',
    prompt: 'CMD: Nmap default scan type flag for SYN scan?',
    answers: ['-ss', 'sS', 'syn'],
  },
  {
    id: 'pentest-7',
    category: 'pentest',
    prompt: 'CMD: Tool for password hash cracking (popular)?',
    answers: ['hashcat', 'john', 'john the ripper'],
  },
  {
    id: 'pentest-8',
    category: 'pentest',
    prompt: 'CMD: Recon framework starting with "R" for OSINT?',
    answers: ['recon-ng', 'recon ng', 'reconng'],
  },
  {
    id: 'pentest-9',
    category: 'pentest',
    prompt: 'CMD: Vulnerability scanner by Tenable?',
    answers: ['nessus'],
  },
  {
    id: 'pentest-10',
    category: 'pentest',
    prompt: 'CMD: What does VAPT stand for?',
    answers: [
      'vulnerability assessment and penetration testing',
      'vulnerability assessment penetration testing',
    ],
  },
];

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function pickRandomChallenge(): Challenge {
  return CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
}

export function verifyChallenge(challenge: Challenge, userInput: string): boolean {
  const answer = normalize(userInput);
  if (!answer) return false;
  return challenge.answers.some((accepted) => {
    const a = normalize(accepted);
    return answer === a || answer.includes(a) || a.includes(answer);
  });
}

export function categoryLabel(cat: ChallengeCategory) {
  const map = { networking: 'NET', cloud: 'CLOUD', pentest: 'OFFSEC' };
  return map[cat];
}
