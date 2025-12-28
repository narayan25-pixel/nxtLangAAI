"use client";
import { use, useState } from "react";
import useSlokas from "@/hooks/useSlokas";
import SlokaCard from "@/app/components/SlokaCard/SlokaCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { Controller, useForm } from "react-hook-form";

export default function ChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { slokas, loading, error, refresh } = useSlokas();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedSloka, setSelectedSloka] = useState<any>(null);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      chapterNumber: '',
      chapterName: '',
      slokaNumber: '',
      sloka: '',
    },
  });

  const handleDelete = async (item: any) => {
    if (!confirm(`Delete Sloka ${item.slokaNumber} from Chapter ${item.chapterNumber}?`)) {
      return;
    }

    try {
      await axios.delete("/api/deleteSlokas", {
        data: {
          chapterNumber: item.chapterNumber,
          slokaNumber: item.slokaNumber,
        },
      });
      refresh();
    } catch (e) {
      console.error("Failed to delete sloka", e);
      alert("Failed to delete sloka");
    }
  };

  const handleEdit = (item: any) => {
    setSelectedSloka(item);
    reset({
      chapterNumber: item.chapterNumber,
      chapterName: item.chapterName,
      slokaNumber: item.slokaNumber,
      sloka: item.sloka,
    });
    setEditDialogOpen(true);
  };

  const onEditSubmit = async (data: any) => {
    try {
      await axios.put('/api/updateSloka', {
        id: selectedSloka._id,
        ...data,
      });
      
      setEditDialogOpen(false);
      refresh();
      alert('Sloka updated successfully!');
    } catch (e) {
      alert('Failed to update sloka');
    }
  };

  // Filter slokas for this chapter
  const chapterSlokas = Array.isArray(slokas)
    ? slokas.filter((s: any) => s.chapterNumber === id)
    : [];

  const chapterName = chapterSlokas[0]?.chapterName || `Chapter ${id}`;

  return (
    <div className="p-4">
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
          Back to Chapters
        </Button>
        
        <Button
          startIcon={<AddIcon />}
          onClick={() => router.push(`/addSloka?chapterNumber=${id}&chapterName=${encodeURIComponent(chapterName)}`)}
          variant="contained"
          disabled
          sx={{
            background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c61 100%)',
            color: '#fff',
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            padding: '8px 20px',
            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.25)',
            '&:hover': {
              background: 'linear-gradient(135deg, #e55a2b 0%, #ff6b35 100%)',
              boxShadow: '0 6px 20px rgba(255, 107, 53, 0.35)',
              transform: 'translateY(-2px)',
            }
          }}
        >
          Add Sloka
        </Button>
      </Box>

      <Typography variant="h4" className="mb-4">
        Chapter {id}: {chapterName} , Total Slokas: {chapterSlokas.length}
      </Typography>

      {loading && <div>Loading slokas...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {!loading && !error && (
        <div className="grid gap-4">
          {chapterSlokas.length > 0 ? (
            chapterSlokas.map((s: any) => (
              <SlokaCard
                key={s?._id ?? s?.id ?? `${s?.chapterNumber}-${s?.slokaNumber}`}
                item={s}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <div className="text-gray-500">No slokas found for this chapter.</div>
          )}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Sloka</DialogTitle>
        <form onSubmit={handleSubmit(onEditSubmit)}>
          <DialogContent>
            <Stack spacing={3}>
              <Controller
                name="chapterNumber"
                control={control}
                rules={{ required: 'Chapter number is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Chapter Number"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    autoComplete="off"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#ff6b35' },
                        '&.Mui-focused fieldset': { borderColor: '#ff6b35' },
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#ff6b35' },
                    }}
                  />
                )}
              />

              <Controller
                name="chapterName"
                control={control}
                rules={{ required: 'Chapter name is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Chapter Name"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    autoComplete="off"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#ff6b35' },
                        '&.Mui-focused fieldset': { borderColor: '#ff6b35' },
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#ff6b35' },
                    }}
                  />
                )}
              />

              <Controller
                name="slokaNumber"
                control={control}
                rules={{ required: 'Sloka number is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Sloka Number"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    autoComplete="off"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#ff6b35' },
                        '&.Mui-focused fieldset': { borderColor: '#ff6b35' },
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#ff6b35' },
                    }}
                  />
                )}
              />

              <Controller
                name="sloka"
                control={control}
                rules={{ required: 'Sloka text is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Sloka"
                    multiline
                    rows={6}
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    autoComplete="off"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#ff6b35' },
                        '&.Mui-focused fieldset': { borderColor: '#ff6b35' },
                      },
                      '& .MuiInputLabel-root.Mui-focused': { color: '#ff6b35' },
                    }}
                  />
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => setEditDialogOpen(false)}
              sx={{ 
                color: '#666',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="contained"
              disabled
              sx={{
                background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c61 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #e55a2b 0%, #ff6b35 100%)',
                }
              }}
            >
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
