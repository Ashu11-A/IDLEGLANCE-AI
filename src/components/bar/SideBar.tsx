'use client'
import { mdiCog, mdiHeart, mdiHomeVariant, mdiViewHeadline, mdiWhiteBalanceSunny } from '@mdi/js'
import { Icon } from '@mdi/react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export function SideBar() {
  const [isAnimated, setIsAnimated] = useState<Record<string, boolean>>({})
  const [isCollapsed, setIsCollapsed] = useState(true)
  const pathName = usePathname()
  const router = useRouter()

  const { theme, setTheme } = useTheme()

  const handleClick = (name: string) => {
    setIsAnimated({
      ...isAnimated,
      [name]: !isAnimated[name]
    })
    console.log(theme)
  }

  const handleThemeSwitcher = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const menuItens = [
    {
      path: '/',
      name: 'Inicio',
      icon: mdiHomeVariant
    },
    {
        path: '/for-you',
        name: 'Para Voçê',
        icon: mdiHeart
    }
  ]

  const sideItens = [
    {
        name: 'Theme Switch',
        icon: mdiWhiteBalanceSunny,
        function: handleThemeSwitcher
    },
    {
      path: '/settings',
      name: 'Configurações',
      icon: mdiCog
    }
  ]

  return (
    <div className={`z-50 fixed rounded-r-3xl ${isCollapsed ? 'min-w-60' : 'max-w-14'} h-[100vh] flex flex-col justify-between bg-transparent`}>
      <div className={`flex flex-col gap-1 p-2 mt-10 ${isCollapsed && 'mx-2'}  items-center justify-center`}>
        {menuItens.map((item) => (
            <div
                key={item.name}
                className={`flex flex-row w-full gap-5 px-2 py-2 rounded-xl cursor-pointer ${pathName === item.path && 'dark:bg-neutral-800 light:bg-neutral-500'} dark:hover:bg-neutral-700 light:hover:bg-neutral-500`}
                onClick={() => {
                    router.push(isCollapsed && item.path !== undefined ? item.path : pathName)
                    handleClick(item.name)
                }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ rotate: isAnimated[item.name] ? 360 : 0, scale: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20
                    }}
                    >
                    <Icon path={item.icon} size={1} />
                </motion.div>
                {isCollapsed && item.name}
            </div>
        ))}
      </div>
      <div className='flex flex-col gap-5 p-2 mt-10 items-center justify-center'>
        {sideItens.map((item) => (
            <div
                key={item.name}
                className={`flex flex-row w-full gap-5 px-2 py-2 rounded-xl cursor-pointer ${pathName === item.path && 'dark:bg-neutral-800 light:bg-neutral-500'} dark:hover:bg-neutral-700 light:hover:bg-neutral-500`}
                onClick={() => {
                    router.push(isCollapsed && item.path !== undefined ? item.path : pathName)
                    handleClick(item.name)
                    if (item?.function !== undefined) item.function()
                    }
                }
            >
                <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: isAnimated[item.name] ? 360 : 0, scale: 1 }}
                transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20
                }}
                >
                <Icon path={item.icon} size={1} />
                </motion.div>
                {isCollapsed && item.name}
            </div>
        ))}
      </div>
    </div>
  )
}