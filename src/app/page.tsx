

export default async function Home() {
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
      <p>Hello Everyone</p>
    </div>
  )
}
