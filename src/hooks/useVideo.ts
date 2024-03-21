import { ApiResponse } from '@/app/video/page'
import { create } from 'zustand'

interface UseVideoType {
    video?: ApiResponse
    setVideo: (video: ApiResponse) => void
}

export const useVideo = create<UseVideoType >((set) => ({
    video: undefined,
    setVideo: (video) => set((prev) => ({ ...prev, video }))
}))