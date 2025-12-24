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
    <div className="h-full lg:h-screen lg:overflow-y-auto p-6 bg-gradient-to-b from-orange-50/50 to-white dark:from-orange-950/20 dark:to-neutral-900">
      {/* Mobile: Horizontal navbar layout */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <Box className="flex items-center gap-3">
          <Box className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
            <Typography variant="body1" className="text-white font-bold">
              {userInitials}
            </Typography>
          </Box>
          <Typography variant="body1" className="font-semibold text-gray-800 dark:text-gray-100">
            {session?.user?.name || 'User'}
          </Typography>
        </Box>
        <CustomButton
          color="secondary"
          title="Logout"
          onClick={handleLogout}
          variant="text"
          startIcon={<LogoutIcon />}
        />
      </div>

      {/* Desktop: Vertical sidebar layout */}
      <div className="hidden lg:block">
        <Box className="mb-8 pb-6 border-b border-orange-200 dark:border-orange-900/30">
          <Box className="flex items-center gap-3 mb-2">
            <Box className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
              <Typography variant="h6" className="text-white font-bold">
                {userInitials}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" className="font-bold text-gray-800 dark:text-gray-100">
                Welcome
              </Typography>
              <Typography variant="body2" className="text-orange-600 dark:text-orange-400 font-medium">
                {session?.user?.name || 'User'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>

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
        <CustomButton
          color="secondary"
          title="Add New Sloka"
          onClick={() => router.push('/addSloka')}
          fullWidth
          variant="outlined"
        />

        {/* Logout - Desktop only (mobile has it in header) */}
        <Box className="hidden lg:block mt-8 pt-6 border-t border-orange-200 dark:border-orange-900/30 w-full">
          <CustomButton
            color="secondary"
            title="Logout"
            onClick={handleLogout}
            fullWidth
            variant="text"
            startIcon={<LogoutIcon />}
          />
        </Box>
      </div>
    </div>
  )
}
