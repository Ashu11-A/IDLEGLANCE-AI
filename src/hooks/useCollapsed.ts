import { create } from 'zustand'

interface UseCollapsedType {
    collapsed: boolean,
    toggleCollapsed: () => void
}

const getInitialCollapsed = () => {
    return localStorage?.getItem('sidebar-collapsed') === 'true' ? true : false
}

export const useCollapsed = create<UseCollapsedType>((set) => ({
    collapsed: getInitialCollapsed(),
    toggleCollapsed: () => {
        set((state: UseCollapsedType) => {
            localStorage.setItem('sidebar-collapsed', String(!state.collapsed))
            return ({ collapsed: !state.collapsed})
        })
    }
}))