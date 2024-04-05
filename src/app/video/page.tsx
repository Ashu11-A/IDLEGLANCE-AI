'use server'

import WatchMetadata from "@/components/player/WatchMetadata"
import { redirect } from 'next/navigation'
import { YoutubeVideoFormat } from "../../../api/nest/dist/rest/videos/dto/youtube.types"
import Player from "@/components/player/Player"
import { headers } from 'next/headers'
import axios from "axios"

interface VideoPageType {
    searchParams: {
        id?: string
    }
}

export interface Stream extends YoutubeVideoFormat {

}
export interface Video {
  id: number;
  uuid: string;
  youtubeId: string;
  title: string;
  description: string;
  lengthSeconds: number;
  isFamilySafe: boolean;
  category: string;
  publishDate: Date;
  createDate: Date;
  thumbnail: string | null;
  maxQuality: string | null;
  subtitle: string | null;
  subtitleSource: string | null;
  musicAuthor: string | null;
  musicStyle: string | null;
  videoEditor: string | null;
  editStyle: string | null;
  isAnime: boolean | null;
  similarThumbnailId: number | null;
}

export default async function VideoPage({ searchParams: { id } }: VideoPageType) {
  // const header = headers()
  // const ip = (header.get('X-Forwarded-For') ?? '127.0.0.1').split(',')[0]
  if (id === undefined) redirect('/')
  return (
    <div className='flex mx-10 mt-14 min-h-screen'>
      <Player id={id} />
      <WatchMetadata id={id} />
    </div>
  )
}