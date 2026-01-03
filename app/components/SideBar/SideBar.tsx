'use client'
import CustomButton from '../Button/CustomButton'
import { useRouter } from 'next/navigation'

export default function SideBar() {
  const router = useRouter()

  return (
    <div className="h-full lg:h-screen lg:overflow-y-auto p-4 bg-gradient-to-b from-orange-50/50 to-white dark:from-orange-950/20 dark:to-neutral-900">
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
