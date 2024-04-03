'use client'
import { create } from 'zustand'

interface UseCollapsedType {
    collapsed: boolean,
    toggleCollapsed: () => void
}

const getInitialCollapsed = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem('sidebar-collapsed') === 'true' ? true : false
  }
  return false
}

export const useCollapsed = create<UseCollapsedType>((set) => ({
  collapsed: getInitialCollapsed(),
  toggleCollapsed: () => set((state: UseCollapsedType) => {
    localStorage.setItem('sidebar-collapsed', String(!state.collapsed))
    return ({ collapsed: !state.collapsed})
  })
}))