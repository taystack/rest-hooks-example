import { useParams } from 'react-router'
import { useResource } from 'rest-hooks'
import { PokemonDetail } from '../resources/pokemon'
import PokemonShowMoveMethods from '../components/PokemonShowMoveMethods'



export default function PokemonShowMovesView() {
  const name = useParams<{ pokemonName: string }>().pokemonName
  const pokemonDetails = useResource(PokemonDetail, { name })
  return (
    <div>
      <PokemonShowMoveMethods moves={pokemonDetails.moves} />
    </div>
  )
}