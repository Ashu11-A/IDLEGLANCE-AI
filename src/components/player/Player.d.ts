export interface StoryboardsImages {
    name: string
    image: string
    time: number
}

export interface PlayerRef {
    url?: string
    width?: number
    height?: number
    progress: number
    duration: number
    volume: number
    muted: boolean
    pip: boolean
}