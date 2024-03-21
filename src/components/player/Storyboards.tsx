import { useEffect, useState } from 'react';
import { GenImagem, Images } from './GenImages';
import Image from 'next/image';
import { useVideo } from '@/hooks/useVideo';

interface ImagesConverted {
    name: string
    image: string
    time: number
}


export function Storyboards({ time }: { time: number }) {
    const [storyBoard, setStoryBoard] = useState<ImagesConverted[]>([])
    const { video } = useVideo()

    const findImage = ({ images, timestamp }:  { images: ImagesConverted[], timestamp: number }) => {
        return images.find(item => item.time === timestamp)
    }

    useEffect(() => {
        if (video === undefined) return
        GenImagem({ ...video?.storyboards[0] }).then((images) => {
            console.log(images)
            const imagesConverted: ImagesConverted[] = []
            for (const { image, name, time } of images) {
                const imageBuffer = new Uint8Array(image.data)
                const blob = new Blob([imageBuffer], { type: 'image/webp' })
                const imageURL = URL.createObjectURL(blob)
                console.log(imageURL)
                imagesConverted.push({ image: imageURL, name, time })
            }
            setStoryBoard(imagesConverted)
        })
    }, [video])
    const image = findImage({ images: storyBoard, timestamp: Math.ceil(time / 2) * 2 /* Retornar o valor divicivel por 2 mais proximo, tipo 3.12 retorna 4 */ })
    return (
        <div className='rounded-2xl overflow-hidden'>
            {image ? <Image alt={`StoryBoard ${image.name}. ID: ${image.time}`} src={image.image} width={200} height={113} /> : <div className='w-[200px] h-[113px] bg-black'></div>}
        </div>
    )
}
