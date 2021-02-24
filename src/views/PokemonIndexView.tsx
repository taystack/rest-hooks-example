import React from 'react'
import { Link } from 'react-router-dom'
import { useResource } from 'rest-hooks'
import { PokemonIndexItem, PokemonList } from '../resources/pokemon'


const PokemonListItem = ({
  pokemon,
}: {
  pokemon: PokemonIndexItem
}) => {
  const { name } = pokemon
  return (
    <div>
      <Link to={`/pokemon/${name}`}>{name}</Link>
    </div>
  )
}

export default function PokemonIndexView() {
  const pokemon = useResource(PokemonList, {})
  return (
    <div>
      <div>PokemonIndexView</div>
      {pokemon.results.map((pkm) => (<PokemonListItem key={pkm.name} pokemon={pkm} />))}
    </div>
  )
}