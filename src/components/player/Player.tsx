'use client'

import { formatTime } from '@/functions/formatTime'
import { mdiFullscreen, mdiPause, mdiPlay } from '@mdi/js'
import Icon from '@mdi/react'
import { useEffect, useRef, useState } from "react"
import { findDOMNode } from 'react-dom'
import { useInView } from "react-intersection-observer"
import ReactPlayer from "react-player"
import { useKeyPress } from 'react-use'
import screenfull from 'screenfull'
import { Card } from "../ui/card"
import ProgressBar from './ProgressBar'

export default function Player({ id }: { id: string }) {
    const { ref, inView } = useInView({ threshold: 1 })
    const playerRef = useRef<ReactPlayer>(null)

    const [playing, setPlaying] = useState(false)
    const [duration, setDuration] = useState(0)

    const [progress, setProgress] = useState<number>(0)
    const [editProgress, setEditProgress] = useState(0)
    const [MouseEnter, setMouseEnter] = useState(false)

    const ArrowUpPress = useKeyPress('ArrowUp')
    const ArrowDownPress = useKeyPress('ArrowDown')
    const ArrowLeftPress = useKeyPress('ArrowLeft')
    const ArrowRightPress = useKeyPress('ArrowRight')
    const SpacePress = useKeyPress('Espace')

    useEffect(() => {
        playerRef.current?.seekTo(editProgress, 'seconds') // Edit Time
    }, [editProgress])
    useEffect(() => {
        const InternalPlayer = playerRef.current?.getInternalPlayer()
        const currentVolume = InternalPlayer?.getVolume()
        const currentTime = playerRef.current?.getCurrentTime() ?? 0

        if (ArrowLeftPress[0]){
            playerRef.current?.seekTo(currentTime - 5, 'seconds')
            console.log(`Press: ArrowLeft (<--), Before: ${currentTime.toFixed(2)}, After: ${(currentTime - 5).toFixed(2)}`)
        }

        if (ArrowRightPress[0]) {
            playerRef.current?.seekTo(currentTime  + 5, 'seconds')
            console.log(`Press: ArrowRight (-->), Before: ${currentTime.toFixed(2)}, After: ${(currentTime + 5).toFixed(2)}`)
        }

        if (ArrowUpPress[0]) {
            InternalPlayer?.setVolume((currentVolume + 5) < 100 ? currentVolume + 5 : 100)
            console.log(`Press: ArrowUp (^), Before: ${currentVolume}, After: ${(currentVolume + 5)}`)
        }
        if (ArrowDownPress[0]) {
            InternalPlayer?.setVolume(currentVolume > 0 && currentVolume - 5)
            console.log(`Press: ArrowDown (Down), Before: ${currentVolume}, After: ${(currentVolume - 5)}`)
        }
        if (SpacePress[0]) setPlaying((prev) => !prev)

    }, [ArrowLeftPress, ArrowRightPress, ArrowUpPress, ArrowDownPress, SpacePress])

    const play = () => setPlaying((prev) => !prev)
    const onClickFullscreen = () => {
        screenfull.request(findDOMNode(playerRef.current))
    }

    return (
        <div>
            {inView && <p>Player em Tela</p>}
            <p>{playing ? 'Reproduzindo Video' : 'Video pausado'}</p>
            {MouseEnter ? <p>Mouse em cima do player</p> : <p>Mouse fora do player</p>}
            <Card
                ref={ref}
                className='flex w-[1280px] h-[720px] border-0 rounded-2xl relative overflow-hidden'
                onMouseEnter={() => setMouseEnter(true)}
                onMouseLeave={() => setMouseEnter(false)}
                tabIndex={0}
            >
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${id}`}
                    ref={playerRef}
                    playing={playing}
                    light="https://i.ytimg.com/vi/GLR1nzQDero/maxresdefault.jpg"
                    style={{ zIndex: 0, position: 'absolute' }}
                    onPause={() => setPlaying(false)}
                    onPlay={() => setPlaying(true)}
                    width={1280}
                    height={720}
                    config={{
                        youtube: {
                            playerVars: { controls: 0, modestbranding: 1, showinfo: 0, rel: 0 },
                        },
                    }}
                    onDuration={(duration) => setDuration(duration)}
                    onProgress={(progressProps) => setProgress(progressProps.playedSeconds)}
                />
                <div
                    className={
                        `w-full absolute bottom-0 z-10 ${(MouseEnter && (playing === true)) ||
                            (playing === false) ? 'opacity-100' : 'opacity-0'} transition ease-in-out duration-250 delay-50`
                    }
                >
                    <ProgressBar current={progress} total={duration} setTime={setEditProgress} />
                    <div className='w-full h-10 gap flex flex-row items-center justify-between'>
                        <div className='flex flex-row'>
                            <button
                                className='mx-5'
                                onClick={play}
                            >
                                {playing
                                    ? <Icon color={'white'} path={mdiPause} size={'2rem'} />
                                    : <Icon color={'white'} path={mdiPlay} size={'2rem'} />}
                            </button>
                            <div className='flex items-center font-medium text-sm text-white'>{formatTime(progress)} / {formatTime(duration)}</div>
                        </div>
                        <button
                            onClick={onClickFullscreen}
                            className='flex mx-5 items-center justify-end'
                        >
                            <Icon color={'white'} path={mdiFullscreen} size={'2rem'} />
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    )
}