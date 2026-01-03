'use client'
import { useSearchParams } from "next/navigation";
import slokasData from '@/slokas.seed.json';
import { use, useEffect, useState } from "react";
import SlokaCard from "@/app/components/SlokaCard/SlokaCard";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export default function page({ params }: { params: Promise<{ id: string; verseid: string }> }) {
  const { id, verseid } = use(params);
  const [item, setItem] = useState<any>(null);
  const filteredItem = () => {
    const result = slokasData.find((s: any) => s.chapterNumber === id && s.slokaNumber === verseid);

    setItem(result);
  }
  useEffect(() => {
    filteredItem();
  }, []);

   const router = useRouter();

  console.log('Fetched item:', item);
  return (
    <div className="p-4 lg:w-3/4"> 
      <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
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

      <div className="mt-4">
        {item ? (
        <div>
          <SlokaCard
            key={item?._id ?? item?.id ?? `${item?.chapterNumber}-${item?.slokaNumber}`}
            item={item}
          />
        </div>
      ) : (
        <p>Loading or no item found.</p>
      )}
      </div>
    </div>
  )
}
