'use client';
import { Box, Stack, TextField, Typography, Alert } from '@mui/material';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CustomButton from '../components/Button/CustomButton';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push('/');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-zinc-900 dark:to-black">
      <Box className="w-full max-w-md p-8">
        <Box className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl p-8">
          <Box className="text-center mb-8">
            <Box className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <Typography variant="h3" className="text-white font-bold">
                आ
              </Typography>
            </Box>
            <Typography variant="h4" className="font-bold text-gray-800 dark:text-white mb-2">
              Welcome to Atmagyaan
            </Typography>
            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
              Your guide to self-knowledge and wisdom
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {error && (
                <Alert severity="error" className="rounded-lg">
                  {error}
                </Alert>
              )}

              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                autoComplete="off"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#ff6b35',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#ff6b35',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#ff6b35',
                  },
                }}
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                autoComplete="off"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#ff6b35',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#ff6b35',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#ff6b35',
                  },
                }}
              />

              <CustomButton
                variant="submit"
                title={loading ? 'Signing in...' : 'Sign In'}
                disabled={loading}
              />
            </Stack>
          </form>

          <Box className="mt-6 text-center">
            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
              Only registered users can access this application
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
