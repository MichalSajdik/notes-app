import React from 'react'

import {
  fetchNotes,
  filterNotesByCategory,
} from '../../../state/features/note/noteSlice'
import { type RootState } from '../../../state/store'
import { useTypedDispatch } from '../../../state/useTypedDispatch'
import { useTypedSelector } from '../../../state/useTypedSelector'

export const Filter = (): React.ReactNode => {
  const dispatch = useTypedDispatch()

  const categories = useTypedSelector(
    (state: RootState) => state.category.categories,
  )

  const handleFilterChange = (filterValue: string): void => {
    dispatch(filterNotesByCategory(filterValue))
    void dispatch(fetchNotes())
  }

  return (
    <div className='app-sidebar-filter'>
      <p>Filter</p>
      <div>
        <select
          id='dropdown'
          onChange={(e) => {
            handleFilterChange(e.target.value)
          }}
        >
          {categories.map((category) => (
            <option key={category.category} value={category.category}>
              {category.category.length !== 0 ? category.category : 'All'}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
