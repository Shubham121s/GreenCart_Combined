// "use client"

// import { useState, useEffect } from "react"
// import { driversAPI } from "../services/api"
// import Modal from "../components/Modal"
// import ConfirmDialog from "../components/ConfirmDialog"
// import { PlusIcon, PencilIcon, TrashIcon, UserIcon } from "@heroicons/react/24/outline"
// import toast from "react-hot-toast"

// const Drivers = () => {
//   const [drivers, setDrivers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
//   const [editingDriver, setEditingDriver] = useState(null)
//   const [deletingDriver, setDeletingDriver] = useState(null)
//   const [formData, setFormData] = useState({
//     name: "",
//     currentShiftHours: 0,
//     past7DayWorkHours: 0,
//     isAvailable: true,
//     currentLocation: "Base",
//   })

//   useEffect(() => {
//     fetchDrivers()
//   }, [])

//   const fetchDrivers = async () => {
//     try {
//       setLoading(true)
//       const response = await driversAPI.getAll()
//       setDrivers(response.data)
//     } catch (error) {
//       console.error("Error fetching drivers:", error)
//       toast.error("Failed to load drivers")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       if (editingDriver) {
//         await driversAPI.update(editingDriver._id, formData)
//         toast.success("Driver updated successfully")
//       } else {
//         await driversAPI.create(formData)
//         toast.success("Driver created successfully")
//       }
//       fetchDrivers()
//       closeModal()
//     } catch (error) {
//       console.error("Error saving driver:", error)
//       toast.error("Failed to save driver")
//     }
//   }

//   const handleEdit = (driver) => {
//     setEditingDriver(driver)
//     setFormData({
//       name: driver.name,
//       currentShiftHours: driver.currentShiftHours,
//       past7DayWorkHours: driver.past7DayWorkHours,
//       isAvailable: driver.isAvailable,
//       currentLocation: driver.currentLocation,
//     })
//     setIsModalOpen(true)
//   }

//   const handleDelete = async () => {
//     try {
//       await driversAPI.delete(deletingDriver._id)
//       toast.success("Driver deleted successfully")
//       fetchDrivers()
//       setIsDeleteDialogOpen(false)
//       setDeletingDriver(null)
//     } catch (error) {
//       console.error("Error deleting driver:", error)
//       toast.error("Failed to delete driver")
//     }
//   }

//   const openDeleteDialog = (driver) => {
//     setDeletingDriver(driver)
//     setIsDeleteDialogOpen(true)
//   }

//   const closeModal = () => {
//     setIsModalOpen(false)
//     setEditingDriver(null)
//     setFormData({
//       name: "",
//       currentShiftHours: 0,
//       past7DayWorkHours: 0,
//       isAvailable: true,
//       currentLocation: "Base",
//     })
//   }

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : type === "number" ? Number.parseFloat(value) || 0 : value,
//     }))
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Drivers Management</h1>
//           <p className="text-gray-600 mt-1">Manage your delivery drivers and their information</p>
//         </div>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
//         >
//           <PlusIcon className="w-4 h-4" />
//           <span>Add Driver</span>
//         </button>
//       </div>

//       {/* Drivers Table */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Driver
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Current Shift
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Weekly Hours
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Location
//                 </th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {drivers.map((driver) => (
//                 <tr key={driver._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10">
//                         <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
//                           <UserIcon className="h-6 w-6 text-primary-600" />
//                         </div>
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{driver.name}</div>
//                         <div className="text-sm text-gray-500">ID: {driver._id.slice(-6)}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                         driver.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {driver.isAvailable ? "Available" : "Unavailable"}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.currentShiftHours}h</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.past7DayWorkHours}h</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.currentLocation}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex items-center justify-end space-x-2">
//                       <button
//                         onClick={() => handleEdit(driver)}
//                         className="text-primary-600 hover:text-primary-900 p-1"
//                       >
//                         <PencilIcon className="w-4 h-4" />
//                       </button>
//                       <button onClick={() => openDeleteDialog(driver)} className="text-red-600 hover:text-red-900 p-1">
//                         <TrashIcon className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {drivers.length === 0 && (
//           <div className="text-center py-12">
//             <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-500">No drivers found. Add your first driver to get started.</p>
//           </div>
//         )}
//       </div>

