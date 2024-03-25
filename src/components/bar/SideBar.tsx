'use client'
import { useCollapsed } from '@/hooks/useCollapsed'
import { mdiCog, mdiHeart, mdiHomeVariant, mdiWhiteBalanceSunny } from '@mdi/js'
import { Icon } from '@mdi/react'
import { AnimatePresence, motion } from 'framer-motion'
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
      id: 'home',
      path: '/',
      name: 'Inicio',
      icon: mdiHomeVariant
    },
    {
      id: 'for-you',
      path: '/for-you',
      name: 'Para Você',
      icon: mdiHeart
    }
  ]

  const sideItens = [
    {
        id: 'theme-switch',
        name: 'Theme Switch',
        icon: mdiWhiteBalanceSunny,
        function: handleThemeSwitcher
    },
    {
      id: 'settings',
      path: '/settings',
      name: 'Configurações',
      icon: mdiCog
    }
  ]

  return (
    <motion.div
      className={`z-40 fixed bg-background/50 backdrop-blur-2xl rounded-r-3xl h-[100vh] flex flex-col justify-between`}
      initial={{ width: isCollapsed ? '3.5rem' : '15rem' }}
      animate={{ width: isCollapsed ? '15rem' : '3.5rem' }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex flex-col gap-1 mt-16 mx-2 items-center justify-center`}>
        {menuItens.map((item) => (
          <div
              key={item.id}
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
                <AnimatePresence>
                    {isCollapsed && item.name.split('').map((letter, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.25,
                          delay: index / 25,
                        }}
                        exit={{
                          opacity: 0,
                          transition: {
                            duration: 0.20,
                            delay: index / 50,
                          }
                        }}
                    >
                      {letter}
                    </motion.span>
                    ))}
                </AnimatePresence>
              </div>
          </div>
        ))}
      </div>
      <div className='flex flex-col gap-5 p-2 mt-10 items-center justify-center'>
        {sideItens.map((item) => {
          if (item.id === 'theme-switch' && pathName.includes('video')) return
          return (
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
                  <AnimatePresence>
                      {isCollapsed && item.name.split('').map((letter, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.25,
                            delay: index / 25,
                          }}
                          exit={{
                            opacity: 0,
                            transition: {
                              duration: 0.20,
                              delay: index / 50,
                            }
                          }}
                      >
                        {letter}
                      </motion.span>
                      ))}
                  </AnimatePresence>
                </div>
            </div>
          )
      })}
      </div>
    </motion.div>
  )
}