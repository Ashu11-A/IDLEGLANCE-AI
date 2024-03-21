'use client'
import { useCollapsed } from "@/hooks/useCollapsed"
import { mdiAccountCircleOutline, mdiBellOutline, mdiMagnify, mdiViewHeadline } from "@mdi/js"
import Icon from "@mdi/react"
import { useRouter } from "next/navigation"

export function NavBar() {
    const { toggleCollapsed } = useCollapsed()
    const router = useRouter()

      const menuItens = [
          {
            name: 'sidebar',
            icon: mdiViewHeadline,
            function: toggleCollapsed
          },
          {
            name: 'IDLEGLANCE',
            imagePath: '/IDLEGLANCE_TEXT_LOGO.webp',
            path: '/'
          }
        ]
    return (
        <nav className="w-full bg-background/50 backdrop-blur-2xl items-center fixed top-0 p-2 z-50">
            <ul className="flex flex-row justify-between">
                <div className="flex flex-row gap-5 tems-center">
                    {menuItens.map((item) => (
                        <li key={item.name}>
                            <a
                                className="flex flex-row gap-2 p-2 cursor-pointer rounded-full dark:hover:bg-neutral-700 light:hover:bg-neutral-500"
                                onClick={() => {
                                    if (item.path) router.push(item.path)
                                    if (item.function) item.function()
                                }}
                            >
                                {item.icon ? <Icon path={item.icon} size={1} /> : <p className="text-lg font-semibold">{item.name}</p>}
                            </a>
                        </li>
                    ))}
                </div>
                                
                <form action="" method="post" className="flex flex-row h-10 justify-center items-center rounded-full border border-zinc-500 overflow-hidden">
                    <input type="text" placeholder="Pesquisar..." className="p-2 mx-5 bg-transparent focus:outline-none" autoFocus={false} name="" id="" />
                    <div className="p-[1px] h-full bg-neutral-700" />
                    <div className="dark:bg-neutral-900 light:bg-neutral-200 items-center">
                        <button className="flex items-center justify-center">
                            <Icon path={mdiMagnify} size={1} className="m-2" />
                        </button>
                    </div>
                </form>

                <div className="flex flex-row gap-5 pr-2 items-center">
                    <Icon path={mdiBellOutline} size={1} />
                    <Icon path={mdiAccountCircleOutline} size={1.5} />
                </div>
            </ul>
        </nav>
    )
}