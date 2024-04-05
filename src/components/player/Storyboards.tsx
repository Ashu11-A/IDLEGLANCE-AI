import { useStoryboards } from '@/hooks/useStoryboards';
import Image from 'next/image';


export function Storyboards({ time }: { time: number }) {
  const { findImage } = useStoryboards()
  const image = findImage(time)

  return (
    <div className='rounded-2xl overflow-hidden'>
      {image
        ? <Image alt={`StoryBoard ${image.name}. ID: ${image.time}`} src={image.image} width={200} height={113} />
        : <div className='w-[200px] h-[113px] bg-black'></div>}
      {}
    </div>
  )
}
