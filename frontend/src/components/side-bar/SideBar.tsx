import React from 'react'

import { CreateNoteHeader } from './create-note/CreateNote'
import { Filter } from './filter/Filter'
import { Notes } from './notes/Notes'
import { Search } from './search/Search'

export function SideBar(): React.ReactNode {
  return (
    <div className='app-sidebar'>
      <CreateNoteHeader />
      <Search />
      <Filter />
      <Notes />
    </div>
  )
}
