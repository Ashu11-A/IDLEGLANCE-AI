'use client'

import { formatTime } from '@/functions/formatTime'
import { mdiFullscreen, mdiPause, mdiPlay } from '@mdi/js'
import Icon from '@mdi/react'
import { useVisibilityChange } from "@uidotdev/usehooks"
import { useCallback, useEffect, useRef, useState } from "react"
import { findDOMNode } from 'react-dom'
import { useInView } from "react-intersection-observer"
import ReactPlayer from "react-player"
import { useKeyPress, useKeyPressEvent } from 'react-use'
import screenfull from 'screenfull'
import { InternalPlayerType } from "./Player.d.js"
import ProgressBar from './ProgressBar'

export default function Player({ id }: { id: string }) {
    const { ref, inView } = useInView({ threshold: 1 })
    const playerRef = useRef<ReactPlayer>(null)


    const [playing, setPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)

    const [MouseEnter, setMouseEnter] = useState(false)

    // Data Collector
    const [screenTime, setScreenTime] = useState(0)
    const [timePlaying, setTimePlaying] = useState(0)
    const windowVisible = useVisibilityChange()

    const internalPlayer = useCallback(() => {
        return playerRef.current?.getInternalPlayer() as InternalPlayerType | null
    }, [playerRef])
    const seekTo = useCallback((time: number) => playerRef.current?.seekTo(time, 'seconds'), [playerRef])
    const setVolume = useCallback((volume: number) => internalPlayer()?.setVolume(volume), [internalPlayer])
    const getVolume = useCallback((): number => internalPlayer()?.getVolume() ?? 0, [internalPlayer])
    const getCurrentTime = useCallback((): number => playerRef.current?.getCurrentTime() ?? 0, [playerRef])

    const play = useCallback(() => setPlaying((prev) => !prev), [])
    const onClickFullscreen = useCallback(() => screenfull.request(findDOMNode(playerRef?.current)), [])


    useKeyPressEvent(' ',/* <-- Key Space */ () => setPlaying((prev) => !prev))
    useKeyPressEvent('k', () => console.log(internalPlayer()))
    useKeyPressEvent('m', () => {
        const isMuted = internalPlayer()?.isMuted()
        console.log(`Press: M, Muted: ${!isMuted}`)
        if (isMuted) {
            internalPlayer()?.unMute()
        } else {
            internalPlayer()?.mute()
        }
    })
    // Esses botões podem ser spamados por isso tem que ser useKeyPress
    const ArrowUpPress = useKeyPress('ArrowUp')
    const ArrowDownPress = useKeyPress('ArrowDown')
    const ArrowLeftPress = useKeyPress('ArrowLeft')
    const ArrowRightPress = useKeyPress('ArrowRight')

    useEffect(() => {
        const actualVolume = getVolume()

        if (ArrowUpPress[0] && (actualVolume + 5) < 100) setVolume(actualVolume + 5)
        if (ArrowDownPress[0] && actualVolume > 0) setVolume(actualVolume - 5)
        if (ArrowLeftPress[0]) seekTo(getCurrentTime() - 5)
        if (ArrowRightPress[0]) seekTo(getCurrentTime()  + 5)
    }, [ArrowUpPress, ArrowDownPress, ArrowLeftPress, ArrowRightPress, seekTo, setVolume, getVolume, getCurrentTime])

    useEffect(() => {
        if (playing) {
            const playingInterval = setInterval(() => {
                setTimePlaying((prev) => prev+1)
            }, 1000)

            return () => clearInterval(playingInterval)
        }
    }, [playing, inView])

    useEffect(() => {
        if (inView && windowVisible) {
            const screen = setInterval(() => {
                setScreenTime((prev) => prev+1)
            }, 1000)

            return () => clearInterval(screen)
        }
    }, [inView, windowVisible])

    return (
        <div>
            {inView && <p>Player em Tela</p>}
            <p>Tempo de tela: {screenTime}</p>
            <p>Tempo de assistido: {timePlaying}</p>
            <p>{playing ? 'Reproduzindo Video' : 'Video pausado'}</p>
            {MouseEnter ? <p>Mouse em cima do player</p> : <p>Mouse fora do player</p>}
            <div
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
                    // light="https://i.ytimg.com/vi/GLR1nzQDero/maxresdefault.jpg"
                    style={{ zIndex: 0, position: 'absolute' }}
                    onPause={() => setPlaying(false)}
                    onPlay={() => setPlaying(true)}
                    width={1280}
                    height={720}
                    controls
                    config={{
                        youtube: {
                            playerVars: { controls: 0, modestbranding: 1, showinfo: 0, rel: 0 },
                        },
                    }}
                    onProgress={(progressProps) => setProgress(progressProps.playedSeconds)}
                    onDuration={(duration) => setDuration((prev) => (duration !== prev) ? duration : prev)}
                />
                <div
                    className={
                        `w-full absolute bottom-0 z-10 ${(MouseEnter && (playing === true)) ||
                            (playing === false) ? 'opacity-100' : 'opacity-0'} transition ease-in-out duration-250 delay-50`
                    }
                >
                    <ProgressBar currentTime={progress} duration={duration} seekTo={seekTo} />
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
                            <div className='flex items-center font-medium text-sm text-white'>{formatTime(progress)} / {formatTime(playerRef.current?.getDuration() ?? 0)}</div>
                        </div>
                        <button
                            onClick={onClickFullscreen}
                            className='flex mx-5 items-center justify-end'
                        >
                            <Icon color={'white'} path={mdiFullscreen} size={'2rem'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}