//       {/* Add/Edit Driver Modal */}
//       <Modal isOpen={isModalOpen} onClose={closeModal} title={editingDriver ? "Edit Driver" : "Add New Driver"}>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//               Driver Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="currentShiftHours" className="block text-sm font-medium text-gray-700 mb-1">
//                 Current Shift Hours
//               </label>
//               <input
//                 type="number"
//                 id="currentShiftHours"
//                 name="currentShiftHours"
//                 min="0"
//                 max="24"
//                 step="0.5"
//                 value={formData.currentShiftHours}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="past7DayWorkHours" className="block text-sm font-medium text-gray-700 mb-1">
//                 Past 7 Day Hours
//               </label>
//               <input
//                 type="number"
//                 id="past7DayWorkHours"
//                 name="past7DayWorkHours"
//                 min="0"
//                 max="168"
//                 step="0.5"
//                 value={formData.past7DayWorkHours}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="currentLocation" className="block text-sm font-medium text-gray-700 mb-1">
//               Current Location
//             </label>
//             <input
//               type="text"
//               id="currentLocation"
//               name="currentLocation"
//               value={formData.currentLocation}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//             />
//           </div>

//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="isAvailable"
//               name="isAvailable"
//               checked={formData.isAvailable}
//               onChange={handleInputChange}
//               className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
//             />
//             <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-700">
//               Driver is available for assignments
//             </label>
//           </div>

//           <div className="flex space-x-3 justify-end pt-4">
//             <button
//               type="button"
//               onClick={closeModal}
//               className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
//             >
//               {editingDriver ? "Update Driver" : "Add Driver"}
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Delete Confirmation Dialog */}
//       <ConfirmDialog
//         isOpen={isDeleteDialogOpen}
//         onClose={() => setIsDeleteDialogOpen(false)}
//         onConfirm={handleDelete}
//         title="Delete Driver"
//         message={`Are you sure you want to delete ${deletingDriver?.name}? This action cannot be undone.`}
//       />
//     </div>
//   )
// }

// export default Drivers

// "use client"

// import { useState, useEffect } from "react"
// import { driversAPI } from "../services/api"
// import Modal from "../components/Modal"
// import ConfirmDialog from "../components/ConfirmDialog"
// import { PlusIcon, PencilIcon, TrashIcon, UserIcon } from "@heroicons/react/24/outline"
// import toast from "react-hot-toast"

// const Drivers = () => {
//   const [drivers, setDrivers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
//   const [editingDriver, setEditingDriver] = useState(null)
//   const [deletingDriver, setDeletingDriver] = useState(null)
//   const [formData, setFormData] = useState({
//     name: "",
//     currentShiftHours: 0,
//     past7DayWorkHours: 0,
//     isAvailable: true,
//     currentLocation: "Base",
//   })

//   useEffect(() => {
//     fetchDrivers()
//   }, [])

//   const fetchDrivers = async () => {
//     try {
//       setLoading(true)
//       const response = await driversAPI.getAll()
//       setDrivers(response.data)
//     } catch (error) {
//       console.error("Error fetching drivers:", error)
//       toast.error("Failed to load drivers")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       if (editingDriver) {
//         await driversAPI.update(editingDriver._id, formData)
//         toast.success("Driver updated successfully")
//       } else {
//         await driversAPI.create(formData)
//         toast.success("Driver created successfully")
//       }
//       fetchDrivers()
//       closeModal()
//     } catch (error) {
//       console.error("Error saving driver:", error)
//       toast.error("Failed to save driver")
//     }
//   }

//   const handleEdit = (driver) => {
//     setEditingDriver(driver)
//     setFormData({
//       name: driver.name,
//       currentShiftHours: driver.currentShiftHours,
//       past7DayWorkHours: driver.past7DayWorkHours,
//       isAvailable: driver.isAvailable,
//       currentLocation: driver.currentLocation,
//     })
//     setIsModalOpen(true)
//   }

//   const handleDelete = async () => {
//     try {
//       await driversAPI.delete(deletingDriver._id)
//       toast.success("Driver deleted successfully")
//       fetchDrivers()
//       setIsDeleteDialogOpen(false)
//       setDeletingDriver(null)
//     } catch (error) {
//       console.error("Error deleting driver:", error)
//       toast.error("Failed to delete driver")
//     }
//   }

