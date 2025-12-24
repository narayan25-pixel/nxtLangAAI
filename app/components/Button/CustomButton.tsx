import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
    variant?: 'contained' | 'outlined' | 'text' | 'submit';
    title: string;
    onSubmit?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
    variant, 
    onSubmit,
    onClick,
    type,
    title,
    startIcon,
    ...props 
}) => {
    const isSubmitVariant = variant === 'submit';
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isSubmitVariant && onSubmit) {
            onSubmit();
        }
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <Button 
        variant={isSubmitVariant ? 'contained' : variant}
        type={isSubmitVariant ? 'submit' : type}
        onClick={handleClick}
        sx={{
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          transition: 'all 0.3s ease',
          ...(variant === 'contained' || isSubmitVariant ? {
            background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c61 100%)',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.25)',
            '&:hover': {
              background: 'linear-gradient(135deg, #e55a2b 0%, #ff6b35 100%)',
              boxShadow: '0 6px 20px rgba(255, 107, 53, 0.35)',
              transform: 'translateY(-2px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
            '&:disabled': {
              background: 'linear-gradient(135deg, #ccc 0%, #ddd 100%)',
              color: '#888',
              boxShadow: 'none',
            }
          } : {}),
          ...(variant === 'outlined' ? {
            borderColor: '#ff6b35',
            color: '#ff6b35',
            borderWidth: '2px',
            '&:hover': {
              borderColor: '#e55a2b',
              backgroundColor: 'rgba(255, 107, 53, 0.05)',
              borderWidth: '2px',
            }
          } : {}),
          ...(variant === 'text' ? {
            color: '#ff6b35',
            '&:hover': {
              backgroundColor: 'rgba(255, 107, 53, 0.08)',
            }
          } : {}),
        }}
        startIcon={startIcon}
        {...props}
        >{title}</Button>
    );
};

export default CustomButton;