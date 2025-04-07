import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the CMS page
    router.push('/cms');
  }, []);

  return (
    <div>
      <Head>
        <title>Ahmedi98 - Portfolio</title>
        <meta name="description" content="Ahmedi98 Portfolio Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Loading...</h1>
            <p className="text-gray-600">Redirecting to the main page...</p>
          </div>
        </div>
      </main>
    </div>
  );
} 