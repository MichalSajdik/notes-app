import React from 'react'

import { createNote } from '../../../state/features/note/noteSlice'
import { useTypedDispatch } from '../../../state/useTypedDispatch'

export const CreateNoteHeader = (): React.ReactNode => {
  const dispatch = useTypedDispatch()
  return (
    <div className='app-sidebar-header'>
      <h1>Notes</h1>
      <button onClick={async () => await dispatch(createNote())}>
        Add note
      </button>
    </div>
  )
}
