import { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import api from '../services/api'

const Register = () => {

  const navigate = useNavigate()

  const [roles, setRoles] = useState([])

  const [user, setUser] = useState({

    identifier: '',
    name: '',
    username: '',
    phoneNo: '',
    password: '',
    roles: []

  })

  const [error, setError] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {

    fetchRoles()

  }, [])

  const fetchRoles = async () => {

    try {

      const response = await api.post(

        '/role/list',

        {
          page: 0,
          sizePerPage: 100
        }
      )

      setRoles(response.data)

    } catch (err) {

      console.log(err)

      setError('Failed to load roles')
    }
  }

  const handleChange = (e) => {

    let value = e.target.value

    // PHONE ONLY NUMBERS

    if (e.target.name === 'phoneNo') {

      value = value.replace(/[^0-9]/g, '')
    }

    // EMAIL ALSO USED AS IDENTIFIER

    if (e.target.name === 'username') {

      setUser({

        ...user,

        username: value,
        identifier: value
      })

      return
    }

    setUser({

      ...user,

      [e.target.name]: value

    })
  }

  const handleRoleChange = (role) => {

    if (user.roles.includes(role)) {

      setUser({

        ...user,

        roles: user.roles.filter(
          (r) => r !== role
        )
      })

    } else {

      setUser({

        ...user,

        roles: [...user.roles, role]
      })
    }
  }

  const validateForm = () => {

    // NAME

    if (user.name.trim().length < 3) {

      setError('Name must be at least 3 characters')

      return false
    }

    // EMAIL

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/

    if (!emailRegex.test(user.username)) {

      setError('Enter valid email address')

      return false
    }

    // ROLE

    if (user.roles.length === 0) {

      setError('Please select at least one role')

      return false
    }

    // PHONE

    const phoneRegex = /^[0-9]{10}$/

    if (!phoneRegex.test(user.phoneNo)) {

      setError('Phone number must be 10 digits')

      return false
    }

    // PASSWORD

    if (user.password.length < 6) {

      setError('Password must be at least 6 characters')

      return false
    }

    return true
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    setError('')

    const isValid = validateForm()

    if (!isValid) {

      return
    }

    setLoading(true)

    try {

      console.log(user)

      const response = await api.post(

        '/user/add',

        user
      )

      console.log(response.data)

      // SUCCESS FALSE FROM BACKEND

      if (response.data.success === false) {

        setError(
          response.data.message ||
          'Registration failed'
        )

        return
      }

      // SUCCESS

      alert('Registration successful')

      navigate('/')

    } catch (err) {

      console.log(err)

      // BACKEND MESSAGE

      if (err.response?.data?.message) {

        setError(err.response.data.message)

      }

      // STRING RESPONSE

      else if (
        typeof err.response?.data === 'string'
      ) {

        setError(err.response.data)
      }

      // STATUS BASED

      else if (err.response?.status === 400) {

        setError('Invalid registration data')
      }

      else if (err.response?.status === 401) {

        setError('Unauthorized request')
      }

      else if (err.response?.status === 403) {

        setError('Access denied')
      }

      else if (err.response?.status === 404) {

        setError('API endpoint not found')
      }

      else if (err.response?.status === 500) {

        setError('Server error occurred')
      }

      // NETWORK ERROR

      else if (err.request) {

        setError('Server not reachable')
      }

      // DEFAULT

      else {

        setError('Registration failed')
      }

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="min-h-screen flex items-start justify-center pt-16">

      <div className="w-[450px] p-8 card-ui">

        <h2 className="page-title text-center mb-8">
          POS Registration
        </h2>

        {
          error && (

            <div className="mb-5 bg-red-100 text-red-600 border border-red-300 p-3 rounded-lg text-center">
              {error}
            </div>
          )
        }

        <form onSubmit={handleSubmit}>

          {/* FULL NAME */}

          <div className="mb-4">

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={user.name}
              onChange={handleChange}
              className="input-ui"
              required
            />

          </div>

          {/* EMAIL */}

          <div className="mb-4">

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              name="username"
              placeholder="Enter email"
              value={user.username}
              onChange={handleChange}
              className="input-ui"
              required
            />

          </div>

          {/* ROLES */}

          <div className="mb-4">

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Select Roles
            </label>

            <div className="border rounded-lg p-4 max-h-40 overflow-y-auto bg-slate-50">

              {
                roles.map((role) => (

                  <label
                    key={role.identifier}
                    className="flex items-center gap-2 mb-2"
                  >

                    <input
                      type="checkbox"
                      checked={user.roles.includes(role.identifier)}
                      onChange={() => handleRoleChange(role.identifier)}
                    />

                    {role.identifier}

                  </label>

                ))
              }

            </div>

          </div>

          {/* PHONE */}

          <div className="mb-4">

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Phone Number
            </label>

            <input
              type="text"
              name="phoneNo"
              placeholder="Enter phone number"
              value={user.phoneNo}
              onChange={handleChange}
              maxLength={10}
              className="input-ui"
              required
            />

          </div>

          {/* PASSWORD */}

          <div className="mb-6">

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={user.password}
              onChange={handleChange}
              className="input-ui"
              required
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >

            {
              loading
                ? 'Registering...'
                : 'Register'
            }

          </button>

        </form>

        <div className="text-center mt-5 text-sm text-slate-500">

          Already have an account?

          <Link
            to="/"
            className="ml-2 text-slate-800 font-semibold hover:underline"
          >
            Login
          </Link>

        </div>

      </div>

    </div>
  )
}

export default Register