//   const openDeleteDialog = (driver) => {
//     setDeletingDriver(driver)
//     setIsDeleteDialogOpen(true)
//   }

//   const closeModal = () => {
//     setIsModalOpen(false)
//     setEditingDriver(null)
//     setFormData({
//       name: "",
//       currentShiftHours: 0,
//       past7DayWorkHours: 0,
//       isAvailable: true,
//       currentLocation: "Base",
//     })
//   }

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : type === "number" ? Number.parseFloat(value) || 0 : value,
//     }))
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Drivers Management</h1>
//           <p className="text-gray-600 mt-1">Manage your delivery drivers and their information</p>
//         </div>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
//         >
//           <PlusIcon className="w-4 h-4" />
//           <span>Add Driver</span>
//         </button>
//       </div>

//       {/* Drivers Table */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Driver
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Current Shift
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Weekly Hours
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Location
//                 </th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {drivers.map((driver) => (
//                 <tr key={driver._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10">
//                         <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
//                           <UserIcon className="h-6 w-6 text-primary-600" />
//                         </div>
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{driver.name}</div>
//                         <div className="text-sm text-gray-500">ID: {driver._id.slice(-6)}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                         driver.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {driver.isAvailable ? "Available" : "Unavailable"}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.currentShiftHours}h</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.past7DayWorkHours}h</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.currentLocation}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex items-center justify-end space-x-2">
//                       <button
//                         onClick={() => handleEdit(driver)}
//                         className="text-primary-600 hover:text-primary-900 p-1"
//                       >
//                         <PencilIcon className="w-4 h-4" />
//                       </button>
//                       <button onClick={() => openDeleteDialog(driver)} className="text-red-600 hover:text-red-900 p-1">
//                         <TrashIcon className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {drivers.length === 0 && (
//           <div className="text-center py-12">
//             <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-500">No drivers found. Add your first driver to get started.</p>
//           </div>
//         )}
//       </div>

//       {/* Add/Edit Driver Modal */}
//       <Modal isOpen={isModalOpen} onClose={closeModal} title={editingDriver ? "Edit Driver" : "Add New Driver"}>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//               Driver Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="currentShiftHours" className="block text-sm font-medium text-gray-700 mb-1">
//                 Current Shift Hours
//               </label>
//               <input
//                 type="number"
//                 id="currentShiftHours"
//                 name="currentShiftHours"
//                 min="0"
//                 max="24"
//                 step="0.5"
//                 value={formData.currentShiftHours}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="past7DayWorkHours" className="block text-sm font-medium text-gray-700 mb-1">
//                 Past 7 Day Hours
//               </label>
//               <input
//                 type="number"
//                 id="past7DayWorkHours"
//                 name="past7DayWorkHours"
//                 min="0"
//                 max="168"
//                 step="0.5"
//                 value={formData.past7DayWorkHours}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="currentLocation" className="block text-sm font-medium text-gray-700 mb-1">
//               Current Location
//             </label>
//             <input
//               type="text"
//               id="currentLocation"
//               name="currentLocation"
//               value={formData.currentLocation}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//             />
//           </div>

//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="isAvailable"
//               name="isAvailable"
//               checked={formData.isAvailable}
//               onChange={handleInputChange}
//               className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
//             />
//             <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-700">
//               Driver is available for assignments
//             </label>
//           </div>

//           <div className="flex space-x-3 justify-end pt-4">
//             <button
//               type="button"
//               onClick={closeModal}
//               className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
//             >
//               {editingDriver ? "Update Driver" : "Add Driver"}
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Delete Confirmation Dialog */}
//       <ConfirmDialog
//         isOpen={isDeleteDialogOpen}
//         onClose={() => setIsDeleteDialogOpen(false)}
//         onConfirm={handleDelete}
//         title="Delete Driver"
//         message={`Are you sure you want to delete ${deletingDriver?.name}? This action cannot be undone.`}
//       />
//     </div>
//   )
// }

// export default Drivers




"use client"

import { useState, useEffect } from "react"
import { driversAPI } from "../services/api"
import Modal from "../components/Modal"
import ConfirmDialog from "../components/ConfirmDialog"
import { PlusIcon, PencilIcon, TrashIcon, UserIcon } from "@heroicons/react/24/outline"
import toast from "react-hot-toast"

