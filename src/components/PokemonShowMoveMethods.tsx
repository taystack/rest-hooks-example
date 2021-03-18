import React, { useContext, useState } from 'react'
import { PokemonMoveIndexItem } from '../resources/pokemon'
import TicTac from './TicTac'
import { Table } from 'reactstrap'
import {
  useSortedMoves,
  useLatestVersionGroup,
} from '../hooks'
import { MoveCompareContext } from '../reducers/useMoveCompareReducer'
import { moveSyntheticComments } from 'typescript'


export function PokemonMoveIndexNaturalMove({ move }: { move: PokemonMoveIndexItem }) {
  const latestVersion = useLatestVersionGroup(move.version_group_details)
  return (
    <tr key={move.move.name}>
      <td scope={'row'}>{move.move.name}</td>
      <td>{latestVersion.level_learned_at}</td>
    </tr>
  )
}

export function PokemonMoveIndexMove({ move }: { move: PokemonMoveIndexItem }) {
  const latestVersion = useLatestVersionGroup(move.version_group_details)
  return (
    <tr key={move.move.name}>
      <td colSpan={1} scope={'row'}>{move.move.name}</td>
      <td colSpan={1}>{latestVersion.version_group.name}</td>
    </tr>
  )
}

function PokemonShowMoves({
  name,
  moves,
}: {
  name: string
  moves: PokemonMoveIndexItem[]
}) {
  const [showMoves, setShowMoves] = useState<boolean>(true)
  return (
    <Table striped>
      <thead>
        <tr onClick={() => setShowMoves(old => !old)}>
          <th colSpan={1}>{name} moves</th>
          <th colSpan={1}>Since version</th>
        </tr>
      </thead>
      <tbody>
        {showMoves && moves.map((move) => <PokemonMoveIndexMove key={move.move.name} move={move} />)}
      </tbody>
    </Table>
  )
}

function PokemonShowNaturalMoves({
  moves,
}: {
  moves: PokemonMoveIndexItem[],
}) {
  const [showMoves, setShowMoves] = useState<boolean>(true)
  return (
    <Table striped>
      <thead>
        <tr onClick={() => setShowMoves(old => !old)}>
          <th colSpan={1}>Level-up moves</th>
          <th colSpan={1}>Level learned</th>
        </tr>
      </thead>
      <tbody>
        {showMoves && moves.map((move) => <PokemonMoveIndexNaturalMove key={move.move.name} move={move} />)}
      </tbody>
    </Table>
  )
}

export default function PokemonShowMoveMethods({ moves }: { moves: PokemonMoveIndexItem[] }) {
  const [egg, machine, tutor, natural] = useSortedMoves(moves)
  return (
    <div>
      {natural.length > 0 && <PokemonShowNaturalMoves moves={natural} />}
      {egg.length > 0 && <PokemonShowMoves name={'Egg'} moves={egg} />}
      {machine.length > 0 && <PokemonShowMoves name={'Machine'} moves={machine} />}
      {tutor.length && <PokemonShowMoves name={'Tutor'} moves={tutor} />}
    </div>
  )
}