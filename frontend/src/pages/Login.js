"use client"

import { useState } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { EyeIcon, EyeSlashIcon, TruckIcon, ShieldCheckIcon, ChartBarIcon } from "@heroicons/react/24/outline"

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login, isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await login(credentials)

    if (!result.success) {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  const handleDemoLogin = async () => {
    setCredentials({
      username: "admin@greencart.com",
      password: "admin123",
    })
    setLoading(true)

    const result = await login({
      username: "admin@greencart.com",
      password: "admin123",
    })

    if (!result.success) {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mr-4">
                <TruckIcon className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">GreenCart</h1>
                <p className="text-xl text-emerald-100">Logistics</p>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">Eco-Friendly Delivery Management</h2>
            <p className="text-lg text-emerald-100 mb-8">
              Streamline your delivery operations with our comprehensive dashboard and simulation tools.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mr-4">
                <ChartBarIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Real-time Analytics</h3>
                <p className="text-emerald-100 text-sm">Track KPIs and delivery performance</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mr-4">
                <TruckIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Route Optimization</h3>
                <p className="text-emerald-100 text-sm">Simulate and optimize delivery routes</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mr-4">
                <ShieldCheckIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Management</h3>
                <p className="text-emerald-100 text-sm">Manage drivers, routes, and orders safely</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl mb-4">
              <TruckIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">GreenCart Logistics</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to access your dashboard</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your email"
                    value={credentials.username}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 border-2 border-emerald-200 rounded-lg text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <TruckIcon className="h-5 w-5 mr-2" />
                  Try Demo Login
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 text-center mb-2">
                  <span className="font-medium">Demo Credentials:</span>
                </p>
                <div className="text-xs text-gray-500 text-center space-y-1">
                  <p>
                    <span className="font-medium">Email:</span> admin@greencart.com
                  </p>
                  <p>
                    <span className="font-medium">Password:</span> admin123
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
