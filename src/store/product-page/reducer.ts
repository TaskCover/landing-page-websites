import { createSlice } from '@reduxjs/toolkit'
import { ROUTER_PRODUCT } from 'constant/index'

export interface CounterPageState {
  value: number,
  currentLink: string
}

const initialState: CounterPageState = {
  value: 0,
  currentLink: "/"
}

export const counterPageSlice = createSlice({
    name: 'changePage',
    initialState,
    reducers: {
      nextPage: (state) => {
        if(state.value >= ROUTER_PRODUCT.length) return;
        state.value += 1;
        state.currentLink = ROUTER_PRODUCT[state.value];
      },
      prePage: (state) => {
        if(state.value === 0) return;
        state.value -= 1;
        state.currentLink = ROUTER_PRODUCT[state.value];
      },
    },
  })

  export const { nextPage, prePage } = counterPageSlice.actions

  export const counterPageReducer = counterPageSlice.reducer;
export default counterPageSlice.reducer
