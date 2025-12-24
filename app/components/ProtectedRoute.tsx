'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <Box className="text-center">
          <CircularProgress sx={{ color: '#ff6b35' }} />
          <Typography className="mt-4 text-gray-600 dark:text-gray-400">
            Loading...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return <>{children}</>;
}
