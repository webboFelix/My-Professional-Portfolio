import { useEffect, useState } from 'react';
import { adminApi, saveAdminKey } from '../services/api';

export function ApiKeyPanel() {
  const [key, setKey] = useState('');
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');

  useEffect(() => {
    const stored = sessionStorage.getItem('admin_api_key');
    if (stored) setKey(stored);
  }, []);

  const verify = async () => {
    saveAdminKey(key.trim());
    try {
      await adminApi.verifyKey();
      setStatus('ok');
    } catch {
      setStatus('err');
    }
  };

  return (
    <div className="admin-card" style={{ marginBottom: '1rem' }}>
      <h2>API Authentication</h2>
      <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.75rem' }}>
        Enter the same <code>ADMIN_API_KEY</code> set in backend/.env
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Admin API key"
          style={{ flex: 1, minWidth: '200px' }}
        />
        <button type="button" onClick={verify}>
          Verify
        </button>
      </div>
      {status === 'ok' && <p className="ok" style={{ marginTop: '0.5rem' }}>[OK] Key accepted</p>}
      {status === 'err' && (
        <p className="err" style={{ marginTop: '0.5rem' }}>
          [ERR] Invalid key or API offline
        </p>
      )}
    </div>
  );
}
