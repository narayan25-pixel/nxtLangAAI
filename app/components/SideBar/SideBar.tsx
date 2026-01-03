'use client'
import CustomButton from '../Button/CustomButton'
import { useRouter } from 'next/navigation'
import { Box, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { signOut, useSession } from 'next-auth/react'

export default function SideBar() {
  const router = useRouter()
  const { data: session } = useSession()

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' })
  }

  // Get user initials from name
  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  const userInitials = getInitials(session?.user?.name);

  return (
    <div className="h-full lg:h-screen lg:overflow-y-auto p-4 bg-gradient-to-b from-orange-50/50 to-white dark:from-orange-950/20 dark:to-neutral-900">

      {/* Navigation buttons - Horizontal on mobile, vertical on desktop */}
      <div className="flex lg:flex-col gap-3">
        <CustomButton
          color="secondary"
          title="Ask AI"
          onClick={() => router.push('/')}
          fullWidth
          variant="contained"
        />
        <CustomButton
          color="secondary"
          title="All the Slokas"
          onClick={() => router.push('/allSlokas')}
          fullWidth
          variant="outlined"
        />
      </div>
    </div>
  )
}
