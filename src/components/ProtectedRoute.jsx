import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const logged = !!localStorage.getItem('pms_user')
  if (!logged) return <Navigate to="/login" replace />
  return children
}