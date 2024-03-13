'use client';
import { useFetch } from '@/hooks/useFetch';
import ReactPlayer from 'react-player';

export default function Home() {
  const { data } = useFetch<{ url: string } | null>('https://api.seventyhost.net/api/json', {
    url: "https://www.youtube.com/watch?v=Nz2XAmDKpSo",
    // vCodec: "av1",
    vQuality: "max",
    filenamePattern: "nerdy",
    isAudioOnly: false
    });
  return (
    <div>
      <p>URL: {data?.url}</p>
      <ReactPlayer
        url={data?.url ?? undefined}
        playing={true}
      />
    </div>
  );
}
