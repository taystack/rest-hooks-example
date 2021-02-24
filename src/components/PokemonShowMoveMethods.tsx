import React, { useContext, useState } from 'react'
import { PokemonMoveIndexItem } from '../resources/pokemon'
import TicTac from './TicTac'
import {
  useSortedMoves,
  useLatestVersionGroup,
} from '../hooks'
import { MoveCompareContext } from '../reducers/useMoveCompareReducer'


export const PokemonMoveIndexItemShow: React.FC<{
  move: PokemonMoveIndexItem
  children: React.ReactNode
}> = ({ move, children }): React.ReactElement => {
  const { name } = move.move
  const { addMove } = useContext(MoveCompareContext)
  const handleClick = () => { addMove(move) }
  return (
    <TicTac>
      <div
        onClick={handleClick}
        style= {{ flexBasis: 200, flexGrow: 0, flexShrink: 0 }}
      >
        <b>{name}</b>
      </div >
      {children}
    </TicTac>
  )
}

export function PokemonMoveIndexNaturalMove({ move }: { move: PokemonMoveIndexItem }) {
  const latestVersion = useLatestVersionGroup(move.version_group_details)
  return (
    <>
    <PokemonMoveIndexItemShow move={move}>lvl. {latestVersion.level_learned_at}</PokemonMoveIndexItemShow>
    </>
  )
}

export function PokemonMoveIndexMachineMove({ move }: { move: PokemonMoveIndexItem }) {
  const latestVersion = useLatestVersionGroup(move.version_group_details)
  return (<PokemonMoveIndexItemShow move={move}>{latestVersion.version_group.name}</PokemonMoveIndexItemShow>)
}

export function PokemonMoveIndexEggMove({ move }: { move: PokemonMoveIndexItem }) {
  const latestVersion = useLatestVersionGroup(move.version_group_details)
  return (<PokemonMoveIndexItemShow move={move}>{latestVersion.version_group.name}</PokemonMoveIndexItemShow>)
}

export function PokemonMoveIndexTutorMove({ move }: { move: PokemonMoveIndexItem }) {
  const latestVersion = useLatestVersionGroup(move.version_group_details)
  return (<PokemonMoveIndexItemShow move={move}>{latestVersion.version_group.name}</PokemonMoveIndexItemShow>)
}

export const PokemonShowMoves: React.FC<{
  moves: PokemonMoveIndexItem[]
  method: string
  renderItem?: (move: PokemonMoveIndexItem) => React.ReactNode
}> = ({ moves, method, renderItem = (move) => <>un implemented</> }) => {
  const [showMoves, setShowMoves] = useState<boolean>(false)
  return (
    <div>
      <div onClick={(): void => setShowMoves(old => !old)}>
        <b>{method} ({moves.length})</b></div >
        {showMoves && moves.map(renderItem)}
    </div>
  )
}

export default function PokemonShowMoveMethods({ moves }: { moves: PokemonMoveIndexItem[] }) {
  const [egg, machine, tutor, natural] = useSortedMoves(moves)
  return (
    <div>
      {natural.length > 0 && <PokemonShowMoves moves={natural} method={'Natural'} renderItem={(move) => <PokemonMoveIndexNaturalMove key={move.move.name} move={move} />} />}
      {egg.length > 0 && <PokemonShowMoves moves={egg} method={'Egg'} renderItem={(move) => <PokemonMoveIndexEggMove key={move.move.name} move={move} />} />}
      {machine.length > 0 && <PokemonShowMoves moves={machine} method={'Machine'} renderItem={(move) => <PokemonMoveIndexMachineMove key={move.move.name} move={move} />} />}
      {tutor.length && <PokemonShowMoves moves={tutor} method={'Tutor'} renderItem={(move) => <PokemonMoveIndexTutorMove key={move.move.name} move={move} />} />}
    </div>
  )
}