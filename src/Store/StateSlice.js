import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const getStateData = createAsyncThunk('statesData/get', async id => {
  const options = {
    method: 'GET',
  }
  console.log(id)

  const api = `https://apis.ccbp.in/covid19-timelines-data/${id}`
  const res = fetch(api, options)
  return (await res).json()
})

const StateSlice = createSlice({
  name: 'stateSlice',
  initialState: {
    isLoading: false,
    stateData: [],
    apiRejected: false,
  },
  extraReducers: {
    [getStateData.pending]: state => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true
    },
    [getStateData.fulfilled]: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false
      console.log(action.payload)

      const stateName = Object.keys(action.payload)
      const stateDates = Object.keys(action.payload[stateName].dates)
      const statesDataList = []
      stateDates.map(date => {
        statesDataList.push({
          Dated: date,
          active:
            Math.abs(
              action.payload[stateName].dates[date].delta.confirmed -
                (action.payload[stateName].dates[date].delta.recovered +
                  action.payload[stateName].dates[date].delta.deceased),
            ) || 1,

          ...action.payload[stateName].dates[date].delta,
        })
        return statesDataList
      })
      // eslint-disable-next-line no-param-reassign
      state.stateData = statesDataList
    },

    [getStateData.rejected]: state => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false
      // eslint-disable-next-line no-param-reassign
      state.apiRejected = true
      console.log('rejected')
    },
  },
})

export default StateSlice
