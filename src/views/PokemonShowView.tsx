import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { useCache, useResource } from 'rest-hooks'
import { PokemonDetail } from '../resources/pokemon'
import { useMoveCompareReducer, MoveCompareContext } from '../reducers/useMoveCompareReducer'
import PokemonMoveCompareView from './PokemonMoveCompareView'
import PokemonShowMovesView from './PokemonShowMovesView'
import PokemonShowGamesView from './PokemonShowGamesView'
import PokemonShowStatsView from './PokemonShowStatsView'
import { Route, Switch } from 'react-router-dom';
import { Nav, NavItem, NavLink, Spinner } from 'reactstrap';



export function PokemonDetailsView() {
  const { pokemonName } = useParams<{ pokemonName: string }>()
  const pokemonDetails = useResource(PokemonDetail, { name: pokemonName })
  return (<>
    <Nav>
      <NavItem>
        <NavLink tag={Link} to={`/pokemon/${pokemonName}`}>
          Stats
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to={`/pokemon/${pokemonName}/moves`}>Moves ({pokemonDetails.moves.length})</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to={`/pokemon/${pokemonName}/games`}>Games ({pokemonDetails.game_indices.length})</NavLink>
      </NavItem>
    </Nav>
  </>)
}

function ImageBoundary({ children }: { children: React.ReactElement }) {
  return (
    <div style={{ height: 96, width: 96, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
  )
}
function PokemonShowImage() {
  const { pokemonName } = useParams<{ pokemonName: string }>()
  const pokemonDetails = useCache(PokemonDetail, { name: pokemonName })
  const imgSrc = pokemonDetails?.sprites.front_default
  return (
    <ImageBoundary><>
      <Spinner type="grow" color={'primary'} />
      {imgSrc && <img src={imgSrc} />}
    </></ImageBoundary>
  )
}

function PokemonShowNavLoading() {
  return (<>
    <Nav>
      <NavItem>
        <NavLink tag={Link} to={'/'}>Stats</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to={'/'}>Moves (…)</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to={`/`}>Games (…)</NavLink>
      </NavItem>
    </Nav>
  </>)
}

export default function PokemonShowView() {
  const { pokemonName } = useParams<{ pokemonName: string }>()
  const { addMove, moves } = useMoveCompareReducer()
  return (
    <div>
      <MoveCompareContext.Provider value={{ addMove, moves }}>
        <h1><Link to={'/'}>Pokémon</Link> - {pokemonName}</h1>
        <PokemonShowImage />
        <Suspense fallback={<PokemonShowNavLoading />}>
          <PokemonDetailsView />
        </Suspense>
        <Switch>
          <Route exact path="/pokemon/:pokemonName/moves" component={PokemonShowMovesView} />
          <Route exact path="/pokemon/:pokemonName/games" component={PokemonShowGamesView} />
          <Route path="/pokemon/:pokemonName" component={PokemonShowStatsView} />
        </Switch>
        <PokemonMoveCompareView />
      </MoveCompareContext.Provider>
    </div>
  )
}