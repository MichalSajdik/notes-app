import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'

export interface Note {
  id: number
  title: string
  description: string
  category: string
  createdAt: string
}

export interface NoteSliceState {
  loading: boolean
  notes: Note[]
  selectedNote: Note | null
  error: string
  filter: string
  search: string
}

const initialState: NoteSliceState = {
  loading: false,
  notes: [],
  selectedNote: null,
  error: '',
  filter: '',
  search: '',
}

const defaultNote = {
  id: null,
  title: 'New note',
  description: '',
  category: '',
  createdAt: '',
}

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    selectNote: (state, action: PayloadAction<number>) => {
      state.selectedNote =
        state.notes.find((note) => note.id === action.payload) ?? null
    },
    setSelectedNoteTitle: (state, action: PayloadAction<string>) => {
      if (state.selectedNote === null) return state
      state.selectedNote.title = action.payload
    },
    setSelectedNoteDescription: (state, action: PayloadAction<string>) => {
      if (state.selectedNote === null) return state
      state.selectedNote.description = action.payload
    },
    setSelectedNoteCategory: (state, action: PayloadAction<string>) => {
      if (state.selectedNote === null) return state
      state.selectedNote.category = action.payload
    },
    searchNotes: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    filterNotesByCategory: (state, action: PayloadAction<string>) => {
      state.filter = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      const newNotes = action.payload
        .filter((note: Note) => {
          return note.category
            .toLowerCase()
            .includes(state.filter?.toLowerCase() ?? '')
        })
        .filter((note: Note) => {
          return note.title.toLowerCase().includes(state.search.toLowerCase())
        })

      state.loading = false
      state.notes = newNotes
      state.selectedNote =
        newNotes.length !== 0 ? newNotes[newNotes.length - 1] : null
    })
    builder.addCase(fetchNotes.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchNotes.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
    builder.addCase(createNote.fulfilled, (state, action) => {
      state.loading = false
      state.notes = [...state.notes, action.payload]
      state.selectedNote = action.payload
    })
    builder.addCase(createNote.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createNote.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.loading = false
      state.notes = state.notes.filter((note) => note.id !== action.payload)
      if (state.selectedNote?.id === action.payload) {
        state.selectedNote = null
      }
    })
    builder.addCase(deleteNote.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deleteNote.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.loading = false
      state.notes = state.notes.filter((note) => note.id !== action.payload.id)
      state.notes = [...state.notes, action.payload]
      state.selectedNote = action.payload
    })
    builder.addCase(updateNote.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateNote.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export const createNote = createAsyncThunk('note/createNote', async () => {
  return await fetch('http://localhost:3001/notes', {
    headers,
    method: 'POST',
    body: JSON.stringify({
      title: defaultNote.title,
      category: defaultNote.category,
      description: defaultNote.description,
      createdAt: new Date().toISOString(),
    }),
  }).then(async (r) => await r.json())
})

export const updateNote = createAsyncThunk(
  'note/updateNote',
  async ({ id, title, category, description, createdAt }: Note) => {
    return await fetch('http://localhost:3001/notes/' + id, {
      headers,
      method: 'PUT',
      body: JSON.stringify({
        title,
        category,
        description,
        createdAt,
      }),
    }).then(async (r) => await r.json())
  },
)

export const deleteNote = createAsyncThunk(
  'note/deleteNote',
  async (id: number) => {
    await fetch('http://localhost:3001/notes/' + id, {
      method: 'DELETE',
    })
    return JSON.parse(String(id))
  },
)

export const fetchNotes = createAsyncThunk('note/fetchNotes', async () => {
  return await fetch('http://localhost:3001/notes').then(
    async (r) => await r.json(),
  )
})

export const {
  selectNote,
  setSelectedNoteCategory,
  setSelectedNoteTitle,
  setSelectedNoteDescription,
  searchNotes,
  filterNotesByCategory,
} = noteSlice.actions
export default noteSlice.reducer
