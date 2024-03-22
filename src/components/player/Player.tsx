'use client'

import { formatTime } from '@/functions/formatTime'
import { mdiCardMultipleOutline, mdiCardOffOutline, mdiFullscreen, mdiPause, mdiPlay, mdiVolumeHigh, mdiVolumeLow, mdiVolumeMedium, mdiVolumeVariantOff } from '@mdi/js'
import Icon from '@mdi/react'
import { useVisibilityChange } from "@uidotdev/usehooks"
import { useCallback, useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import ReactPlayer from "react-player"
import { useAudio, useKeyPress, useKeyPressEvent, useWindowSize } from 'react-use'
import screenfull from 'screenfull'
import ProgressBar from './ProgressBar'
import { useVideo } from '@/hooks/useVideo'
import { ApiResponse } from '@/app/video/page'
import { useStoryboards } from '@/hooks/useStoryboards'
import { Cinematics } from './Cinematics'

export default function Player(props: ApiResponse ){
    const { bestQualityVideo: video, bestQualityAudio: audioAPI } = props
    const { ref: refView, inView } = useInView({ threshold: 1 })
    const { setVideo } = useVideo()
    const { setStoryboards } = useStoryboards()
    const playerRef = useRef<ReactPlayer>(null)
    const properties = useRef({
        progress: 0,
        duration: 0,
        volume: 1,
        muted: false,
        playing: false,
        pip: false
    })
    const cataCollector = useRef({
        screenTime: 0,
        timePlaying: 0
    })

    const [audio, state, controls] = useAudio({ src: audioAPI.url })

    const [MouseEnter, setMouseEnter] = useState(false)

    // Data Collector
    const getScreenTime = useCallback(() => cataCollector.current.screenTime, [cataCollector])
    const setScreenTime = useCallback((time: number) => cataCollector.current.screenTime = time, [cataCollector])

    const getTimePlaying = useCallback(() => cataCollector.current.timePlaying, [cataCollector])
    const setTimePlaying = useCallback((time: number) => cataCollector.current.timePlaying = time, [cataCollector])

    const windowVisible = useVisibilityChange()

    const pipToggle = useCallback(() => properties.current.pip = !properties.current.pip, [properties])

    // Volume
    const setVolume = useCallback((volume: number) => {
        console.log('rodou')
        properties.current.volume = volume
        controls.volume(volume)
    }, [controls, properties])
    const getVolume = useCallback((): number => properties.current.volume ?? 0, [properties])
    const muteToggle = useCallback(() => {
        properties.current.muted = !properties.current.muted
        if (properties.current.muted) {
            controls.mute()
        } else {
            controls.unmute()
        }
    }, [controls, properties])

    // Time Player
    const getDuration = useCallback((): number => properties.current.duration, [properties])
    const setDuration = useCallback((duration: number): number => properties.current.duration = duration, [properties])
    const getCurrentTime = useCallback((): number => playerRef.current?.getCurrentTime() ?? 0, [playerRef])

    const play = useCallback((action?: boolean) => {
        properties.current.playing = action ?? !properties.current.playing
        if (action || properties.current.playing) {
            controls.play()
        } else {
            controls.pause()
        }
    }, [controls, properties])
    const seekTo = useCallback((time: number) => {
        playerRef.current?.seekTo(time, 'seconds')
        controls.seek(time)
    }, [playerRef, controls])

    const onClickFullscreen = useCallback(() => screenfull.request(document.querySelector('.react-player')), [])


    useKeyPressEvent(' ',/* <-- Key Space */ () => play())
    useKeyPressEvent('k', () => console.log(playerRef, state, audio, getCurrentTime()))
    useKeyPressEvent('m', () => muteToggle())
    // Esses botões podem ser spamados por isso tem que ser useKeyPress
    const ArrowUpPress = useKeyPress('ArrowUp')
    const ArrowDownPress = useKeyPress('ArrowDown')
    const ArrowLeftPress = useKeyPress('ArrowLeft')
    const ArrowRightPress = useKeyPress('ArrowRight')

    useEffect(() => {
        const actualVolume = getVolume()

        if (ArrowUpPress[0] && (actualVolume + 5) < 100) setVolume(Math.min(1, actualVolume + 0.05))
        if (ArrowDownPress[0] && actualVolume > 0) setVolume(Math.max(0, actualVolume - 0.05))
        if (ArrowLeftPress[0]) seekTo(getCurrentTime() - 5)
        if (ArrowRightPress[0]) seekTo(getCurrentTime()  + 5)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ArrowUpPress, ArrowDownPress, ArrowLeftPress, ArrowRightPress])

    useEffect(() => {
        if (properties.current.playing) {
            console.log('Colleting TimePlaying')
            const playingInterval = setInterval(() => {
                setTimePlaying(getTimePlaying() +1)
            }, 1000)

            return () => clearInterval(playingInterval)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [properties.current.playing, inView])

    useEffect(() => {
        if (inView && windowVisible) {
            console.log('Colleting ScreenTime')
            const screen = setInterval(() => {
                setScreenTime(getScreenTime() +1)
            }, 1000)

            return () => clearInterval(screen)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, windowVisible])

    useEffect(() => {
        setVideo(props)
        setStoryboards(props)
    }, [props, setStoryboards, setVideo])

    return (
        <div>
            <Cinematics time={properties.current.progress} />
            <div
                ref={refView}
                className='flex w-[1280px] h-[720px] border-0 rounded-2xl relative overflow-hidden z-0'
                onMouseEnter={() => setMouseEnter(true)}
                onMouseLeave={() => setMouseEnter(false)}
                tabIndex={0}
            >
                <ReactPlayer
                    ref={playerRef}

                    url={video.url}
                    className='react-player'
                    playing={properties.current.playing}
                    muted={properties.current.muted}
                    volume={properties.current.volume}
                    onPlay={() => play(true)}
                    onPause={() => play(false)}
                    pip={properties.current.pip}
                    onDisablePIP={() => properties.current.pip = false}
                    width={1280}
                    height={720}
                    style={{ zIndex: 0, position: 'absolute' }}
                    onBuffer={() => {console.log('Buffering...'); controls.pause()}}
                    onStart={() => console.log('Starting...')}
                    onReady={() => {
                        console.log('Ready...')
                        if (properties.current.playing) controls.play()
                    }}
                    onSeek={() => console.log('Seeking...')}
                    onProgress={(progressProps) => properties.current.progress = progressProps.playedSeconds}
                    onDuration={(duration) => setDuration(duration)}
                />
                {audio}
                <div className='grid grid-rows-2 grid-cols-1 h-full w-full'>
                    <div onClick={() => play()} className='z-10 row-span-2 w-full h-full'></div>
                    <div
                        className={
                            `w-full relative row-span-1 ${(MouseEnter && (properties.current.playing === true)) ||
                                (properties.current.playing === false) ? 'opacity-100' : 'opacity-0'} transition ease-in-out duration-250 delay-50`
                        }
                    >
                        <ProgressBar currentTime={properties.current.progress} duration={getDuration()} seekTo={seekTo} />
                        <div className='w-full h-10 gap flex flex-row items-center justify-between'>
                            <div className='flex flex-row'>
                                <button
                                    className='mx-5'
                                    onClick={() => play()}
                                >
                                    {properties.current.playing
                                        ? <Icon color={'white'} path={mdiPause} size={'2rem'} />
                                        : <Icon color={'white'} path={mdiPlay} size={'2rem'} />}
                                </button>
                                <div className='flex items-center font-medium text-sm text-white'>{formatTime(properties.current.progress)} / {formatTime(playerRef.current?.getDuration() ?? 0)}</div>
                                <button
                                    className='mx-5'
                                    onClick={muteToggle}
                                >
                                    {properties.current.muted
                                        ? <Icon color={'white'} path={mdiVolumeVariantOff} size={'2rem'} />
                                        : <Icon color={'white'} path={
                                            properties.current.volume >=0.51
                                                ? mdiVolumeHigh
                                                : properties.current.volume >=0.25
                                                    ? mdiVolumeMedium
                                                    : mdiVolumeLow
                                        } size={'2rem'} />}
                                </button>
                            </div>
                            <div className='flex gap-5 justify-end'>
                                <button
                                    onClick={pipToggle}
                                    className='flex items-center'
                                >
                                    {properties.current.pip
                                      ? <Icon color={'white'} path={mdiCardOffOutline} size={'1.5rem'}/>
                                      : <Icon color={'white'} path={mdiCardMultipleOutline} size={'1.5rem'}/>
                                    }
                                </button>
                                <button
                                    onClick={onClickFullscreen}
                                    className='flex mr-5 items-center'
                                >
                                    <Icon color={'white'} path={mdiFullscreen} size={'2rem'} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {inView && <p>Player em Tela</p>}
            <p>Tempo na tela: {getScreenTime()}</p>
            <p>Tempo assistindo: {getTimePlaying()}</p>
            <p>{properties.current.playing ? 'Reproduzindo Video' : 'Video pausado'}</p>
            <p>Volume Player: {properties.current.volume}</p>
            <p>Volume Audio: {state.volume}</p>
            {MouseEnter ? <p>Mouse em cima do player</p> : <p>Mouse fora do player</p>}
        </div>
    )
}