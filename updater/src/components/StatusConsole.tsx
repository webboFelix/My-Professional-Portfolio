import { useEffect, useState } from 'react';
import { adminApi } from '../services/api';

export function StatusConsole() {
  const [lines, setLines] = useState<string[]>(['[init] Admin panel ready.']);

  useEffect(() => {
    adminApi
      .health()
      .then((h) => setLines((l) => [...l, `[ok] API ${h.status}`]))
      .catch(() => setLines((l) => [...l, '[err] API offline — start backend on :4000']));
  }, []);

  return (
    <div className="status-console">
      {lines.map((line, i) => (
        <div key={i} className={line.includes('[err]') ? 'err' : 'ok'}>
          {line}
        </div>
      ))}
    </div>
  );
}
