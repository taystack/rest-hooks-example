export interface BasicIndexItem {
  readonly url: string;
  readonly name: string;
}

export interface FlavorTextEntry {
  flavor_text: string
  language: BasicIndexItem
  version_group: BasicIndexItem
}

export interface Url {
  url: string
}

export const blankUrl = { url: '' }
export const blankBasicItem: BasicIndexItem = { name: '', url: '' }
export const blankFlavorTextEntry: FlavorTextEntry = {
  flavor_text: '',
  language: blankBasicItem,
  version_group: blankBasicItem,
}
