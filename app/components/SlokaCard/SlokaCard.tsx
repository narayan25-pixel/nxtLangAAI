"use client";
import React from "react";
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type Sloka = {
  _id?: string;
  id?: string;
  chapterNumber: string;
  chapterName: string;
  slokaNumber: string;
  sloka: string;
  ctreatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

type SlokaCardProps = {
  item: Sloka;
  onDelete?: (item: Sloka) => void;
  onEdit?: (item: Sloka) => void;
};

export default function SlokaCard({ item, onDelete, onEdit }: SlokaCardProps) {
  const key = item._id ?? item.id ?? `${item.chapterNumber}-${item.slokaNumber}`;
  
  return (
    <div
      data-key={key}
      className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-neutral-900"
    >
      <div className="px-4 pt-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Sloka {item.slokaNumber}
            </p>
          </div>
          <div className="flex gap-1">
            {onEdit && (
              <IconButton
                size="small"
                onClick={() => onEdit(item)}
                aria-label="edit"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            {onDelete && (
              <IconButton
                size="small"
                onClick={() => onDelete(item)}
                aria-label="delete"
                color="error"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 pt-2">
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
          {item.sloka}
        </p>
      </div>
    </div>
  );
}