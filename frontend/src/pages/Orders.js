"use client"

import { useState, useEffect } from "react"
import { ordersAPI, routesAPI, driversAPI } from "../services/api"
import Modal from "../components/Modal"
import ConfirmDialog from "../components/ConfirmDialog"
import { PlusIcon, PencilIcon, TrashIcon, ShoppingBagIcon } from "@heroicons/react/24/outline"
import toast from "react-hot-toast"

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [routes, setRoutes] = useState([])
  const [drivers, setDrivers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingOrder, setEditingOrder] = useState(null)
  const [deletingOrder, setDeletingOrder] = useState(null)
  const [formData, setFormData] = useState({
    orderId: "",
    valueRs: 0,
    assignedRoute: "",
    assignedDriver: "",
    status: "Pending",
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [ordersResponse, routesResponse, driversResponse] = await Promise.all([
        ordersAPI.getAll(),
        routesAPI.getAll(),
        driversAPI.getAll(),
      ])
      setOrders(ordersResponse.data)
      setRoutes(routesResponse.data)
      setDrivers(driversResponse.data)
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error("Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const orderData = {
        ...formData,
        assignedRoute: formData.assignedRoute || undefined,
        assignedDriver: formData.assignedDriver || undefined,
      }

      if (editingOrder) {
        await ordersAPI.update(editingOrder._id, orderData)
        toast.success("Order updated successfully")
      } else {
        await ordersAPI.create(orderData)
        toast.success("Order created successfully")
      }
      fetchData()
      closeModal()
    } catch (error) {
      console.error("Error saving order:", error)
      toast.error("Failed to save order")
    }
  }

  const handleEdit = (order) => {
    setEditingOrder(order)
    setFormData({
      orderId: order.orderId,
      valueRs: order.valueRs,
      assignedRoute: order.assignedRoute?._id || "",
      assignedDriver: order.assignedDriver?._id || "",
      status: order.status,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async () => {
    try {
      await ordersAPI.delete(deletingOrder._id)
      toast.success("Order deleted successfully")
      fetchData()
      setIsDeleteDialogOpen(false)
      setDeletingOrder(null)
    } catch (error) {
      console.error("Error deleting order:", error)
      toast.error("Failed to delete order")
    }
  }

  const openDeleteDialog = (order) => {
    setDeletingOrder(order)
    setIsDeleteDialogOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingOrder(null)
    setFormData({
      orderId: "",
      valueRs: 0,
      assignedRoute: "",
      assignedDriver: "",
      status: "Pending",
    })
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Assigned":
        return "bg-blue-100 text-blue-800"
      case "In Transit":
        return "bg-purple-100 text-purple-800"
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Late":
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
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-1">Manage delivery orders and assignments</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="w-4 h-4" />
          <span className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-shadow flex items-center space-x-2 text-black">Add Order</span>
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <ShoppingBagIcon className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{order.orderId}</div>
                        <div className="text-sm text-gray-500">ID: {order._id.slice(-6)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{order.valueRs.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.assignedRoute ? order.assignedRoute.routeId : "Not assigned"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.assignedDriver ? order.assignedDriver.name : "Not assigned"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => handleEdit(order)} className="text-primary-600 hover:text-primary-900 p-1">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button onClick={() => openDeleteDialog(order)} className="text-red-600 hover:text-red-900 p-1">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No orders found. Add your first order to get started.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Order Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingOrder ? "Edit Order" : "Add New Order"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
              Order ID
            </label>
            <input
              type="text"
              id="orderId"
              name="orderId"
              value={formData.orderId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          <div>
            <label htmlFor="valueRs" className="block text-sm font-medium text-gray-700 mb-1">
              Order Value (₹)
            </label>
            <input
              type="number"
              id="valueRs"
              name="valueRs"
              min="0"
              step="0.01"
              value={formData.valueRs}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          <div>
            <label htmlFor="assignedRoute" className="block text-sm font-medium text-gray-700 mb-1">
              Assigned Route
            </label>
            <select
              id="assignedRoute"
              name="assignedRoute"
              value={formData.assignedRoute}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select a route</option>
              {routes.map((route) => (
                <option key={route._id} value={route._id}>
                  {route.routeId} - {route.startLocation} → {route.endLocation}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="assignedDriver" className="block text-sm font-medium text-gray-700 mb-1">
              Assigned Driver
            </label>
            <select
              id="assignedDriver"
              name="assignedDriver"
              value={formData.assignedDriver}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select a driver</option>
              {drivers
                .filter((driver) => driver.isAvailable)
                .map((driver) => (
                  <option key={driver._id} value={driver._id}>
                    {driver.name} - {driver.currentLocation}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="Pending">Pending</option>
              <option value="Assigned">Assigned</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Late">Late</option>
            </select>
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
              {editingOrder ? "Update Order" : "Add Order"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Order"
        message={`Are you sure you want to delete order ${deletingOrder?.orderId}? This action cannot be undone.`}
      />
    </div>
  )
}

export default Orders
