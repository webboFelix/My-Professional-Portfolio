const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR'];

export function log(level, message, meta = {}) {
  const normalized = levels.includes(level) ? level : 'INFO';
  const entry = {
    time: new Date().toISOString(),
    level: normalized,
    message,
    ...meta,
  };
  console.log(JSON.stringify(entry));
}
