import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './noteService'

import { extractErrorMessage } from '../../utils'

// loading can be infered from presence or absence of notes
// success can be infered from presence or absence of notes
// error meassages can be recieved at component level from our AsyncThunkAction
// reset was never actually used

const initialState = {
  notes: null,
}

// get ticket notes
export const getNotes = createAsyncThunk(
  'notes/getAll',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.getNotes(ticketId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Create ticket note
export const createNote = createAsyncThunk(
  'notes/create',
  async ({ noteText, ticketId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.createNote(noteText, ticketId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        
        state.notes = null
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        
        state.notes = action.payload
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload)
      })
  },
})

export default noteSlice.reducer