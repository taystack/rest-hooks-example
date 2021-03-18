import { createContext, useReducer } from 'react'
import { PokemonMoveIndexItem } from '../resources/pokemon'

const omitKey = (obj: MoveKeys, removeKey: string): MoveKeys => {
  let ret: MoveKeys = {}
  for (let key of Object.keys(obj)) {
    if (key !== removeKey) ret[key] = obj[key]
  }
  return ret
}


export interface MoveKeys {
  [movePk: string]: PokemonMoveIndexItem | undefined
}

interface MoveCompareStore {
  moves: MoveKeys
}

interface UseMoveCompareReducer extends MoveCompareStore {
  addMove: (move: PokemonMoveIndexItem) => void
}  

interface MoveCompareAction {
  type: string
  move: PokemonMoveIndexItem
}

const defaultState: MoveCompareStore = {
  moves: {}
}

const init = (state: Partial<MoveCompareStore>): MoveCompareStore => ({
  ...defaultState,
  ...state,
})

const moveReducer = (store: MoveCompareStore = defaultState, action: MoveCompareAction): MoveCompareStore => {
  const { name } = action.move.move
  if (store.moves[name]) {
    return {
      moves: { ...omitKey(store.moves, name) }
    }
  }
  return {
    moves: {
      ...store.moves,
      [name]: action.move
    }
  }
}

export const useMoveCompareReducer = (): UseMoveCompareReducer => {
  const [store, dispatch] = useReducer(moveReducer, {}, init)
  const addMove = (move: PokemonMoveIndexItem) => {
    dispatch({ type: 'TOGGLE_MOVE', move: move })
  }
  return {
    ...store,
    addMove,
  }
}

export const MoveCompareContext = createContext<UseMoveCompareReducer>({
  moves: {},
  addMove: (move: PokemonMoveIndexItem) => {}
})
