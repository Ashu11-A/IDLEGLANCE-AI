import Player from '@/components/player/Player';
import axios from 'axios';
import { MoreVideoDetails } from 'ytdl-core'
import { YoutubeVideoFormat } from '../../api/src/rest/videos/dto/youtube.types';

interface ApiResponse extends MoreVideoDetails {
  bestQualityAudio: YoutubeVideoFormat,
  bestQualityVideo: YoutubeVideoFormat,
  streamingData: YoutubeVideoFormat[]
}

export default async function Home() {
  const codeVideo = '_HbgYkWeZfQ'

  const video = await axios.post('http://localhost:3333/videos/info', {
    provider: "youtube",
    url: "https://www.youtube.com/watch?v=53SIcnlWiSU"
  }).then((res) => res.data as ApiResponse)

    // const { isFetching, error, data } = useQuery({
    //   queryKey: [`${codeVideo}`],
    //   queryFn: () => fetch('/youtube/api/json', {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         url: `https://www.youtube.com/watch?v=${codeVideo}`,
    //         vCodec: "vp9",
    //         vQuality: "max",
    //         filenamePattern: "nerdy",
    //         isAudioOnly: false
    //       }),
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json"
    //       }
    //     }).then((res) => res.json()).catch(() => undefined),
    //     refetchOnWindowFocus: false
    //   }
    // )

    // await getVideo(codeVideo)

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Player
        urlVideo={video.bestQualityVideo.url}
        urlAudio={video.bestQualityAudio.url}
      />
    </div>
  )
}
