import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { useResource } from 'rest-hooks'
import { PokemonDetail } from '../resources/pokemon'
import { useMoveCompareReducer, MoveCompareContext } from '../reducers/useMoveCompareReducer'
import PokemonMoveCompareView from './PokemonMoveCompareView'
import PokemonShowMovesView from './PokemonShowMovesView'
import { Route, Switch } from 'react-router-dom';



export function PokemonDetailsView() {
  const { pokemonName } = useParams<{ pokemonName: string }>()
  const pokemonDetails = useResource(PokemonDetail, { name: pokemonName })
  return (
    <div>
      <Link to={`/pokemon/${pokemonName}`}>Stats</Link>
      <Link to={`/pokemon/${pokemonName}/moves`}>Moves ({pokemonDetails.moves.length})</Link>
      <Link to={`/pokemon/${pokemonName}/games`}>Games ({pokemonDetails.game_indices.length})</Link>
    </div>
  )
}

export default function PokemonShowView() {
  const name = useParams<{ pokemonName: string }>().pokemonName
  const { addMove, moves } = useMoveCompareReducer()
  return (
    <div>
      <MoveCompareContext.Provider value={{ addMove, moves }}>
        <Link to={'/pokemon'}>Back to list</Link>
        <h1>{name}</h1>
        <Suspense fallback={<div>LOADING</div>}>
          <PokemonDetailsView />
        </Suspense>
        <Switch>
          <Route exact path="/pokemon/:pokemonName/moves" component={PokemonShowMovesView} />
        </Switch>
        <PokemonMoveCompareView />
      </MoveCompareContext.Provider>
    </div>
  )
}