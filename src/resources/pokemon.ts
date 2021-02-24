import { Endpoint } from '@rest-hooks/endpoint'
import { Entity } from '@rest-hooks/normalizr'
import { BasicIndexItem, blankBasicItem } from './base'


export interface PokemonIndexResponse {
  readonly count: number
  readonly next: string | null
  readonly previous: string | null
  readonly results: BasicIndexItem[]
}

export interface PokemonShowAbility {
  readonly ability: BasicIndexItem
  readonly is_hidden: boolean
  readonly slot: number
}

export interface PokemonShowGameIndex {
  readonly game_index: number
  readonly version: BasicIndexItem
}

export interface PokemonShowType {
  readonly slot: number
  readonly type: BasicIndexItem
}

export interface PokemonShowStat {
  readonly base_stat: number
  readonly effort: number
  readonly stat: BasicIndexItem
}

export interface PokemonShowSprites {
  readonly back_default: string | null
  readonly back_female: string | null
  readonly back_shiny: string | null
  readonly back_shiny_female: string | null
  readonly front_default: string | null
  readonly front_female: string | null
  readonly front_shiny: string | null
  readonly front_shiny_female: string | null
  readonly other: {
    dream_world: {
      front_default: string | null
      front_female: string | null
    }
  }
  readonly 'official-artwork': {
    front_default: string | null
  }
}

export interface PokemonMoveVersionGroupDetails {
  readonly level_learned_at: number
  readonly move_learn_method: BasicIndexItem
  readonly version_group: BasicIndexItem
}

export interface PokemonMoveIndexItem {
  readonly move: BasicIndexItem
  readonly version_group_details: PokemonMoveVersionGroupDetails[]
}

const nullSprites = {
  back_default: null,
  back_female: null,
  back_shiny: null,
  back_shiny_female: null,
  front_default: null,
  front_female: null,
  front_shiny: null,
  front_shiny_female: null,
  other: {
    dream_world: {
      front_default: null,
      front_female: null,
    }
  },
  'official-artwork': {
    front_default: null,
  },
}

export class PokemonIndexItem extends Entity {
  readonly name: string = ''
  readonly url: string = ''

  pk() { return this.name }

  static indexes = ['name'] as const;
}

export class Pokemon extends Entity {
  readonly abilities: PokemonShowAbility[] = []
  readonly base_experience: number = 0
  readonly forms: BasicIndexItem[] = []
  readonly game_indices: PokemonShowGameIndex[] = []
  readonly height: number = 0
  readonly held_items: BasicIndexItem[] = []
  readonly id: number = 0
  readonly is_default: boolean = true
  readonly location_area_encounters: string = ''
  readonly moves: PokemonMoveIndexItem[] = []
  readonly name: string = ''
  readonly order: number = 0
  readonly species: BasicIndexItem = blankBasicItem
  readonly sprites: PokemonShowSprites = nullSprites
  readonly stats: PokemonShowStat[] = []
  readonly types: PokemonShowType[] = []
  readonly weight: number = 0
  readonly url: string = ''

  pk() { return this.name }
}

export const PokemonList = new Endpoint(
  () => fetch('https://pokeapi.co/api/v2/pokemon/').then(res => res.json()),
  { schema: { results: [PokemonIndexItem] } }
)

export const PokemonDetail = new Endpoint(
  ({ name }) => fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(res => res.json()),
  { schema: Pokemon }
)
