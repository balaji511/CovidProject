import {configureStore} from '@reduxjs/toolkit'
import covidDataSlice from './covidSlice'
import StateSlice from './StateSlice'

const store = configureStore({
  reducer: {
    covidDataInfo: covidDataSlice.reducer,
    stateInfo: StateSlice.reducer,
  },
})

export default store
