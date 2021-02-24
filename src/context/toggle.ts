import { createContext, useContext } from 'react'


export interface ToggleContextProps {
  show: boolean
  setShow: (show?: boolean) => void
}

export const ToggleContext = createContext<ToggleContextProps>({
  show: false,
  setShow: (): void => {},
})

export const useToggleContext = (): ToggleContextProps => useContext(ToggleContext)
