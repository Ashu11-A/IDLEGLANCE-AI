import Player from '@/components/player/Player';

export default async function Home() {
  const codeVideo = '_HbgYkWeZfQ'
  // console.log(await getVideo(codeVideo))

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


  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Player
        id={codeVideo}
      />
    </div>
  )
  // return (
  //   <div>
  //     <p>URL: {data?.url}</p>
  //     <ReactPlayer
  //       url={data ? data.url : undefined}
  //       controls
  //       loop
  //       // config={{
  //       //   playerVars: {
  //       //     controls: 1,
  //       //     frameborder: 0,
  //       //     cc_load_policy: 0, // legendas ativadas
  //       //     iv_load_policy: 0,
  //       //     loop: 1,
  //       //     modestbranding: 1, // Logo do Youtube
  //       //     rel: 0, // videos recomendados
  //       //     showinfo: 0 // Esconder nome do Video
  //       //   },
  //       //   embedOptions: {

  //       //   }
  //       // }}
  //     />
  //   </div>
  // );
}
