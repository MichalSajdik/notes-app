import React from 'react'

import { fetchNotes, searchNotes } from '../../../state/features/note/noteSlice'
import { useTypedDispatch } from '../../../state/useTypedDispatch'

let timeoutId: number
const DEBOUNCE_TIMEOUT = 500

export const Search = (): React.ReactNode => {
  const dispatch = useTypedDispatch()

  const handleSearchChange = (searchValue: string): void => {
    clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      dispatch(searchNotes(searchValue))
      void dispatch(fetchNotes())
    }, DEBOUNCE_TIMEOUT)
  }

  return (
    <div className='app-sidebar-filter'>
      <p>Search</p>
      <div>
        <input
          type='text'
          onChange={(e) => {
            handleSearchChange(e.target.value)
          }}
        />
      </div>
    </div>
  )
}
