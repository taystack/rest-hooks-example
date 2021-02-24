import { useMemo } from 'react'
import { PokemonMoveIndexItem } from '../resources/pokemon'
import { getLatestVersionGroup } from '../hooks'


export const useSortedMoves = (
  moves: PokemonMoveIndexItem[]
): [
    PokemonMoveIndexItem[],
    PokemonMoveIndexItem[],
    PokemonMoveIndexItem[],
    PokemonMoveIndexItem[],
  ] => useMemo(() => {
    const methods: {
      machine: PokemonMoveIndexItem[]
      natural: PokemonMoveIndexItem[]
      egg: PokemonMoveIndexItem[]
      tutor: PokemonMoveIndexItem[]
    } = {
      machine: [],
      natural: [],
      egg: [],
      tutor: [],
    }
    moves.forEach(move => {
      const { version_group_details } = move
      const latestVersion = getLatestVersionGroup(version_group_details)
      const method = latestVersion.move_learn_method.name
      switch (method) {
        case 'egg':
          methods.egg.push(move)
          break;
        case 'machine':
          methods.machine.push(move)
          break;
        case 'tutor':
          methods.tutor.push(move)
          break;
        case 'level-up':
          methods.natural.push(move)
      }
    })
    return [methods.egg, methods.machine, methods.tutor, methods.natural]
  }, [moves])
