"use client"

import { useState, useEffect } from "react"
import { routesAPI } from "../services/api"
import Modal from "../components/Modal"
import ConfirmDialog from "../components/ConfirmDialog"
import { PlusIcon, PencilIcon, TrashIcon, MapIcon } from "@heroicons/react/24/outline"
import toast from "react-hot-toast"

const RoutesPage = () => {
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingRoute, setEditingRoute] = useState(null)
  const [deletingRoute, setDeletingRoute] = useState(null)
  const [formData, setFormData] = useState({
    routeId: "",
    distanceKm: 0,
    trafficLevel: "Medium",
    baseTimeMinutes: 0,
    startLocation: "",
    endLocation: "",
  })

  useEffect(() => {
    fetchRoutes()
  }, [])

  const fetchRoutes = async () => {
    try {
      setLoading(true)
      const response = await routesAPI.getAll()
      setRoutes(response.data)
    } catch (error) {
      console.error("Error fetching routes:", error)
      toast.error("Failed to load routes")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingRoute) {
        await routesAPI.update(editingRoute._id, formData)
        toast.success("Route updated successfully")
      } else {
        await routesAPI.create(formData)
        toast.success("Route created successfully")
      }
      fetchRoutes()
      closeModal()
    } catch (error) {
      console.error("Error saving route:", error)
      toast.error("Failed to save route")
    }
  }

  const handleEdit = (route) => {
    setEditingRoute(route)
    setFormData({
      routeId: route.routeId,
      distanceKm: route.distanceKm,
      trafficLevel: route.trafficLevel,
      baseTimeMinutes: route.baseTimeMinutes,
      startLocation: route.startLocation,
      endLocation: route.endLocation,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async () => {
    try {
      await routesAPI.delete(deletingRoute._id)
      toast.success("Route deleted successfully")
      fetchRoutes()
      setIsDeleteDialogOpen(false)
      setDeletingRoute(null)
    } catch (error) {
      console.error("Error deleting route:", error)
      toast.error("Failed to delete route")
    }
  }

  const openDeleteDialog = (route) => {
    setDeletingRoute(route)
    setIsDeleteDialogOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingRoute(null)
    setFormData({
      routeId: "",
      distanceKm: 0,
      trafficLevel: "Medium",
      baseTimeMinutes: 0,
      startLocation: "",
      endLocation: "",
    })
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const getTrafficLevelColor = (level) => {
    switch (level) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Routes Management</h1>
          <p className="text-gray-600 mt-1">Manage delivery routes and their configurations</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="w-4 h-4" />
          <span className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-shadow flex items-center space-x-2 text-black">Add Route</span>
        </button>
      </div>

      {/* Routes Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Traffic Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Base Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Locations
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {routes.map((route) => (
                <tr key={route._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <MapIcon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{route.routeId}</div>
                        <div className="text-sm text-gray-500">ID: {route._id.slice(-6)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{route.distanceKm} km</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTrafficLevelColor(
                        route.trafficLevel,
                      )}`}
                    >
                      {route.trafficLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{route.baseTimeMinutes} min</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{route.startLocation}</div>
                      <div className="text-gray-500">→ {route.endLocation}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => handleEdit(route)} className="text-primary-600 hover:text-primary-900 p-1">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button onClick={() => openDeleteDialog(route)} className="text-red-600 hover:text-red-900 p-1">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {routes.length === 0 && (
          <div className="text-center py-12">
            <MapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No routes found. Add your first route to get started.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Route Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingRoute ? "Edit Route" : "Add New Route"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="routeId" className="block text-sm font-medium text-gray-700 mb-1">
              Route ID
            </label>
            <input
              type="text"
              id="routeId"
              name="routeId"
              value={formData.routeId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="distanceKm" className="block text-sm font-medium text-gray-700 mb-1">
                Distance (km)
              </label>
              <input
                type="number"
                id="distanceKm"
                name="distanceKm"
                min="0"
                step="0.1"
                value={formData.distanceKm}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label htmlFor="baseTimeMinutes" className="block text-sm font-medium text-gray-700 mb-1">
                Base Time (minutes)
              </label>
              <input
                type="number"
                id="baseTimeMinutes"
                name="baseTimeMinutes"
                min="0"
                value={formData.baseTimeMinutes}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="trafficLevel" className="block text-sm font-medium text-gray-700 mb-1">
              Traffic Level
            </label>
            <select
              id="trafficLevel"
              name="trafficLevel"
              value={formData.trafficLevel}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startLocation" className="block text-sm font-medium text-gray-700 mb-1">
                Start Location
              </label>
              <input
                type="text"
                id="startLocation"
                name="startLocation"
                value={formData.startLocation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label htmlFor="endLocation" className="block text-sm font-medium text-gray-700 mb-1">
                End Location
              </label>
              <input
                type="text"
                id="endLocation"
                name="endLocation"
                value={formData.endLocation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
          </div>

          <div className="flex space-x-3 justify-end pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-shadow flex items-center space-x-2 text-black"
            >
              {editingRoute ? "Update Route" : "Add Route"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Route"
        message={`Are you sure you want to delete route ${deletingRoute?.routeId}? This action cannot be undone.`}
      />
    </div>
  )
}

export default RoutesPage
