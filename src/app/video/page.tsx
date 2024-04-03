'use server'

import Player from "@/components/player/Player"
import axios from "axios"
import { MoreVideoDetails } from 'ytdl-core'
import { redirect } from 'next/navigation'
import { ThumbnailsData, YoutubeVideoFormat } from "../../../api/nest/dist/rest/videos/dto/youtube.types"

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
  if (id === undefined) redirect('/')

  const { title, description } = await axios.get(`http://localhost:3333/video/${id}`).then((res) => res.data as Video)
  // const stream: Stream[] = {}

  function adicionarLinks(texto: string) {
    const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return texto.replace(exp, `<a style="color: rgb(62, 166, 255)" href='$1'>$1</a>`);
  }
  function haveLink(text:string) {
    const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return exp.test(text)
  }

  const formatedDes = adicionarLinks(description)

  return (
    <div className='flex mx-10 mt-14 min-h-screen'>
      {/* <Player { ...stream[1] } /> */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-row">
          <p className="text-start font-sans text-2xl">{title}</p>
        </div>
        <div className="h-[1px] bg-zinc-800 w-full"></div>
        <div className="bg-zinc-800 rounded-2xl p-5 whitespace-pre-wra">
          {description.split('\n\n').map((text) => (
            <pre className="py-3" key={Math.random()} dangerouslySetInnerHTML={{ __html: adicionarLinks(text) }} />
          ))}
        </div>
      </div>
    </div>
  )
}