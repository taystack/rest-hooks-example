import { useContext, useMemo } from 'react'
import { MoveKeys, MoveCompareContext } from '../reducers/useMoveCompareReducer'


const useMoveKeys = (moveState: MoveKeys): string[] => useMemo(() => (
  Object.keys(moveState)
), [moveState])

export default function PokemonMoveCompareView() {
  const { moves: moveState } = useContext(MoveCompareContext)
  const moves = useMoveKeys(moveState)
  return (
    <div>
      {JSON.stringify(moves)}
    </div>
  )
}