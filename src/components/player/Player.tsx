'use client'

import { formatTime } from '@/functions/formatTime'
import { mdiFullscreen, mdiPause, mdiPlay } from '@mdi/js'
import Icon from '@mdi/react'
import { useVisibilityChange } from "@uidotdev/usehooks"
import { useCallback, useEffect, useRef, useState } from "react"
import { findDOMNode } from 'react-dom'
import { useInView } from "react-intersection-observer"
import ReactPlayer from "react-player"
import { useAudio, useKeyPress, useKeyPressEvent } from 'react-use'
import screenfull from 'screenfull'
import ProgressBar from './ProgressBar'

export default function Player({ urlVideo, urlAudio }: { urlVideo: string, urlAudio: string }) {
    const { ref: refView, inView } = useInView({ threshold: 1 })
    const playerRef = useRef<ReactPlayer>(null)
    const properties = useRef({
        progress: 0,
        duration: 0,
        volume: 0,
        muted: false,
        playing: false
    })
    const cataCollector = useRef({
        screenTime: 0,
        timePlaying: 0
    })

    const [audio, state, controls] = useAudio({ src: urlAudio })

    state.volume = 100
    state.paused = false
    const [playing, setPlaying] = useState(false)

    const [MouseEnter, setMouseEnter] = useState(false)

    // Data Collector
    const getScreenTime = useCallback(() => cataCollector.current.screenTime, [cataCollector])
    const setScreenTime = useCallback((time: number) => cataCollector.current.screenTime = time, [cataCollector])

    const getTimePlaying = useCallback(() => cataCollector.current.timePlaying, [cataCollector])
    const setTimePlaying = useCallback((time: number) => cataCollector.current.timePlaying = time, [cataCollector])

    const windowVisible = useVisibilityChange()

    // playerRef.current?.setState()
    const seekTo = useCallback((time: number) => playerRef.current?.seekTo(time, 'seconds'), [playerRef])

    // Volume
    const setVolume = useCallback((volume: number) => properties.current.volume = volume, [properties])
    const getVolume = useCallback((): number => properties.current.volume ?? 0, [properties])
    const muteToggle = useCallback(() => properties.current.muted = !properties.current.muted, [properties])

    // Time Player
    const getDuration = useCallback((): number => properties.current.duration, [properties])
    const setDuration = useCallback((duration: number): number => properties.current.duration = duration, [properties])
    const getCurrentTime = useCallback((): number => playerRef.current?.getCurrentTime() ?? 0, [playerRef])

    const play = useCallback(() => setPlaying((prev) => !prev), [])
    const onClickFullscreen = useCallback(() => screenfull.request(findDOMNode(playerRef?.current)), [])


    useKeyPressEvent(' ',/* <-- Key Space */ () => setPlaying((prev) => !prev))
    useKeyPressEvent('k', () => console.log(playerRef, state, audio))
    useKeyPressEvent('m', () => muteToggle())
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
                setTimePlaying(getTimePlaying() +1)
            }, 1000)

            return () => clearInterval(playingInterval)
        }
    }, [playing, inView, setTimePlaying, getTimePlaying])

    useEffect(() => {
        if (inView && windowVisible) {
            const screen = setInterval(() => {
                setScreenTime(getScreenTime() +1)
            }, 1000)

            return () => clearInterval(screen)
        }
    }, [getScreenTime, inView, setScreenTime, windowVisible])

    return (
        <div>
            {inView && <p>Player em Tela</p>}
            <p>Tempo de tela: {getScreenTime()}</p>
            <p>Tempo de assistido: {getTimePlaying()}</p>
            <p>{playing ? 'Reproduzindo Video' : 'Video pausado'}</p>
            {MouseEnter ? <p>Mouse em cima do player</p> : <p>Mouse fora do player</p>}
            <div
                ref={refView}
                className='flex w-[1280px] h-[720px] border-0 rounded-2xl relative overflow-hidden'
                onMouseEnter={() => setMouseEnter(true)}
                onMouseLeave={() => setMouseEnter(false)}
                tabIndex={0}
            >
                <ReactPlayer
                    url={urlVideo}
                    ref={playerRef}
                    playing={playing}
                    // light="https://i.ytimg.com/vi/GLR1nzQDero/maxresdefault.jpg"
                    style={{ zIndex: 0, position: 'absolute' }}
                    onPause={() => setPlaying(false)}
                    onPlay={() => setPlaying(true)}
                    width={1280}
                    height={720}
                    muted={properties.current.muted}
                    volume={properties.current.volume}
                    onProgress={(progressProps) => properties.current.progress = progressProps.playedSeconds}
                    onDuration={(duration) => setDuration(duration)}
                />
                {audio}
                <div
                    className={
                        `w-full absolute bottom-0 z-10 ${(MouseEnter && (playing === true)) ||
                            (playing === false) ? 'opacity-100' : 'opacity-0'} transition ease-in-out duration-250 delay-50`
                    }
                >
                    <ProgressBar currentTime={properties.current.progress} duration={getDuration()} seekTo={seekTo} />
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
                            <div className='flex items-center font-medium text-sm text-white'>{formatTime(properties.current.progress)} / {formatTime(playerRef.current?.getDuration() ?? 0)}</div>
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
            <button onClick={() => controls.play()}>Reproduzir Musica</button>
        </div>
    )
}