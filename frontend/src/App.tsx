import './App.css'

import React, { useEffect } from 'react'

import { MainBar } from './components/main-bar/MainBar'
import { SideBar } from './components/side-bar/SideBar'
import { fetchCategories } from './state/features/category/categorySlice'
import { fetchNotes } from './state/features/note/noteSlice'
import { useTypedDispatch } from './state/useTypedDispatch'

function App(): React.ReactNode {
  const dispatch = useTypedDispatch()

  useEffect(() => {
    void dispatch(fetchNotes())
    void dispatch(fetchCategories())
  }, [])

  return (
    <div className='App'>
      <SideBar />
      <MainBar />
    </div>
  )
}

export default App
