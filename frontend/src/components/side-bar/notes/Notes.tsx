import React from 'react'

import { type Note } from '../../../state/features/note/noteSlice'
import { type RootState } from '../../../state/store'
import { useTypedSelector } from '../../../state/useTypedSelector'
import { NoteNode } from './note/NoteNode'

export const Notes = (): React.ReactNode => {
  const notes = useTypedSelector((state: RootState) => state.note.notes)

  const sortedNotes =
    notes.length > 0
      ? [...notes]?.sort((a: Note, b: Note) => {
          const aa = new Date(a.createdAt)
          const bb = new Date(b.createdAt)
          if (aa < bb) return 1
          return -1
        })
      : []

  return (
    <div className='app-sidebar-notes'>
      {!(sortedNotes?.length === 0) &&
        sortedNotes?.map((note: Note) => (
          <NoteNode key={note.id} note={note} />
        ))}
    </div>
  )
}
