'use server'
import { Payload, create } from "youtube-dl-exec";
import logger from 'progress-estimator'

export async function getVideo(id: string): Promise<Payload | undefined> {
    const youtubeDl = create('./yt-dlp')
    const url = `https://www.youtube.com/watch?v=${id}`
    const promise = youtubeDl(url, { dumpSingleJson: true })
    const result = await (logger())(promise, `Obtaining ${url}`)
    
    console.log(result)
}