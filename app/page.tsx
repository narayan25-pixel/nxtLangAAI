'use client';
import { Box, TextField, Stack, Typography, Paper, CircularProgress, Chip } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import CustomButton from './components/Button/CustomButton';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{ chapter: string; verse: string; chapterName: string }>;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const resp = await axios.post('/api/chat', { question: input });
      const assistantMessage: Message = {
        role: 'assistant',
        content: resp.data.answer,
        sources: resp.data.sources,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        role: 'assistant',
        content: error?.response?.data?.error || 'Failed to get response. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="flex flex-col h-full bg-gradient-to-b from-orange-50/30 to-transparent dark:from-orange-950/20">
      <Box className="p-6 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
        <Typography variant="h4" className="font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
          Life Guidance from Bhagavad Gita
        </Typography>
        <Typography variant="body2" className="text-gray-600 dark:text-gray-400 mt-1">
          Your manual for life • Find answers to any life question from 700 verses
        </Typography>
      </Box>

      <Box className="flex-1 overflow-y-auto p-4 min-h-0">
        <Stack spacing={2}>
          {messages.length === 0 && (
            <Paper className="p-6 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/30 dark:to-neutral-900 border border-orange-100 dark:border-orange-900/30" sx={{ borderRadius: '16px' }}>
              <Typography variant="h6" className="text-orange-600 dark:text-orange-400 mb-3 font-semibold">
                ✨ Start Your Journey
              </Typography>
              <Typography variant="body2" className="text-gray-700 dark:text-gray-300 mb-3">
                Ask any question about life, purpose, relationships, or challenges. The Bhagavad Gita has answers:
              </Typography>
              <ul className="space-y-2 ml-4 mt-4">
                <li className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                  <span className="text-orange-500">→</span>
                  <span>How do I find my true purpose in life?</span>
                </li>
                <li className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                  <span className="text-orange-500">→</span>
                  <span>What should I do when facing a difficult decision?</span>
                </li>
                <li className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                  <span className="text-orange-500">→</span>
                  <span>How can I overcome fear and anxiety in my work?</span>
                </li>
              </ul>
            </Paper>
          )}

          {messages.map((msg, idx) => (
            <Paper
              key={idx}
              className={`p-4 ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white ml-auto max-w-[80%] shadow-lg'
                  : 'bg-white dark:bg-neutral-800 mr-auto max-w-[80%] border border-gray-200 dark:border-gray-700'
              }`}
              sx={{ borderRadius: '16px' }}
            >
              <Typography variant="body1" className="whitespace-pre-wrap">
                {msg.content}
              </Typography>
              {msg.sources && msg.sources.length > 0 && (
                <Stack direction="row" spacing={1} className="mt-2" flexWrap="wrap">
                  <Typography variant="caption" className="text-gray-600 dark:text-gray-400 mr-2">
                    Sources:
                  </Typography>
                  {msg.sources.map((source, i) => (
                    <Chip
                      key={i}
                      label={`Ch ${source.chapter}:${source.verse}`}
                      size="small"
                      variant="outlined"
                      className="mb-1"
                    />
                  ))}
                </Stack>
              )}
            </Paper>
          ))}

          {loading && (
            <Paper className="p-4 bg-gray-50 dark:bg-neutral-800 mr-auto max-w-[80%]">
              <CircularProgress size={20} />
            </Paper>
          )}
        </Stack>
      </Box>

      <Box className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md flex-shrink-0">
        <form onSubmit={handleSubmit}>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              placeholder="Ask a question about the Bhagavad Gita..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              multiline
              maxRows={3}
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
              }}
            />
            <CustomButton
              variant="contained"
              title={loading ? 'Sending...' : 'Ask'}
              type="submit"
              disabled={loading || !input.trim()}
            />
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
