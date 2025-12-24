"use client";
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

type ChapterCardProps = {
  chapterNumber: string;
  chapterName: string;
  slokaCount: number;
};

export default function ChapterCard({ chapterNumber, chapterName, slokaCount }: ChapterCardProps) {
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-l-transparent hover:border-l-orange-500 bg-white dark:bg-neutral-900"
      onClick={() => router.push(`/chapter/${chapterNumber}`)}
      sx={{
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <CardContent className="p-6">
        <Box className="flex items-center gap-3 mb-3">
          <Box className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
            {chapterNumber}
          </Box>
          <Typography variant="h6" component="div" className="font-semibold text-gray-800 dark:text-gray-100">
            Chapter {chapterNumber}
          </Typography>
        </Box>
        <Typography variant="body1" className="text-gray-700 dark:text-gray-300 mb-3 font-medium">
          {chapterName}
        </Typography>
        <Box className="flex items-center gap-2">
          <Box className="px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800">
            <Typography variant="caption" className="text-orange-600 dark:text-orange-400 font-medium">
              {slokaCount} {slokaCount === 1 ? 'Verse' : 'Verses'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
