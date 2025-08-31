import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthContextType {
  isAuthenticated: boolean
  loading: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const token = await AsyncStorage.getItem('access_token')
      setIsAuthenticated(!!token)
      setLoading(false)
    }

    checkSession()
  }, [])

  const login = async (token: string) => {
    console.log('Salvando token no AsyncStorage:', token);
    await AsyncStorage.setItem('access_token', token)
    setIsAuthenticated(true)
  }

  const logout = async () => {
    await AsyncStorage.clear()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
