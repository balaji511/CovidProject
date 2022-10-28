import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {covidApi} from '../Services/apis'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
  {
    state_code: 'TT',
    state_name: 'ZtoATotalCases',
  },
]

const getStateName = state => {
  const value = statesList.find(each => each.state_code === state)
  const name = value !== undefined && value.state_name
  return name
}
export const getCovidData = createAsyncThunk('covidData/get', async () => {
  const options = {
    method: 'GET',
  }
  const res = fetch(covidApi, options)
  return (await res).json()
})

const covidDataSlice = createSlice({
  name: 'covidData',
  initialState: {
    isLoading: false,
    covidData: [],
    nationalCases: {},
    includingList: [],
    stateObject: null,
  },
  reducers: {
    sortArray(state) {
      // eslint-disable-next-line no-param-reassign
      state.covidData = state.covidData.reverse()
    },
    searchEvent(state, action) {
      const input = action.payload
      // eslint-disable-next-line no-param-reassign
      state.includingList = state.covidData.filter(each =>
        each.stateName.toLowerCase().includes(input.toLowerCase()),
      )
    },
    getStateObj(state, action) {
      const id = action.payload
      console.log('id')

      const stateObj = state.covidData.find(each => each.stateCode === id)
      // eslint-disable-next-line no-param-reassign
      state.stateObject = stateObj
    },
  },
  extraReducers: {
    [getCovidData.pending]: state => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true
    },
    [getCovidData.fulfilled]: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false

      const covidDataList = []
      const states = Object.keys(action.payload)
      states.map(each => {
        covidDataList.push({
          stateCode: each,
          stateName: getStateName(each),
          confirmed: action.payload[each].total.confirmed,
          deceased: action.payload[each].total.deceased,
          recovered: action.payload[each].total.recovered,
          tested: action.payload[each].total.tested,
          active:
            action.payload[each].total.confirmed -
            (action.payload[each].total.recovered +
              action.payload[each].total.deceased),
          population: action.payload[each].meta.population,
          lastUpdated: action.payload[each].meta.last_updated,
        })
        return covidDataList
      })

      // eslint-disable-next-line no-param-reassign
      state.covidData = covidDataList
      const obj = state.covidData.find(each => each.stateCode === 'TT')
      // eslint-disable-next-line no-param-reassign
      state.nationalCases = obj
    },
    [getCovidData.rejected]: state => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false
    },
  },
})
export default covidDataSlice
export const covidActions = covidDataSlice.actions
