import { useMemo } from 'react'
import { PokemonMoveIndexItem } from '../resources/pokemon'
import { getLatestVersionGroup } from '../hooks'


function levelUpSort(l: PokemonMoveIndexItem, r: PokemonMoveIndexItem) {
  const ll = getLatestVersionGroup(l.version_group_details).level_learned_at
  const rl = getLatestVersionGroup(r.version_group_details).level_learned_at
  return ll < rl ? -1 : 1
}

function nameSort(l: PokemonMoveIndexItem, r: PokemonMoveIndexItem) {
  const ll = l.move.name
  const rl = r.move.name
  return ll < rl ? -1 : 1
}

function sortLevelUpMoves(moves: PokemonMoveIndexItem[]) {
  return moves.sort(levelUpSort)
}

function sortMoves(moves: PokemonMoveIndexItem[]) {
  return moves.sort(nameSort)
}

type UseSortedMoves = [
  PokemonMoveIndexItem[],
  PokemonMoveIndexItem[],
  PokemonMoveIndexItem[],
  PokemonMoveIndexItem[],
]

export const useSortedMoves = (
  moves: PokemonMoveIndexItem[]
): UseSortedMoves => useMemo(() => {
  const methods: {
    machine: PokemonMoveIndexItem[]
    levelUp: PokemonMoveIndexItem[]
    egg: PokemonMoveIndexItem[]
    tutor: PokemonMoveIndexItem[]
  } = {
    machine: [],
    levelUp: [],
    egg: [],
    tutor: [],
  }
  moves.forEach(move => {
    const { version_group_details } = move
    const latestVersion = getLatestVersionGroup(version_group_details)
    const method = latestVersion.move_learn_method.name
    switch (method) {
      case 'level-up':
        methods.levelUp.push(move)
        break;
      case 'egg':
        methods.egg.push(move)
        break;
      case 'machine':
        methods.machine.push(move)
        break;
      case 'tutor':
        methods.tutor.push(move)
        break;
    }
  })
  const egg = sortMoves(methods.egg)
  const machine = sortMoves(methods.machine)
  const tutor = sortMoves(methods.tutor)
  const levelUp = sortLevelUpMoves(methods.levelUp)
  return [egg, machine, tutor, levelUp]
}, [moves])

