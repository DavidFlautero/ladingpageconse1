'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');

  useEffect(() => {
    const supabase = createClient();
    const code = searchParams.get('code');

    if (!code) {
      setStatus('error');
      return;
    }

    const run = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error(error);
        setStatus('error');
        return;
      }

      setStatus('ok');
      // Redirige donde quieras después de loguear
      router.replace('/admin'); // o la ruta de tu panel
    };

    run();
  }, [searchParams, router]);

  if (status === 'loading') return <p>Procesando acceso...</p>;
  if (status === 'error') return <p>Enlace inválido o expirado. Probá generar uno nuevo.</p>;

  return <p>Listo, ya estás logueado. Redirigiendo…</p>;
}
