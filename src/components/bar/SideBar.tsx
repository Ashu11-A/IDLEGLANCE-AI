'use client'
import { useCollapsed } from '@/hooks/useCollapsed'
import { mdiCog, mdiHeart, mdiHomeVariant, mdiWhiteBalanceSunny } from '@mdi/js'
import { Icon } from '@mdi/react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export function SideBar() {
  const [isAnimated, setIsAnimated] = useState<Record<string, boolean>>({})
  const { collapsed: isCollapsed } = useCollapsed()
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
        name: 'Para Você',
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
    <motion.div
      className={`z-40 fixed rounded-r-3xl h-[100vh] flex flex-col justify-between bg-transparent`}
      initial={{ width: isCollapsed ? '3.5rem' : '15rem' }}
      animate={{ width: isCollapsed ? '15rem' : '3.5rem' }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex flex-col gap-1 mt-16 mx-2 items-center justify-center`}>
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
                <div className='text-nowrap'>
                  {item.name.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: isCollapsed ? 0 : 1 }}
                      animate={{ opacity: isCollapsed ? 1 : 0  }}
                      transition={{
                        duration: 0.25,
                        delay: index / 25,
                      }}
                  >
                    {letter}
                  </motion.span>
                  ))}
                </div>
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
                <div className='text-nowrap'>
                  {item.name.split('').map((letter, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: isCollapsed ? 0 : 1 }}
                        animate={{ opacity: isCollapsed ? 1 : 0  }}
                        transition={{
                          duration: 0.25,
                          delay: index / 25,
                        }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
            </div>
        ))}
      </div>
    </motion.div>
  )
}