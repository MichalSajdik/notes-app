import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

import {
  setSelectedNoteCategory,
  setSelectedNoteDescription,
  setSelectedNoteTitle,
  updateNote,
} from '../../state/features/note/noteSlice'
import { type RootState } from '../../state/store'
import { useTypedDispatch } from '../../state/useTypedDispatch'
import { useTypedSelector } from '../../state/useTypedSelector'

const MAX_TITLE_LENGTH = 42

export function MainBar(): React.ReactNode {
  const dispatch = useTypedDispatch()
  const selectedNote = useTypedSelector(
    (state: RootState) => state.note.selectedNote,
  )

  const categories = useTypedSelector(
    (state: RootState) => state.category.categories,
  )

  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (selectedNote !== null) {
      setCategory(selectedNote.category)
      setTitle(selectedNote.title)
      setDescription(selectedNote.description)
    }
  }, [selectedNote])

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    dispatch(setSelectedNoteCategory(e.target.value))
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length > MAX_TITLE_LENGTH) return
    setTitle(e.target.value)
    dispatch(setSelectedNoteTitle(e.target.value))
  }

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setDescription(e.target.value)
    dispatch(setSelectedNoteDescription(e.target.value))
  }

  const saveSelectedNote = (): void => {
    void dispatch(
      updateNote({
        id: selectedNote?.id ?? 0,
        title,
        description,
        category,
        createdAt: selectedNote?.createdAt ?? '',
      }),
    )
  }

  if (selectedNote === null) return <></>

  return (
    <>
      <div className='app-main'>
        <div className='app-main-note-edit'>
          <input
            type='text'
            placeholder='Note title'
            autoFocus
            value={title}
            onChange={(e) => {
              handleTitleChange(e)
            }}
          />
          <select id='dropdown' value={category} onChange={handleSelectChange}>
            {categories.map((category) => (
              <option key={category.category} value={category.category}>
                {category.category.length !== 0 ? category.category : 'All'}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              saveSelectedNote()
            }}
          >
            Save
          </button>
          <textarea
            id='body'
            placeholder='Write your note here'
            value={description}
            onChange={(e) => {
              handleDescriptionChange(e)
            }}
          />
        </div>

        <div className='app-main-note-preview'>
          <h1 className='preview-title'>{selectedNote.title}</h1>
          <ReactMarkdown className='markdown-preview'>
            {selectedNote.description}
          </ReactMarkdown>
        </div>
      </div>
    </>
  )
}
