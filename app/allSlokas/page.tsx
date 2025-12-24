"use client";
import useSlokas from "@/hooks/useSlokas";
import ChapterCard from "../components/ChapterCard/ChapterCard";
import { Box, Typography } from "@mui/material";

export default function AllSlokas() {
  const { slokas, loading, error } = useSlokas();

  // Group slokas by chapter
  const chapterMap = new Map<string, any[]>();
  if (Array.isArray(slokas)) {
    slokas.forEach((sloka: any) => {
      const key = sloka.chapterNumber;
      if (!chapterMap.has(key)) {
        chapterMap.set(key, []);
      }
      chapterMap.get(key)!.push(sloka);
    });
  }

  // Convert to array and sort by chapter number
  const chapters = Array.from(chapterMap.entries())
    .map(([chapterNumber, slokas]) => ({
      chapterNumber,
      chapterName: slokas[0]?.chapterName || '',
      slokaCount: slokas.length,
    }))
    .sort((a, b) => Number(a.chapterNumber) - Number(b.chapterNumber));

  return (
    <div className="p-6">
      <Box className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
          Bhagavad Gita Chapters
        </h1>
        <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
          Explore all 18 chapters of the sacred scripture
        </Typography>
      </Box>
      
      {loading && <div>Loading chapters...</div>}
      {error && <div className="text-red-500">{error}</div>}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.length > 0 ? (
            chapters.map((chapter) => (
              <ChapterCard
                key={chapter.chapterNumber}
                chapterNumber={chapter.chapterNumber}
                chapterName={chapter.chapterName}
                slokaCount={chapter.slokaCount}
              />
            ))
          ) : (
            <div className="text-gray-500">No chapters found.</div>
          )}
        </div>
      )}
    </div>
  );
}
