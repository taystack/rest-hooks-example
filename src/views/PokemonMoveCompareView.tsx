import { Suspense, useContext, useMemo } from 'react'
import { useCache, useResource } from 'rest-hooks'
import { MoveKeys, MoveCompareContext } from '../reducers/useMoveCompareReducer'
import { ToastBody, ToastHeader, Spinner } from 'reactstrap';
import { MoveDetail } from '../resources/moves';


function MoveToastBody({
  moveName
}: {
  moveName: string
}) {
  const move = useResource(MoveDetail, { moveId: moveName })
  return (
    <ToastBody>
      {move.flavorTextEntry().flavor_text}
    </ToastBody>
  )
}

function MoveToast({
  moveName
}: {
  moveName: string
}) {
  const move = useCache(MoveDetail, { moveId: moveName })
  const iconColor = move?.typeName() || 'faded'
  return (
    <div style={{ position: 'relative', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: 5, boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.1)', marginBottom: 10 }}>
      <ToastHeader icon={iconColor}>
        {moveName}
      </ToastHeader>
      <Suspense fallback={<Spinner />}>
        <MoveToastBody moveName={moveName} />
      </Suspense>
    </div>
  )
}

const useMoveKeys = (moveState: MoveKeys): string[] => useMemo(() => (
  Object.keys(moveState)
), [moveState])

export default function PokemonMoveCompareView() {
  const { moves: moveState } = useContext(MoveCompareContext)
  const moves = useMoveKeys(moveState)
  return (
    <div style={{ position: 'absolute', top: 20, right: 20, width: 260 }}>
      {moves.map(move => (
        <MoveToast key={move} moveName={move} />
      ))}
    </div>
  )
}