import { ApiResponse } from '@/app/video/page'
import { GenImagem } from '@/components/player/GenImages'
import { StoryboardsImages } from '@/components/player/Player.d'
import { create } from 'zustand'

interface UseStoryboardsType {
    storyboards: StoryboardsImages[] | [],
    setStoryboards: (video: ApiResponse) => Promise<StoryboardsImages[]>
    findImage: (time: number) => StoryboardsImages | undefined
}

const getStoryboards = async (video: ApiResponse) => {
    const images = await GenImagem({ ...video?.storyboards[0] })
    console.log(images)
    const StoryboardsImages: StoryboardsImages[] = []
    for (const { image, name, time } of images) {
        const imageBuffer = new Uint8Array(image.data)
        const blob = new Blob([imageBuffer], { type: 'image/webp' })
        const imageURL = URL.createObjectURL(blob)
        console.log(imageURL)
        StoryboardsImages.push({ image: imageURL, name, time })
    }
    return StoryboardsImages
}

const findImage = ({ images, timestamp }:  { images: StoryboardsImages[], timestamp: number }) => {
    return images.find(item => item.time === timestamp)
}

export const useStoryboards = create<UseStoryboardsType>((set, get) => ({
    storyboards: [],
    setStoryboards: async (video) => {
        const storyboards = await getStoryboards(video)
        set(() => ({ storyboards: storyboards }))
        return storyboards
    },
    findImage: (time) => {
        const { storyboards } = get()
        const timestamp = Math.ceil(time / 2) * 2 /* Retornar o valor divicivel por 2 mais proximo, tipo 3.12 retorna 4 */

        return findImage({ images: storyboards, timestamp })
    }
}))