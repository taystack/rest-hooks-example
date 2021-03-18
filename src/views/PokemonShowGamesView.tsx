import { useParams } from 'react-router'
import { Table } from 'reactstrap'
import { PokemonDetail } from '../resources/pokemon'
import { useCache } from 'rest-hooks'


export default function PokemonShowGamesView() {
  const { pokemonName } = useParams<{ pokemonName: string }>()
  const pokemonDetails = useCache(PokemonDetail, { name: pokemonName })
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Game</th>
          <th>Number in-game</th>
        </tr>
      </thead>
      <tbody>
        {pokemonDetails?.game_indices.map((game) => (
          <tr key={game.version.name}>
            <td scope={'row'}>{game.version.name}</td>
            <td>{game.game_index}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}