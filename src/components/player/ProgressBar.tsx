import { formatTime } from "@/functions/formatTime";
import { Dispatch, MouseEvent, SetStateAction, useRef, useState } from "react";

export default function ProgressBar({ current, total, setTime }: { current: number, total: number, setTime: Dispatch<SetStateAction<number>>  }) {
    const progress = current / total * 100;
    const refDiv = useRef<HTMLDivElement>(null)
    const [MouseEnter, setMouseEnter] = useState(false)
    const [timestamp, setTimestamp] = useState('')
    const [mouseX, setMouseX] = useState(0)

    function getClickTime (clientX: MouseEvent['clientX']) {
        const clickX = clientX - (refDiv.current?.getBoundingClientRect().left ?? 0); // Armazena a distância horizontal entre o clique e a borda esquerda
        const newProgress = clickX / (refDiv.current?.offsetWidth ?? 0); //  calcula a nova posição do clique como uma porcentagem da largura total da linha
        const newTime = newProgress * total; // Esta linha converte a nova posição do clique em segundos

        // console.log(`${clientX} - ${refDiv.current?.getBoundingClientRect().left ?? 0}: ${clickX}`)
        // console.log(`${clickX} / ${refDiv.current?.offsetWidth ?? 0}: ${newProgress}`)
        // console.log(`${newProgress} * ${total}: ${newTime}`)
        setMouseX(clickX)
        return newTime
    }

    const handleProgressClick = (event: { clientX: MouseEvent['clientX'] }) => {
        // clientX: Captura a posição do clique do mouse
        // getBoundingClientRect: subtrai a posição do canto esquerdo do elemento
        const timeClick = getClickTime(event.clientX)
        setTime(timeClick)
    }
    const handleMouseMove = (event: { clientX: MouseEvent['clientX'] }) => {
        const timeClick = getClickTime(event.clientX)
        const formattedTime = formatTime(timeClick);
        
        if (timestamp !== formattedTime) {
            setTimestamp(formattedTime)
            console.log(formattedTime)
        }
    }

    return (
        <div onMouseMove={handleMouseMove}>
            <div
                ref={refDiv}
                className={`${MouseEnter ? 'h-2 -top-0.5' : 'h-1'} w-full bg-white/30 z-50 absolute top-0`}
                onClick={handleProgressClick}
                onMouseEnter={() => setMouseEnter(true)}
                onMouseLeave={() => { setMouseEnter(false); setTimestamp('') }}
            >
                <div className={`${MouseEnter ? 'h-2 -top-0.5' : 'h-1'} bg-red-500 transition-[width] ease-in-out duration-300`} style={{ width: `${progress.toFixed()}%` }}></div>
            </div>
            <span
                style={{
                    position: 'absolute',
                    top: '-2rem',
                    left: `${mouseX >= ((refDiv.current?.offsetWidth ?? 0) * 0.05) && mouseX <= ((refDiv.current?.offsetWidth ?? 0) * 0.92) ? `${mouseX}px` : mouseX <= ((refDiv.current?.offsetWidth ?? 0) * 0.92) ? '15px' : 'none'}`,
                    color: 'white',
                    fontFamily: 'sans-serif',
                    fontSize: "14px",
                    fontWeight: '700'
                }}
            >
                {timestamp}
            </span>
        </div>
    )
}