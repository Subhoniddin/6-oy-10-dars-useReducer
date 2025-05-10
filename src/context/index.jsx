import { createContext, useReducer } from "react"

const initialValue = {
  data: [],
  filter: [],
  priorityFilter: 'all',
  completedFilter: 'all',
  skip: 0,
  haveData: true,
  loading: false,
}

const reducer = (state, {type, payload}) => {
    switch (type) {
      case 'SET_DATA':
          return {...state, data: [...state.data, ...payload]}
      case 'SET_FILTER':
          return {...state, filter: payload}
      case 'priority_Filter':
          return {...state, priorityFilter: payload}
      case 'completed_Filter':
          return {...state, completedFilter: payload}
      case 'SKIP':
          return {...state, skip: payload}
      case 'haveData':
          return {...state, haveData: false}
      case 'loading':
          return {...state, loading: !state.loading}
      default:
        return state
    }
} 

export const Context = createContext()

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialValue)

    return <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>
}

export default Provider