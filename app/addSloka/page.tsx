'use client';
import { Box, Stack, TextField, Typography, IconButton, Divider, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import axios from 'axios'
import CustomButton from '../components/Button/CustomButton'
import { useSearchParams, useRouter } from 'next/navigation'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface SlokaFormData {
  slokaNumber: string;
  sloka: string;
}

interface FormValues {
  chapterNumber: string;
  chapterName: string;
  slokas: SlokaFormData[];
}


export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get('mode');
  const isEditMode = mode === 'edit';
  
  const [editData, setEditData] = React.useState<any>(null);

  const { control, handleSubmit, reset, setValue } = useForm<FormValues>({
    defaultValues: {
      chapterNumber: '',
      chapterName: '',
      slokas: [{ slokaNumber: '', sloka: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'slokas',
  });

  useEffect(() => {
    if (isEditMode) {
      const storedData = localStorage.getItem('editSlokaData');
      if (storedData) {
        const data = JSON.parse(storedData);
        setEditData(data);
        setValue('chapterNumber', data.chapterNumber);
        setValue('chapterName', data.chapterName);
        setValue('slokas.0.slokaNumber', data.slokaNumber);
        setValue('slokas.0.sloka', data.sloka);
      }
    } else {
      const chapterNumber = searchParams.get('chapterNumber');
      const chapterName = searchParams.get('chapterName');
      if (chapterNumber) setValue('chapterNumber', chapterNumber);
      if (chapterName) setValue('chapterName', chapterName);
    }
  }, [isEditMode, searchParams, setValue]);

  const onSubmit = async (data: FormValues) => {
    try {
      if (isEditMode && editData) {
        await axios.put('/api/updateSloka', {
          id: editData.id,
          chapterNumber: data.chapterNumber,
          chapterName: data.chapterName,
          slokaNumber: data.slokas[0].slokaNumber,
          sloka: data.slokas[0].sloka,
        });
        
        localStorage.removeItem('editSlokaData');
        alert('Sloka updated successfully!');
        router.push(`/chapter/${data.chapterNumber}`);
      } else {
        const slokaPayloads = data.slokas.map(s => ({
          chapterNumber: data.chapterNumber,
          chapterName: data.chapterName,
          slokaNumber: s.slokaNumber,
          sloka: s.sloka,
          ctreatedBy: 'admin'
        }));

        const promises = slokaPayloads.map(payload => 
          axios.post('/api/addSlokas', payload)
        );
        
        await Promise.all(promises);
        
        reset({
          chapterNumber: data.chapterNumber,
          chapterName: data.chapterName,
          slokas: [{ slokaNumber: '', sloka: '' }],
        });
        
        alert(`Successfully added ${slokaPayloads.length} sloka(s)!`);
      }
    } catch (e) {
      alert(isEditMode ? 'Failed to update sloka' : 'Failed to add slokas');
    }
  };

  return (
    <Box className="absolute inset-0 m-10 p-10 flex items-start justify-center bg-zinc-50 dark:bg-black overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ width: { xs: '100%', sm: 500, md: 600 }, maxWidth: '100%' }}>
          {/* Back button - only show if came from chapter page */}
          {(editData || searchParams.get('chapterNumber')) && (
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => router.push(`/chapter/${editData?.chapterNumber || searchParams.get('chapterNumber')}`)}
              variant="outlined"
              sx={{
                borderColor: '#ff6b35',
                color: '#ff6b35',
                borderWidth: '2px',
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 600,
                padding: '8px 20px',
                alignSelf: 'flex-start',
                '&:hover': {
                  borderColor: '#e55a2b',
                  backgroundColor: 'rgba(255, 107, 53, 0.05)',
                  borderWidth: '2px',
                }
              }}
            >
              Back to Chapter {editData?.chapterNumber || searchParams.get('chapterNumber')}
            </Button>
          )}

          <Typography variant="h5" className="font-bold">
            {isEditMode ? 'Edit Sloka' : 'Add New Sloka(s)'}
          </Typography>

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
            )}
          />

          <Divider sx={{ my: 2 }} />

          {/* Dynamic Sloka Fields */}
          {fields.map((field, index) => (
            <Box key={field.id} className="p-4 border-2 border-orange-200 rounded-xl bg-white dark:bg-zinc-800 relative">
              <Box className="flex items-center justify-between mb-3">
                <Typography variant="h6" className="text-orange-600 font-semibold">
                  Sloka #{index + 1}
                </Typography>
                {fields.length > 1 && (
                  <IconButton 
                    onClick={() => remove(index)}
                    sx={{ color: '#ef4444' }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                )}
              </Box>

              <Stack spacing={2}>
                <Controller
                  name={`slokas.${index}.slokaNumber`}
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
                  )}
                />

                <Controller
                  name={`slokas.${index}.sloka`}
                  control={control}
                  rules={{ required: 'Sloka text is required', minLength: { value: 1, message: 'Required' } }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Sloka Text"
                      multiline
                      rows={4}
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
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
                  )}
                />
              </Stack>
            </Box>
          ))}

          {/* Add Another Sloka Button - hide in edit mode */}
          {!isEditMode && (
            <CustomButton
              variant="outlined"
              title="Add Another Sloka"
              onClick={() => append({ slokaNumber: '', sloka: '' })}
              startIcon={<AddCircleOutlineIcon />}
              type="button"
            />
          )}

          <CustomButton 
            variant="submit" 
            title={isEditMode ? 'Update Sloka' : `Save ${fields.length} Sloka${fields.length > 1 ? 's' : ''}`} 
          />
        </Stack>
      </form>
      </Box>
  );
}
