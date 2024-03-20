import { create } from 'zustand'

interface UseCollapsedType {
    collapsed: boolean,
    toggleCollapsed: () => void
}


export const useCollapsed = create<UseCollapsedType>((set) => ({
    collapsed: true,
    toggleCollapsed: () => set((state: UseCollapsedType) => ({ collapsed: !state.collapsed}))
}))