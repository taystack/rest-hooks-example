import { useParams } from 'react-router'
import { PokemonDetail } from '../resources/pokemon'
import { useCache } from 'rest-hooks'
import { Table } from 'reactstrap'


export default function PokemonShowStats() {
  const { pokemonName } = useParams<{ pokemonName: string }>()
  const pokemonDetails = useCache(PokemonDetail, { name: pokemonName })
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Stat</th>
          <th>Base stat</th>
          <th>Effort</th>
        </tr>
      </thead>
      <tbody>
        {pokemonDetails?.stats.map((stat) => (
          <tr key={stat.stat.name} style={{ fontWeight: stat.effort ? 'bold' : 'inherit' }}>
            <th scope={'row'}>{stat.stat.name}</th>
            <td>{stat.base_stat}</td>
            <td>{stat.effort}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}