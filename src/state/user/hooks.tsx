import { Token } from '@uniswap/sdk-core'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import {
  addSavedPool,
  addSavedToken,
  addSerializedToken,
  removeSerializedToken,
  SerializedToken,
  toggleURLWarning,
  updateSliderAnimation,
  updateUserDarkMode,
} from './actions'
import { useAppSelector } from 'hooks/useAppDispatch'
import { useNetwork } from 'wagmi'

function serializeToken(token: Token): SerializedToken {
  return {
    chainId: token.chainId,
    address: token.address,
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name,
  }
}

function deserializeToken(serializedToken: SerializedToken): Token {
  return new Token(serializedToken.chainId, serializedToken.address, serializedToken.decimals, serializedToken.symbol, serializedToken.name)
}

export function useIsDarkMode(): boolean {
  return true
}

export function useDarkModeManager(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>()
  const darkMode = true

  const toggleSetDarkMode = useCallback(() => {
    dispatch(updateUserDarkMode({ userDarkMode: !darkMode }))
  }, [darkMode, dispatch])

  return [darkMode, toggleSetDarkMode]
}

export function useAddUserToken(): (token: Token) => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    (token: Token) => {
      dispatch(addSerializedToken({ serializedToken: serializeToken(token) }))
    },
    [dispatch]
  )
}

export function useSavedTokens(): [string[], (address: string) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const savedTokens = useSelector((state: AppState) => state.user.savedTokens)
  const updatedSavedTokens = useCallback(
    (address: string) => {
      dispatch(addSavedToken({ address }))
    },
    [dispatch]
  )
  return [savedTokens ?? [], updatedSavedTokens]
}

export function useSavedPools(): [string[], (address: string) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const savedPools = useSelector((state: AppState) => state.user.savedPools)
  const updateSavedPools = useCallback(
    (address: string) => {
      dispatch(addSavedPool({ address }))
    },
    [dispatch]
  )
  return [savedPools ?? [], updateSavedPools]
}

export function useRemoveUserAddedToken(): (chainId: number, address: string) => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    (chainId: number, address: string) => {
      dispatch(removeSerializedToken({ chainId, address }))
    },
    [dispatch]
  )
}

export function useUserAddedTokens(): Token[] {
  const { chain, chains } = useNetwork()
  const serializedTokensMap = useAppSelector(({ user: { tokens } }) => tokens)

  return useMemo(() => {
    if (!chain?.id) return []
    return Object.values(serializedTokensMap?.[chain?.id] ?? {}).map(deserializeToken)
  }, [serializedTokensMap, chain?.id])
}

export function useURLWarningVisible(): boolean {
  return useSelector((state: AppState) => state.user.URLWarningVisible)
}

export function useURLWarningToggle(): () => void {
  const dispatch = useDispatch()
  return useCallback(() => dispatch(toggleURLWarning()), [dispatch])
}

export function useSliderAnimation(key: string): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>()
  const effect = useSelector((state: AppState) => {
    return state.user.sliderAnimation?.[key] || false
  })

  const switchEffect = useCallback(() => {
    dispatch(updateSliderAnimation({ key: key, value: !effect }))
  }, [dispatch, effect, key])

  return [effect, switchEffect]
}
