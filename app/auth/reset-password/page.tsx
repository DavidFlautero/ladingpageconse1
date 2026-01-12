'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg(null);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error(error);
      setStatus('error');
      setErrorMsg(error.message);
      return;
    }

    setStatus('success');
    // Redirige donde quieras después de cambiar la contraseña
    router.replace('/login'); // o '/admin'
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Restablecer contraseña</h1>

      {(status === 'idle' || status === 'loading') && (
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: 12 }}>
            Nueva contraseña
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ display: 'block', width: '100%', marginTop: 4, padding: 8 }}
            />
          </label>

          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Guardando...' : 'Guardar contraseña'}
          </button>
        </form>
      )}

      {status === 'success' && <p>Contraseña actualizada. Redirigiendo…</p>}
      {status === 'error' && <p>Error: {errorMsg ?? 'No se pudo actualizar la contraseña.'}</p>}
    </div>
  );
}
