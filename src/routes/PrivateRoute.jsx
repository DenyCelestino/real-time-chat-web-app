import { Navigate } from 'react-router-dom'

export function PrivateRoute({ children }) {
  var user = localStorage.getItem('tk') ? true : false

  return user ? children : <Navigate to="/" />
}
