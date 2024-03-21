'use server'

import Player from "@/components/player/Player"
import axios from "axios"
import { ThumbnailsData, YoutubeVideoFormat } from "../../../api/dist/rest/videos/dto/youtube.types"
import { MoreVideoDetails } from 'ytdl-core'
import { redirect } from 'next/navigation'

interface VideoPageType {
    searchParams: {
        id?: string
    }
}

interface ApiResponse extends MoreVideoDetails {
    bestThumbnail: ThumbnailsData
    bestQualityAudio: YoutubeVideoFormat,
    bestQualityVideo: YoutubeVideoFormat,
    streamingData: YoutubeVideoFormat[]
  }


export default async function VideoPage({ searchParams: { id } }: VideoPageType) {
    if (id === undefined) redirect('/')

    const video = await axios.post('http://localhost:3333/videos/info', {
        provider: "youtube",
        url: `https://www.youtube.com/watch?v=${id}`
      }).then((res) => res.data as ApiResponse)

    return (
        <div className='flex mx-10 mt-14 min-h-screen'>
            <Player
                video={video.bestQualityVideo.url}
                audio={video.bestQualityAudio.url}
                thumbnail={video.bestThumbnail.url}
            />
      </div>
    )
}