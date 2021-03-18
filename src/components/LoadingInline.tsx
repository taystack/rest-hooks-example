import React from 'react'
import { Spinner } from 'reactstrap'


export function LoadingInline() {
  return (
    <div style={{ display: 'inline-flex' }}>
      <Spinner type="grow" color="primary" />
    </div>
  )
}

export function Loading() {
  return (
    <div style={{ display: 'flex' }}>
      <Spinner type="grow" color="primary" />
    </div>
  )
}