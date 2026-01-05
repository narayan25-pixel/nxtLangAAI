"use client";
import { use } from "react";
import SlokaCard from "@/app/components/SlokaCard/SlokaCard";
import { useRouter } from "next/navigation";
import { Typography, Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import slokasData from '@/slokas.seed.json';

export default function ChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const handleClick = (item:any)=>{
    router.push(`/chapter/${item.chapterNumber}/verse/${item.slokaNumber}`);
  }

  const chapterSlokas = Array.isArray(slokasData)
    ? slokasData.filter((s: any) => s.chapterNumber === id)
    : [];

  const chapterName = chapterSlokas[0]?.chapterName || `Chapter ${id}`;

  return (
    <div className="p-4 lg:w-3/4">
      <Box className="mb-4 flex items-center justify-between">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/allSlokas")}
          variant="outlined"
          sx={{
            borderColor: '#ff6b35',
            color: '#ff6b35',
            borderWidth: '2px',
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            padding: '8px 20px',
            '&:hover': {
              borderColor: '#e55a2b',
              backgroundColor: 'rgba(255, 107, 53, 0.05)',
              borderWidth: '2px',
            }
          }}
        >
          Back
        </Button>
        
      </Box>

      <Typography variant="h4" className="mb-4">
        Chapter {id}: {chapterName} , Total Slokas: {chapterSlokas.length}
      </Typography>

      
        <div className="grid gap-4">
          {chapterSlokas.length > 0 ? (
            chapterSlokas.map((s: any) => (
              <SlokaCard
                key={s?._id ?? s?.id ?? `${s?.chapterNumber}-${s?.slokaNumber}`}
                item={s}
                onClick={handleClick}
              />
            ))
          ) : (
            <div className="text-gray-500">No slokas found for this chapter.</div>
          )}
        </div>
    </div>
  );
}
