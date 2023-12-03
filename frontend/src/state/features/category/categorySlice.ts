import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface Category {
  id: number
  category: string
}

export interface CategoriesSliceState {
  loading: boolean
  categories: Category[]
  error: string
}

const initialState: CategoriesSliceState = {
  loading: false,
  categories: [],
  error: '',
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    increment: (state) => {
      state.categories = []
    },
    decrement: (state) => {
      state.categories = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false
      state.categories = action.payload
    })
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const fetchCategories = createAsyncThunk('fetchCategories', async () => {
  return await fetch('http://localhost:3001/categories').then(
    async (r) => await r.json(),
  )
})

export default categorySlice.reducer
