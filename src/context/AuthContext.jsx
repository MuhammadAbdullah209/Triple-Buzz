import { createContext, useContext, useEffect, useState } from 'react'
import {
  getToken,
  setToken,
  login as loginRequest,
  register as registerRequest,
  verifyOtp as verifyOtpRequest,
  reverify as reverifyRequest,
  logoutRequest,
  fetchMe,
  ApiError,
} from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function bootstrap() {
      if (!getToken()) {
        setReady(true)
        return
      }
      try {
        const { user: me } = await fetchMe()
        if (!cancelled) {
          setUser(me)
          setIsLoggedIn(true)
        }
      } catch {
        setToken(null)
      } finally {
        if (!cancelled) setReady(true)
      }
    }
    bootstrap()
    return () => {
      cancelled = true
    }
  }, [])

  const login = async (email, password) => {
    const data = await loginRequest(email, password)
    setToken(data.accessToken)
    setUser(data.user)
    setIsLoggedIn(true)
    return data.user
  }

  const register = (fields) => registerRequest(fields)

  const verify = (email, otp) => verifyOtpRequest(email, otp)

  const resendOtp = (email) => reverifyRequest(email)

  const logout = async () => {
    try {
      await logoutRequest()
    } catch {
      // best-effort — clear local state regardless of whether the server call succeeds
    }
    setToken(null)
    setUser(null)
    setIsLoggedIn(false)
  }

  const refreshUser = async () => {
    const { user: me } = await fetchMe()
    setUser(me)
    return me
  }

  const value = {
    user,
    isLoggedIn,
    ready,
    login,
    register,
    verify,
    resendOtp,
    logout,
    refreshUser,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}

export { ApiError }