const Drivers = () => {
  const [drivers, setDrivers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingDriver, setEditingDriver] = useState(null)
  const [deletingDriver, setDeletingDriver] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    currentShiftHours: 0,
    past7DayWorkHours: 0,
    isAvailable: true,
    currentLocation: "Base",
  })

  useEffect(() => {
    fetchDrivers()
  }, [])

  const fetchDrivers = async () => {
    try {
      setLoading(true)
      const response = await driversAPI.getAll()
      setDrivers(response.data)
    } catch (error) {
      console.error("Error fetching drivers:", error)
      toast.error("Failed to load drivers")
    } finally {
      setLoading(false)
    }
  }
//submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingDriver) {
        await driversAPI.update(editingDriver._id, formData)
        toast.success("Driver updated successfully")
      } else {
        await driversAPI.create(formData)
        toast.success("Driver created successfully")
      }
      fetchDrivers()
      closeModal()
    } catch (error) {
      console.error("Error saving driver:", error)
      toast.error("Failed to save driver")
    }
  }
// Edit
  const handleEdit = (driver) => {
    setEditingDriver(driver)
    setFormData({
      name: driver.name,
      currentShiftHours: driver.currentShiftHours,
      past7DayWorkHours: driver.past7DayWorkHours,
      isAvailable: driver.isAvailable,
      currentLocation: driver.currentLocation,
    })
    setIsModalOpen(true)
  }
// Delete
  const handleDelete = async () => {
    try {
      await driversAPI.delete(deletingDriver._id)
      toast.success("Driver deleted successfully")
      fetchDrivers()
      setIsDeleteDialogOpen(false)
      setDeletingDriver(null)
    } catch (error) {
      console.error("Error deleting driver:", error)
      toast.error("Failed to delete driver")
    }
  }

  const openDeleteDialog = (driver) => {
    setDeletingDriver(driver)
    setIsDeleteDialogOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingDriver(null)
    setFormData({
      name: "",
      currentShiftHours: 0,
      past7DayWorkHours: 0,
      isAvailable: true,
      currentLocation: "Base",
    })
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number.parseFloat(value) || 0 : value,
    }))
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
          <h1 className="text-3xl font-bold text-gray-900">Drivers Management</h1>
          <p className="text-gray-600 mt-1">Manage your delivery drivers and their information</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="w-4 h-4" />
          <span className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-shadow flex items-center space-x-2 text-black">Add Driver</span>
          
        </button>
      </div>

      {/* Drivers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Shift
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weekly Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {drivers.map((driver) => (
                <tr key={driver._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <UserIcon className="h-6 w-6 text-primary-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                        <div className="text-sm text-gray-500">ID: {driver._id.slice(-6)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        driver.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {driver.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.currentShiftHours}h</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.past7DayWorkHours}h</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{driver.currentLocation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(driver)}
                        className="text-primary-600 hover:text-primary-900 p-1"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button onClick={() => openDeleteDialog(driver)} className="text-red-600 hover:text-red-900 p-1">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {drivers.length === 0 && (
          <div className="text-center py-12">
            <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No drivers found. Add your first driver to get started.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Driver Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingDriver ? "Edit Driver" : "Add New Driver"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Driver Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="currentShiftHours" className="block text-sm font-medium text-gray-700 mb-1">
                Current Shift Hours
              </label>
              <input
                type="number"
                id="currentShiftHours"
                name="currentShiftHours"
                min="0"
                max="24"
                step="0.5"
                value={formData.currentShiftHours}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="past7DayWorkHours" className="block text-sm font-medium text-gray-700 mb-1">
                Past 7 Day Hours
              </label>
              <input
                type="number"
                id="past7DayWorkHours"
                name="past7DayWorkHours"
                min="0"
                max="168"
                step="0.5"
                value={formData.past7DayWorkHours}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="currentLocation" className="block text-sm font-medium text-gray-700 mb-1">
              Current Location
            </label>
            <input
              type="text"
              id="currentLocation"
              name="currentLocation"
              value={formData.currentLocation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-700">
              Driver is available for assignments
            </label>
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
              {editingDriver ? "Update Driver" : "Add Driver"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Driver"
        message={`Are you sure you want to delete ${deletingDriver?.name}? This action cannot be undone.`}
      />
    </div>
  )
}

export default Drivers


