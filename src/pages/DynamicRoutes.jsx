import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Products from '../pages/Products'
import Users from '../pages/Users'
import Roles from '../pages/Roles'
import Nodes from '../pages/Nodes'
import Unauthorized from '../pages/Unauthorized'

const DynamicRoutes = ({ nodes }) => {

  const allowedPaths = nodes.map(
    (node) => node.path
  )

  const hasAccess = (path) => {
    return allowedPaths.includes(path)
  }

  return (

    <Routes>

      <Route
        path="/dashboard"
        element={
          hasAccess('/dashboard')
            ? <Dashboard />
            : <Navigate to="/unauthorized" />
        }
      />

      <Route
        path="/products"
        element={
          hasAccess('/products')
            ? <Products />
            : <Navigate to="/unauthorized" />
        }
      />

      <Route
        path="/users"
        element={
          hasAccess('/users')
            ? <Users />
            : <Navigate to="/unauthorized" />
        }
      />

      <Route
        path="/roles"
        element={
          hasAccess('/roles')
            ? <Roles />
            : <Navigate to="/unauthorized" />
        }
      />

      <Route
        path="/nodes"
        element={
          hasAccess('/nodes')
            ? <Nodes />
            : <Navigate to="/unauthorized" />
        }
      />

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />

    </Routes>

  )
}

export default DynamicRoutes