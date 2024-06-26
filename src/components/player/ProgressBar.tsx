import { formatTime } from "@/functions/formatTime";
import { MouseEvent, memo, useCallback, useRef, useState } from "react";
import { Storyboards } from "./Storyboards";

function ProgressBar({ currentTime, duration, seekTo }: { currentTime: number, duration: number, seekTo: (time: number) => void }) {    
  const [MouseEnter, setMouseEnter] = useState(false)
  const [timestamp, setTimestamp] = useState('')
  const [time, setTime] = useState(0)
  const [mouseX, setMouseX] = useState(0)

  const progress = currentTime / duration * 100;
  const refDiv = useRef<HTMLDivElement>(null)

  const getClickTime = useCallback((clientX: MouseEvent['clientX']) => {
    const clickX = clientX - (refDiv.current?.getBoundingClientRect().left ?? 0); // Armazena a distância horizontal entre o clique e a borda esquerda
    const newProgress = clickX / (refDiv.current?.offsetWidth ?? 0); //  calcula a nova posição do clique como uma porcentagem da largura total da linha
    const newTime = newProgress * duration; // Esta linha converte a nova posição do clique em segundos

    setMouseX(clickX)
    return newTime
  }, [duration])

  const handleProgressClick = useCallback((event: { clientX: MouseEvent['clientX'] }) => {
    // clientX: Captura a posição do clique do mouse
    // getBoundingClientRect: subtrai a posição do canto esquerdo do elemento
    const timeClick = getClickTime(event.clientX)
    seekTo(timeClick)
  }, [getClickTime, seekTo])

  const handleMouseMove = useCallback((event: { clientX: MouseEvent['clientX'] }) => {
    const timeClick = getClickTime(event.clientX)
    const formattedTime = formatTime(timeClick);
        
    if (timestamp !== formattedTime) {
      setTime(timeClick)
      setTimestamp(formattedTime)
      console.log(formattedTime)
    }
  }, [getClickTime, timestamp])

  return (
    <div onMouseMove={handleMouseMove}>
      <div
        ref={refDiv}
        className={`z-0 absolute top-0 ${MouseEnter ? 'h-2 -top-0.5' : 'h-1'} w-full bg-white/30 transition-[height] ease-in-out duration-300`}
        onClick={handleProgressClick}
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => { setMouseEnter(false); setTimestamp(''); setMouseX(0) }}
      >
        <div
          className={`z-10 absolute top-0 ${MouseEnter ? 'h-2 -top-0.5' : 'h-1'} bg-white/60 transition-[height] ease-in-out duration-300`}
          style={{
            width: `${mouseX}px`,
          }}
        ></div>
        <div
          className={`z-20 absolute top-0 ${MouseEnter ? 'h-2 -top-0.5' : 'h-1'} bg-red-500 transition-all ease-in-out duration-300`}
          style={{
            width: `${progress.toFixed()}%` 
          }}
        ></div>
      </div>
      <span
        style={{
          position: 'absolute',
          top: '-9rem',
          left: `${mouseX >= ((refDiv.current?.offsetWidth ?? 0) * 0.05) && mouseX <= ((refDiv.current?.offsetWidth ?? 0) * 0.80) ? `${mouseX}px` : mouseX <= ((refDiv.current?.offsetWidth ?? 0) * 0.80) && 'auto'}`,
          right: `${mouseX <= ((refDiv.current?.offsetWidth ?? 0) * 0.80) ? 'auto' : '25px'}`,
          color: 'white',
          fontFamily: 'sans-serif',
          fontSize: "14px",
          fontWeight: '700'
        }}
      >
        <div className={`flex flex-col justify-between items-center ${!MouseEnter && 'hidden'}`}>
          <Storyboards time={time} />
          {timestamp}
        </div>
      </span>
    </div>
  )
}

export default memo(ProgressBar)