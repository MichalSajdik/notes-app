import { configureStore } from '@reduxjs/toolkit'

import categoryReducer from './features/category/categorySlice'
import noteReducer from './features/note/noteSlice'

const store = configureStore({
  reducer: {
    note: noteReducer,
    category: categoryReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
