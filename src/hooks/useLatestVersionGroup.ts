import { useMemo } from 'react'
import { PokemonMoveVersionGroupDetails } from '../resources/pokemon'


export const getLatestVersionGroup = (
  versionGroupDetails: PokemonMoveVersionGroupDetails[]
): PokemonMoveVersionGroupDetails => (
  versionGroupDetails[versionGroupDetails.length - 1]
)

export const useLatestVersionGroup = (
  versionGroupDetails: PokemonMoveVersionGroupDetails[]
): PokemonMoveVersionGroupDetails => useMemo(() => (
  getLatestVersionGroup(versionGroupDetails)
), [])
