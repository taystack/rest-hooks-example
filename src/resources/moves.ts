import { Endpoint } from '@rest-hooks/endpoint'
import { Entity } from '@rest-hooks/normalizr'
import {
  BasicIndexItem,
  blankBasicItem,
  blankFlavorTextEntry,
  blankUrl,
  FlavorTextEntry,
  Url,
} from './base'


interface MoveName {
  language: BasicIndexItem
  name: string
}

interface ContestCombos {
  normal: {}
  super: {}
}

interface MoveEffect {
  effect: string
  language: BasicIndexItem
  short_effect: string
}

interface MoveMeta {
  alignment: BasicIndexItem
  ailment_chance: number
  category: BasicIndexItem
  crit_rate: number
  drain: number
  flinch_chance: number
  healing: number
  max_hits: number | null
  max_turns: number | null
  min_hits: number | null
  min_turns: number | null
  stat_chance: number
}

interface MovePastValues {
  accuracy: number | null
  effect_chance: number | null
  effect_entries: MoveEffect[]
  power: number | null
  pp: number | null
  type: string | null
}

interface MoveStatChange {
  change: number
  stat: BasicIndexItem
}

const blankContestCombos: ContestCombos = {
  normal: {},
  super: {},
}

const blankMoveMeta: MoveMeta = {
  alignment: blankBasicItem,
  ailment_chance: 0,
  category: blankBasicItem,
  crit_rate: 0,
  drain: 0,
  flinch_chance: 0,
  healing: 0,
  max_hits: null,
  max_turns: null,
  min_hits: null,
  min_turns: null,
  stat_chance: 0,
}

export class Move extends Entity {
  readonly name: string = ''
  readonly accuracy: number = 0
  readonly contest_combos: ContestCombos = blankContestCombos
  readonly contest_effect: Url = blankUrl
  readonly contest_type: BasicIndexItem = blankBasicItem
  readonly damage_class: BasicIndexItem = blankBasicItem
  readonly effect_chance: number | null = null
  readonly effect_changes: MoveEffect[] = []
  readonly effect_entries: MoveEffect[] = []
  readonly flavor_text_entries: FlavorTextEntry[] = []
  readonly generation: BasicIndexItem = blankBasicItem
  readonly id: number = 0
  readonly learned_by_pokemon: BasicIndexItem[] = []
  readonly machines: BasicIndexItem[] = []
  readonly meta: MoveMeta = blankMoveMeta
  readonly names: MoveName[] = []
  readonly past_values: MovePastValues[] = []
  readonly power: number | null = null
  readonly pp: number = 0
  readonly priority: number = 0
  readonly stat_changes: MoveStatChange[] = []
  readonly super_contest_effect: Url = blankUrl
  readonly target: BasicIndexItem = blankBasicItem
  readonly type: BasicIndexItem = blankBasicItem

  pk() { return this.name }
}

export const MoveDetail = new Endpoint(
  ({ moveId }) => fetch(`https://pokeapi.co/api/v2/move/${moveId}`).then(res => res.json()),
  { schema: Move }
)
