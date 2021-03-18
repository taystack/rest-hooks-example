import React, { Suspense, useMemo, useState } from 'react'
import { NetworkErrorBoundary } from 'rest-hooks';
import { useParams } from 'react-router-dom'
import { useCancelling, useDebounce } from '@rest-hooks/hooks'
import { Link } from 'react-router-dom'
import { useResource } from 'rest-hooks'
import { Table } from 'reactstrap'
import { PokemonIndexItem } from '../resources/pokemon'
import { Loading } from '../components/LoadingInline'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'


const PokemonListItem = ({
  pokemon,
}: {
  pokemon: PokemonIndexItem
}) => {
  const { name } = pokemon
  return (
    <tr className={'list-item'}>
      <td>
        <Link to={`/pokemon/${name}`}>{name}</Link>
      </td>
    </tr>
  )
}

const PokemonList: React.FC<{ offset: number }> = ({ offset }) => {
  const debouncedOffset = useDebounce(offset, 200)
  const CancellingPokemonList = useCancelling(PokemonIndexItem.list(), { offset: debouncedOffset })
  const pokemon = useResource(CancellingPokemonList, { offset: debouncedOffset })
  const processing = offset !== debouncedOffset
  return (
    <Table striped>
      <tbody>
        {pokemon.results.map((pkm) => (<PokemonListItem key={pkm.name} pokemon={pkm} />))}
      </tbody>
    </Table>
  )
}

const STEP = 20

const useParamsPage = (): number => {
  const pageParam = useParams<{ page: string | undefined }>().page
  return useMemo(() => {
    return typeof pageParam === 'string' ? parseInt(pageParam) : 1
  }, [pageParam])
}

export default function PokemonIndexView() {
  const page = useParamsPage()
  const offset = (page - 1) * STEP
  return (
    <div>
      <h1>Pokémon</h1>
      <TablePagination page={page} offset={offset} />
      <NetworkErrorBoundary>
        <Suspense fallback={<Loading />}>
          {<PokemonList offset={offset} />}
        </Suspense>
      </NetworkErrorBoundary>
    </div>
  )
}

function TablePagination({ page, offset }: { page: number, offset: number }) {
  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem disabled={page === 1}>
        <PaginationLink tag={Link} to={`/pokemon/page/1`} first />
      </PaginationItem>
      <PaginationItem disabled={page === 1}>
        <PaginationLink tag={Link} to={`/pokemon/page/${page - 1 < 1 ? 1 : page - 1}`} previous href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink tag={Link} to={`/pokemon/page/${page + 1}`} next href="#" />
      </PaginationItem>
    </Pagination>
  )
}
