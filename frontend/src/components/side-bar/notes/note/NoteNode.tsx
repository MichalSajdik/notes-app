import React from 'react'

import {
  deleteNote,
  type Note,
  selectNote,
} from '../../../../state/features/note/noteSlice'
import { useTypedDispatch } from '../../../../state/useTypedDispatch'

interface NoteNodeInterface {
  note: Note
}

export const NoteNode = ({ note }: NoteNodeInterface): React.ReactNode => {
  const dispatch = useTypedDispatch()
  return (
    <div
      className='app-sidebar-note'
      key={note.id}
      onClick={() => dispatch(selectNote(note.id))}
    >
      <div className='sidebar-note-title'>
        <div>
          <strong className='sidebar-note-title-strong'>{note.title}</strong>
          <p className='sidebar-note-category'>{note.category}</p>
        </div>
        <button onClick={async () => await dispatch(deleteNote(note.id))}>
          Delete
        </button>
      </div>

      <p className='sidebar-note-body'>{formatDescription(note.description)}</p>

      <small className='note-meta'>
        Created at: {dateFormatter(note.createdAt)}
      </small>
    </div>
  )
}

const formatDescription = (description: string | undefined): string => {
  return description !== '' &&
    description !== undefined &&
    description.length > 20
    ? description.slice(0, 20) + '...'
    : description ?? ''
}

const dateFormatter = (date: string): string => {
  return new Date(date)
    .toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    .toString()
}
