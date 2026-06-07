export type LogLineType = 'prompt' | 'cmd' | 'out' | 'ok' | 'warn' | 'err';

export interface LogLine {
  type: LogLineType;
  text: string;
}

const NMAP_BLOCKS: LogLine[][] = [
  [
    { type: 'prompt', text: '┌──(kali㉿kali)-[~]' },
    { type: 'prompt', text: '└─$ nmap -sS -T4 10.10.14.0/24' },
    { type: 'out', text: 'Starting Nmap 7.94SVN ( https://nmap.org )' },
    { type: 'out', text: 'Nmap scan report for 10.10.14.24' },
    { type: 'ok', text: 'PORT   STATE SERVICE' },
    { type: 'ok', text: '22/tcp open  ssh' },
    { type: 'ok', text: '80/tcp open  http' },
    { type: 'ok', text: '443/tcp open https' },
  ],
  [
    { type: 'prompt', text: '└─$ gobuster dir -u http://10.10.14.24 -w /usr/share/wordlists/dirb/common.txt' },
    { type: 'out', text: '===============================================================' },
    { type: 'ok', text: '/admin                (Status: 403)' },
    { type: 'ok', text: '/login                (Status: 200)' },
    { type: 'ok', text: '/api                  (Status: 401)' },
  ],
  [
    { type: 'prompt', text: '└─$ sqlmap -u "http://target/item?id=1" --batch --dbs' },
    { type: 'out', text: '[INFO] testing connection to the target URL' },
    { type: 'warn', text: '[WARNING] heuristic (basic) test shows parameter might be injectable' },
    { type: 'ok', text: 'available databases [3]:' },
    { type: 'ok', text: '[*] information_schema' },
    { type: 'ok', text: '[*] webapp' },
  ],
];

const MSF_BLOCKS: LogLine[][] = [
  [
    { type: 'prompt', text: 'msf6 > use exploit/multi/handler' },
    { type: 'ok', text: '[+] Using configured payload generic/shell_reverse_tcp' },
    { type: 'prompt', text: 'msf6 exploit(multi/handler) > set LHOST tun0' },
    { type: 'ok', text: 'LHOST => 10.10.14.2' },
    { type: 'prompt', text: 'msf6 exploit(multi/handler) > run' },
    { type: 'out', text: '[*] Started reverse TCP handler on 10.10.14.2:4444' },
  ],
  [
    { type: 'prompt', text: 'msf6 > search type:exploit platform:linux' },
    { type: 'out', text: 'Matching Modules' },
    { type: 'ok', text: '  exploit/linux/local/cve_2021_4034_pwnkit' },
    { type: 'ok', text: '  exploit/linux/http/apache_mod_cgi_bash_env_exec' },
  ],
];

const MISC: LogLine[][] = [
  [
    { type: 'prompt', text: '└─$ hydra -l admin -P rockyou.txt ssh://10.10.14.24' },
    { type: 'out', text: '[DATA] max 16 tasks per 1 server' },
    { type: 'warn', text: '[ATTEMPT] target 10.10.14.24 - login "admin" pass "password123"' },
    { type: 'ok', text: '[22][ssh] host: 10.10.14.24   login: admin   password: summer2024!' },
  ],
  [
    { type: 'prompt', text: '└─$ nuclei -u https://target.app -t cves/' },
    { type: 'ok', text: '[CVE-2024-XXXX] [medium] exposed panel detected' },
    { type: 'out', text: 'Scan completed: 1 match found' },
  ],
  [
    { type: 'prompt', text: '└─$ aws sts get-caller-identity' },
    { type: 'out', text: '{ "Account": "REDACTED", "Arn": "arn:aws:iam::..." }' },
    { type: 'warn', text: '[!] Overly permissive IAM role detected' },
  ],
];

export function pickLogStream(variant: 'nmap' | 'msf' | 'misc'): LogLine[] {
  const pools = { nmap: NMAP_BLOCKS, msf: MSF_BLOCKS, misc: MISC };
  const pool = pools[variant];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function flattenWithDelay(lines: LogLine[], delayMs = 0): LogLine[] {
  return lines;
}
