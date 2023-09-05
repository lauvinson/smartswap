import { Action, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import Cookies from 'js-cookie'

import application from './application/reducer'
import user from './user/reducer'
import lists from './lists/reducer'
import multicall from './multicall/reducer'
import protocol from './protocol/reducer'
import tokens from './tokens/reducer'
import pools from './pools/reducer'
import { updateVersion } from './global/actions'

// 在这里定义你希望持久化的state键
const PERSISTED_KEYS: string[] = ['user', 'lists']

// 加载预存的state
let preloadedState = {}
const cookieState = Cookies.get('reduxState')
if (cookieState) {
  preloadedState = JSON.parse(cookieState)
}

// 创建store
const store = configureStore({
  reducer: {
    application,
    user,
    multicall,
    lists,
    protocol,
    tokens,
    pools,
  },
  middleware: [...getDefaultMiddleware({ thunk: false, immutableCheck: false })],
  preloadedState,
})

// 定义一个函数，持久化需要保存的state
const persistState = () => {
  const state = store.getState()
  const persistedState = PERSISTED_KEYS.reduce((persisted, key) => {
    // @ts-ignore
    persisted[key] = state[key]
    return persisted
  }, {})

  Cookies.set('reduxState', JSON.stringify(persistedState))
}

// 订阅store的更新，并在每次更新时调用persistState函数
store.subscribe(persistState)

store.dispatch(updateVersion())

export default store
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>
