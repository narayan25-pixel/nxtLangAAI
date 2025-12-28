'use client';
import { Box, TextField, Stack, Typography, Paper, CircularProgress, Chip } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import CustomButton from '../components/Button/CustomButton';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{ chapter: string; verse: string; chapterName: string }>;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  React.useEffect(() => {
    // Only auto-scroll if container is scrolled near the bottom or at the top (new conversation)
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      const isEmpty = messages.length === 0;
      
      if (isNearBottom || isEmpty) {
        setTimeout(scrollToBottom, 0);
      }
    }
  }, [messages]);

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
    <Box className="flex flex-col h-full">
      <Box className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <Typography variant="h4">
          Ask About Bhagavad Gita
        </Typography>
      </Box>

      <Box className="flex-1 overflow-y-auto p-4 min-h-0" ref={messagesContainerRef}>
        <Stack spacing={2}>
          {messages.length === 0 && (
            <Paper className="p-4 bg-gray-50 dark:bg-neutral-800">
              <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                Ask any question about the Bhagavad Gita. For example:
              </Typography>
              <ul className="mt-2 ml-4 text-sm text-gray-600 dark:text-gray-400">
                <li>What does Chapter 2, Verse 47 teach?</li>
                <li>Tell me about karma yoga</li>
                <li>What is the meaning of detachment?</li>
              </ul>
            </Paper>
          )}

          {messages.map((msg, idx) => (
            <Paper
              key={idx}
              className={`p-4 ${
                msg.role === 'user'
                  ? 'bg-blue-50 dark:bg-blue-900 ml-auto max-w-[80%]'
                  : 'bg-gray-50 dark:bg-neutral-800 mr-auto max-w-[80%]'
              }`}
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

      <Box className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black flex-shrink-0">
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
