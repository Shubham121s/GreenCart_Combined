"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { authAPI } from "../services/api"
import toast from "react-hot-toast"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      console.log("🔐 Login attempt started")
      console.log("📧 Credentials:", { username: credentials.username, password: "***" })
      console.log("🌐 API URL:", process.env.REACT_APP_API_URL || "http://localhost:5000/api")

      const response = await authAPI.login(credentials)

      console.log("✅ Login response:", response.data)

      const { token, user: userData } = response.data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)

      toast.success("Login successful!")
      console.log("🎉 Login successful, user set:", userData)
      return { success: true }
    } catch (error) {
      console.error("❌ Login error:", error)
      console.error("📡 Error response:", error.response?.data)
      console.error("🔢 Error status:", error.response?.status)
      console.error("🌐 Request URL:", error.config?.url)

      let message = "Login failed"

      if (error.code === "NETWORK_ERROR" || error.message === "Network Error") {
        message = "Cannot connect to server. Please ensure the backend is running on port 5000."
      } else if (error.response?.status === 404) {
        message = "Login endpoint not found. Please check if the backend server is running."
      } else if (error.response?.data?.message) {
        message = error.response.data.message
      }

      toast.error(message)
      return { success: false, message }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    toast.success("Logged out successfully")
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
